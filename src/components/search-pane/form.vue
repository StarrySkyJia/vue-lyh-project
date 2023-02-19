<template>
  <!-- 该组件进行表单的判断和渲染 -->
  <div class="my-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <!-- 优先搜索 -->
    <el-form :labelWidth="labelWidth" size="small">
      <el-row type="flex" justify="space-between" v-bind="rowLayout">
        <!-- 遍历 -->
        <!-- 对el-col使用v-bind能将布局数据传入 -->
        <el-col v-bind="colLayout" v-for="item in formItems" :key="item.label">
          <el-form-item
            v-if="!item.isHidden"
            :label="item.label"
            :rules="item.rules"
          >
            <!-- 判断逻辑 -->
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                :show-password="item.type === 'password'"
                v-model="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              ></el-input>
            </template>
            <!-- 下拉框选择，只选择值 -->
            <template v-else-if="item.type === 'select'">
              <el-select
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                style="width: 100%"
                v-model="modelValue[`${item.field}`]"
                @change="handleSelectValueChange($event, item)"
              >
                <!-- 选项也要遍历 -->
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                >
                </el-option>
              </el-select>
            </template>
            <!-- 下拉框选择，选择文本和值 -->
            <template v-else-if="item.type === 'selectLabel'">
              <el-select
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                value-key="value"
                style="width: 100%"
                v-model="modelValue[`${item.field}`]"
                @change="handleValueChange($event, item)"
              >
                <!-- 选项也要遍历 -->
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                >
                </el-option>
              </el-select>
            </template>
            <template v-else-if="item.type === 'datepicker'">
              <el-date-picker
                style="width: 100%"
                v-bind="item.otherOptions"
                v-model="modelValue[`${item.field}`]"
                @update:modelValue="handleValueChange($event, item.field)"
              >
              </el-date-picker>
            </template>
          </el-form-item>
        </el-col>
        <el-col v-bind="colLayout">
          <div class="advance">
            <el-button
              v-if="isAdvance"
              type="text"
              icon="el-icon-search"
              @click="advanceSearch"
              >高级搜索</el-button
            >
          </div>
        </el-col>
        <el-col v-bind="colLayout">
          <slot name="btns"></slot>
        </el-col>
      </el-row>
    </el-form>

    <el-drawer
      title="高级搜索"
      :visible.sync="drawer"
      direction="rtl"
      size="30%"
      :append-to-body="true"
      :modal="false"
    >
      <el-form :labelWidth="labelWidth" size="small">
        <el-row>
          <!-- 遍历 -->
          <div v-for="item in advanceFormItems" :key="item.label">
            <!-- 对el-col使用v-bind能将布局数据传入 -->
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :rules="item.rules"
              :style="itemStyle"
            >
              <!-- 判断逻辑 -->
              <template
                v-if="item.type === 'input' || item.type === 'password'"
              >
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  :show-password="item.type === 'password'"
                  v-model="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                ></el-input>
              </template>
              <!-- 下拉框选择，只选择值 -->
              <template v-else-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="modelValue[`${item.field}`]"
                  @change="handleSelectValueChange($event, item)"
                >
                  <!-- 选项也要遍历 -->
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  >
                  </el-option>
                </el-select>
              </template>
              <!-- 下拉框选择，选择文本和值 -->
              <template v-else-if="item.type === 'selectLabel'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  value-key="value"
                  style="width: 100%"
                  v-model="modelValue[`${item.field}`]"
                  @change="handleValueChange($event, item)"
                >
                  <!-- 选项也要遍历 -->
                  <el-option
                    v-for="option in item.options"
                    :key="option.value"
                    :value="option.value"
                    :label="option.label"
                  >
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  v-model="modelValue[`${item.field}`]"
                  @update:modelValue="handleValueChange($event, item.field)"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </div>
        </el-row>
      </el-form>
      <div class="advance-btn">
        <slot name="advanceBtn"></slot>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    formItems: {
      type: Array,
      default: () => [],
    },
    advanceFormItems: {
      type: Array,
      default: () => [],
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: "10px 40px" }),
    },
    // 是否需要高级搜索
    isAdvance: {
      type: Boolean,
      default: false,
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 8, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      }),
    },
    rowLayout: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      drawer: false,
    };
  },
  methods: {
    handleValueChange: (value, field) => {
      this.emit("update:modelValue", {
        ...this.props.modelValue,
        [field]: value,
      });
    },

    handleSelectValueChange(option, item) {
      if (item.contactField) {
        this.$emit("update:modelValue", {
          ...this.modelValue,
          [item.field]: option.label,
          [item.contactField]: option.value,
        });
      } else {
        this.$emit("update:modelValue", {
          ...this.modelValue,
          [item.field]: option,
        });
      }
    },
    // 打开高级搜索
    advanceSearch() {
      this.drawer = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.advance {
  display: flex;
  justify-content: flex-start;
  padding: 0 10px;
}

.advance-btn {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
