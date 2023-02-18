<template>
  <div>
    <SearchPane
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="resetBtnClick"
      @queryBtnClick="queryBtnClick"
    ></SearchPane>

    <div class="btn">
      <el-button size="small" type="primary" @click="addModuleClick"
        >新增模块</el-button
      >
    </div>

    <!-- 表格 -->
    <ModuleTable
      :moduleList="moduleList"
      :total="total"
      @delete="handleDeleteClick"
      @edit="handleEditModule"
      @pageNum="handleCurrentChange"
      @pageSize="handleSizeChange"
    ></ModuleTable>
    <!-- 弹窗 -->
    <Dialog
      ref="dialogRef"
      :dialogFormConfig="dialogFormConfig"
      @handleAddClick="handleAddClick"
      @handleEditClick="handleEditClick"
      @handleDeleteClick="handleDeleteClick"
      :isCustomMethos="true"
    ></Dialog>
  </div>
</template>

<script>
import SearchPane from "@/components/search-pane";
import ModuleTable from "./module-table.vue";
import Dialog from "@/components/dialog-pane";
import { searchFormConfig } from "./config/search.config";
import { dialogFormConfig } from "./config/dialog.config";
import {
  getModuleList,
  addModule,
  updateModule,
  deleteModule,
} from "@/api/module/module.js";
export default {
  components: {
    SearchPane,
    ModuleTable,
    Dialog,
  },
  data() {
    return {
      itemId: this.$route.query.itemId,
      searchFormConfig: searchFormConfig,
      dialogFormConfig: dialogFormConfig,
      moduleList: [],
      queryInfo: {},
      pageInfo: {
        pageSize: 10,
        pageNum: 0,
      },
      total: 0,
    };
  },
  mounted() {
    this.getPageData();
  },
  methods: {
    // 打开添加模块弹窗
    addModuleClick() {
      this.$refs.dialogRef.openDialog("add");
    },
    // 添加新模块
    handleAddClick(data) {
      addModule(data).then((res) => {
        this.updateSuccess("添加新模块成功！");
      });
    },
    // 编辑模块
    handleEditModule(row) {
      this.$refs.dialogRef.openDialog("edit", row);
    },
    handleEditClick(data) {
      updateModule(data).then(() => {
        this.updateSuccess("修改模块成功！");
      });
    },
    // 删除模块
    handleDeleteClick(data) {
      deleteModule(data.moduleId).then(() => {
        this.updateSuccess("删除成功");
      });
    },
    // 更新后触发刷新页面
    async updateSuccess(message) {
      this.$message({
        message: message,
        type: "success",
      });
      this.$refs.dialogRef.handleCancelClick();
      this.$store.dispatch("getAllModuleAction");
      await this.getPageData();
    },
    // 查询按钮/重置
    queryBtnClick(queryInfo) {
      this.queryInfo = queryInfo;
      this.getPageData();
    },
    resetBtnClick(queryInfo) {
      this.queryInfo = queryInfo;
      this.getPageData();
    },

    // 切换页码大小
    handleSizeChange(pageSize) {
      this.pageInfo.pageSize = pageSize;
      this.getPageData();
    },
    // 切换页面
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum;
      this.getPageData();
    },
    // 获取页面数据
    getPageData() {
      this.queryInfo.itemId = this.itemId;
      this.queryInfo.pageSize = this.pageInfo.pageSize;
      this.queryInfo.pageNum = this.pageInfo.pageNum;
      getModuleList(this.queryInfo).then((res) => {
        this.moduleList = res.moduleInfoVOList;
        this.total = res.total;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}
</style>
