<template>
  <el-dialog
    class="my-dialog"
    :visible.sync="dialogVisible"
    width="80%"
    custom-class="dialog"
    :append-to-body="true"
  >
    <template #title>
      {{ title }}
    </template>
    <el-tabs v-model="activeName" tab-position="left" :stretch="true">
      <el-tab-pane v-if="type !== 'add'" label="基本信息" name="baseInfo">
        <MyDescription :modelValue.sync="formData" v-bind="dialogFormConfig">
          <template #footer>
            <div class="btns">
              <el-button
                type="danger"
                size="small"
                :loading="loading"
                @click="handleDeleteClick"
                >删除</el-button
              >
            </div>
          </template>
        </MyDescription></el-tab-pane
      >
      <el-tab-pane
        v-if="type === 'add' || type === 'edit'"
        :label="type === 'add' ? '新增信息' : '编辑信息'"
        name="editInfo"
      >
        <MyForm
          ref="form"
          v-bind="dialogFormConfig"
          :modelValue.sync="formData"
        >
          <template #footer>
            <div class="btns">
              <el-button plain size="small" @click="handleCancelClick"
                >取消</el-button
              >
              <el-button
                type="primary"
                v-if="type === 'add'"
                size="small"
                @click="handleAddClick"
                >新增</el-button
              >
              <el-button
                type="primary"
                v-if="type !== 'add'"
                size="small"
                :loading="loading"
                @click="handleEditClick"
                >修改</el-button
              >
            </div>
          </template>
        </MyForm></el-tab-pane
      >
      <slot name="otherTab" :data="formData"></slot>
    </el-tabs>
  </el-dialog>
</template>

<script>
import MyForm from "./form.vue";
import MyDescription from "./description.vue";
export default {
  components: {
    MyForm,
    MyDescription,
  },
  props: {
    dialogFormConfig: {
      type: Object,
      required: true,
    },
    pageName: {
      type: String,
      default: "name",
    },
    isCustomMethos: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    // 弹出框标题
    title() {
      const name = this.dialogFormConfig.name;
      const typeObj = {
        add: `新增${name}`,
        edit: `编辑${name}`,
        check: `预览${name}`,
        delete: `删除${name}`,
      };
      return typeObj[this.type];
    },
  },
  data() {
    return {
      formData: {},
      dialogVisible: false,
      type: "add",
      loading: false,
      activeName: "editInfo",
    };
  },

  mounted() {
    this.initFormData([]);
  },
  methods: {
    openDialog(type, data = []) {
      this.dialogVisible = true;
      this.type = type;
      const typeObj = {
        add: `editInfo`,
        edit: `editInfo`,
        check: `baseInfo`,
        delete: `baseInfo`,
      };
      this.activeName = typeObj[this.type];
      this.initFormData(data);
    },
    initFormData(data) {
      // 传给form组件的值
      // 从配置中拿到搜索列表数据\
      let formDataOrigin = [];
      if (this.dialogFormConfig.formItems) {
        formDataOrigin = this.dialogFormConfig.formItems;
      }
      // 遍历搜索列表数据,初始化为空
      for (const item of formDataOrigin) {
        let value = "";
        if (data[item.field]) {
          // 如有数据，则修改、查看、删除，赋值列表数据
          value = data[item.field];
        } else if (item.defaultValue) {
          // 没有数据，则是新建，有默认值则赋给默认值
          value = item.defaultValue;
        }
        this.$set(this.formData, item.field, value);
      }
    },
    // 取消弹窗
    handleCancelClick() {
      this.dialogVisible = false;
    },
    // 新增
    handleAddClick() {
      const data = {};
      for (const item of this.dialogFormConfig.formItems) {
        if (!item.isId) {
          data[item.field] = "";
        }
      }
      if (!this.isCustomMethos) {
        this.dispatchAction("addPageDataAction");
      } else {
        const fn = () => {
          this.$emit("handleAddClick", this.formData);
        };
        this.$refs.form.validateForm(fn);
      }
    },
    // 编辑
    handleEditClick() {
      if (!this.isCustomMethos) {
        this.dispatchAction("updateDataAction");
      } else {
        const fn = () => {
          this.$emit("handleEditClick", this.formData);
        };
        this.$refs.form.validateForm(fn);
      }
    },
    // 删除
    handleDeleteClick() {
      if (!this.isCustomMethos) {
        this.dispatchAction("deleteDateAction");
      } else {
        this.$emit("handleDeleteClick", this.formData);
      }
    },

    // 进行表单验证后，触发仓库中新增、删除、修改事件，封装起来
    dispatchAction(action) {
      const dispatch = () => {
        this.loading = true;
        this.$store
          .dispatch(action, {
            pageName: this.pageName,
            data: this.formData,
          })
          .then((res) => {
            this.dialogVisible = false;
            this.loading = false;
          })
          .catch((err) => {
            this.loading = false;
          });
      };
      this.$refs.form.validateForm(dispatch);
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-dialog {
  border-radius: 5px;
}

.btns {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  box-sizing: border-box;
  padding: 0 40px;
  margin-top: 10px;
}
</style>
