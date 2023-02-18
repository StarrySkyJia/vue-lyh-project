<template>
  <!-- 该组件进行表单的判断和渲染 -->
  <div class="my-form">
    <div class="header">
      <slot name="header"></slot>
    </div>

    <div class="dialog-content">
      <el-form
        class="dialog-form"
        ref="dialogForm"
        :model="modelValue"
        :labelWidth="labelWidth"
        size="small"
        :disabled="disabled"
      >
        <el-row v-bind="rowLayout">
          <template v-for="item in formItems">
            <!-- 遍历 -->
            <el-col
              v-if="!item.isHide"
              v-bind="colLayout"
              :span="colSpan(item.colspan)"
              :key="item.label"
            >
              <!-- 对el-col使用v-bind能将布局数据传入 -->
              <el-form-item
                :label="item.label"
                :rules="item.rules"
                :prop="item.field"
                :style="itemStyle"
              >
                <!-- 判断逻辑 -->
                <template
                  v-if="item.type === 'input' || item.type === 'password'"
                >
                  <el-input
                    :placeholder="item.placeholder"
                    v-bind="item.otherOptions"
                    :disabled="item.disabled"
                    :show-password="item.type === 'password'"
                    v-model="modelValue[`${item.field}`]"
                    @update:modelValue="handleValueChange($event, item.field)"
                  ></el-input>
                </template>
                <template v-else-if="item.type === 'textarea'">
                  <el-input
                    :placeholder="item.placeholder"
                    v-bind="item.otherOptions"
                    :disabled="item.disabled"
                    type="textarea"
                    :rows="2"
                    v-model="modelValue[`${item.field}`]"
                    @update:modelValue="handleValueChange($event, item.field)"
                  ></el-input>
                </template>
                <template v-else-if="item.type === 'select'">
                  <el-select
                    :placeholder="item.placeholder"
                    v-bind="item.otherOptions"
                    value-key="value"
                    style="width: 100%"
                    filterable
                    v-model="modelValue[`${item.field}`]"
                    @change="handleSelectValueChange($event, item)"
                  >
                    <!-- 选项也要遍历 -->
                    <el-option
                      v-for="option in item.options"
                      :key="option.value"
                      :value="option"
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
                <template v-else-if="item.type === 'picUpload'">
                  <picUpload
                    :imageUrl="modelValue[`${item.field}`]"
                    :filePath="item.filePath"
                    @changePicUrl="changePicUrl($event, item.field)"
                  />
                </template>
              </el-form-item>
            </el-col>
          </template>
        </el-row>
      </el-form>
    </div>

    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script>
import picUpload from "@/baseUI/picUpload";

export default {
  components: { picUpload },
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
    itemStyle: {
      type: Object,
      default: () => ({ padding: "10px 40px" }),
    },
    disabled: {
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
  computed: {
    // 自定义宽度，如果item有声明就赋值，没有就使用默认的
    colSpan() {
      return (itemSpan) => {
        if (itemSpan) {
          return itemSpan;
        } else {
          return this.colLayout.span;
        }
      };
    },
  },
  data() {
    return {
      drawer: false,
    };
  },
  mounted() {},
  methods: {
    // 数据双向绑定响应
    handleValueChange: (value, field) => {
      this.$emit("update:modelValue", {
        ...this.modelValue,
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
          [item.field]: option.label,
        });
      }
    },
    changePicUrl(url, field) {
      this.$emit("update:modelValue", {
        ...this.modelValue,
        [field]: url,
      });
    },
    // 表单验证
    validateForm(dispatch) {
      this.$refs.dialogForm.validate((valid) => {
        if (valid && dispatch) {
          dispatch();
        }
        return valid;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-content {
  padding: 0 40px;
}
::v-deep .dialog-form {
  .el-input.is-disabled .el-input__inner {
    background-color: #fff;
    color: #606266;
  }

  .el-textarea.is-disabled .el-textarea__inner {
    background-color: #fff;
    color: #606266 !important;
  }
}
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
