<template>
  <div class="search-pane">
    <MyForm v-bind="searchFormConfig" :modelValue.sync="formData">
      <template #btns>
        <el-button plain size="small" @click="handleResetClick">重置</el-button>
        <el-button type="primary" size="small" @click="handleQueryClick"
          >提交</el-button
        >
      </template>
      <template #advanceBtn>
        <el-button plain size="small" @click="handleResetClick">重置</el-button>
        <el-button type="primary" size="small" @click="handleQueryClick"
          >提交</el-button
        >
      </template></MyForm
    >
    <el-divider></el-divider>
  </div>
</template>

<script>
import MyForm from "./form.vue";

export default {
  components: {
    MyForm,
  },
  props: {
    searchFormConfig: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formData: {},
    };
  },
  mounted() {
    // 传给form组件的值
    // 从配置中拿到搜索列表数据
    const formDataOrigin = this.searchFormConfig.formItems ?? [];
    const formDataAdOrigin = this.searchFormConfig.advanceFormItems ?? [];
    // 遍历搜索列表数据,初始化为空
    for (const item of formDataOrigin) {
      let value = "";
      if (item.defaultValue || item.defaultValue === 0) {
        // 没有数据，则是新建，有默认值则赋给默认值
        value = item.defaultValue;
      }
      this.$set(this.formData, item.field, value);
    }
    for (const item of formDataAdOrigin) {
      let value = "";
      if (item.defaultValue || item.defaultValue === 0) {
        // 没有数据，则是新建，有默认值则赋给默认值
        value = item.defaultValue;
      }
      this.$set(this.formData, item.field, value);
    }
    this.$emit("queryBtnClick", this.formData);
  },
  methods: {
    // 重置搜索
    handleResetClick() {
      const formDataOrigin = [
        ...(this.searchFormConfig.formItems ?? []),
        ...(this.searchFormConfig.advanceFormItems ?? []),
      ];
      for (const item of formDataOrigin) {
        this.$set(this.formData, item.field, item.defaultValue ?? "");
      }
      this.$emit("resetBtnClick", this.formData);
    },
    // 搜索处理
    handleQueryClick() {
      this.$emit("queryBtnClick", this.formData);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 10px 0;
}
</style>
