<template>
  <div class="my-description">
    <div class="header">
      <slot name="header"></slot>
    </div>

    <div class="content">
      <el-descriptions border>
        <el-descriptions-item
          v-for="item in formItems"
          :key="item.label"
          :label="item.label"
          :span="item.span"
        >
          <div v-if="item.isPic">
            <el-avatar :src="modelValue[`${item.field}`]"></el-avatar>
          </div>
          <div v-else>
            {{ modelValue[`${item.field}`] }}
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </div>

    <div class="footer">
      <slot name="footer"></slot>
    </div>
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
    itemStyle: {
      type: Object,
      default: () => ({ padding: "10px 40px" }),
    },
  },
};
</script>

<style lang="scss" scoped>
.my-description {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px 40px;
  box-sizing: border-box;
  .content {
    width: 100%;
  }
}
</style>
