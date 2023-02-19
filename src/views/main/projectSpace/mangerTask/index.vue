<template>
  <div class="task-manger">
    <SearchPane
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="resetBtnClick"
      @queryBtnClick="queryBtnClick"
    ></SearchPane>

    <div class="btns">
      <div>
        <el-button type="info" plain size="mini" @click="checkMyTaskClick"
          >我处理的</el-button
        >
        <el-button type="info" plain size="mini" @click="checkMyCreateTaskClick"
          >我创建的</el-button
        >
        <el-button type="info" plain size="mini" @click="checkAllTaskClick"
          >全部</el-button
        >
      </div>
      <el-button size="mini" type="primary" @click="addTaskClick"
        >新建任务</el-button
      >
    </div>
    <cardList
      :taskList="taskList"
      @updateTaskList="updateTaskList"
      @checkDetail="checkDetail"
    ></cardList>

    <!-- 查看、新增、修改弹窗 -->
    <DialogPane
      ref="dialogRef"
      :isCustomMethos="true"
      @handleAddClick="handleAddClick"
      :dialogFormConfig="dialogFormConfig"
    ></DialogPane>

    <!-- 确认弹窗 -->
    <comfirmDialog
      :itemId="this.projectInfo.itemId"
      ref="comfirmRef"
      @comfirm="handlePublishClick"
      @select="handleReceiveClick"
    ></comfirmDialog>
  </div>
</template>

<script>
import SearchPane from "@/components/search-pane";
import DialogPane from "@/components/dialog-pane";
import comfirmDialog from "./components/comfirmDialog.vue";
import cardList from "./components/cardList.vue";
import { searchFormConfig } from "./config/search.config";
import { getTasksByCondition, publishTask } from "@/api/task";
import { mapGetters } from "vuex";
import {
  dialogFormConfig,
  getTaskType,
  getPriority,
} from "./config/dialog.config";
import { setSelectOption } from "@/hooks/select-option.js";

export default {
  components: {
    DialogPane,
    cardList,
    comfirmDialog,
    SearchPane,
  },
  data() {
    return {
      searchFormConfig: searchFormConfig,
      dialogFormConfig: dialogFormConfig,
      moduleId: this.$route.query.moduleId,
      formData: {},
      queryInfo: {},
      taskList: [],
    };
  },
  computed: {
    ...mapGetters(["projectInfo", "userInfo", "moduleInfo"]),
  },
  mounted() {
    setSelectOption(getTaskType, this.dialogFormConfig, "taskTypeLabel");
    setSelectOption(getPriority, this.dialogFormConfig, "priorityLabel");
  },
  watch: {
    moduleInfo: {
      handler(newInfo) {
        this.moduleId = newInfo.moduleId;
        this.getTaskList();
      },
      deep: true,
    },
  },
  methods: {
    // 组件加载后会触发一次，进行页面初始化
    queryBtnClick(queryInfo) {
      this.queryInfo = queryInfo;
      this.getTaskList();
    },
    resetBtnClick(queryInfo) {
      this.queryInfo = queryInfo;
      this.getTaskList();
    },
    // 获取任务列表数据
    getTaskList() {
      console.log(this.moduleId);
      this.queryInfo.moduleId = this.moduleId;
      this.queryInfo.pageNum = 0;
      this.queryInfo.pageSize = 10;
      this.queryInfo.userId = this.userInfo.userId;
      this.taskList = [];

      getTasksByCondition(this.queryInfo).then((res) => {
        this.taskList = res.taskInfoVOList;
      });
    },
    // 打开添加任务弹窗
    addTaskClick() {
      this.$refs.dialogRef.openDialog("add");
    },
    // 编辑任务
    editTaskClick() {
      this.$refs.dialogRef.openDialog("edit");
    },
    // 添加任务信息填写后二次确定，并且选择抄送人
    handleAddClick(data) {
      this.formData = data;
      this.$refs.comfirmRef.dialogFormVisible = true;
    },
    // 选择抄送人
    handleReceiveClick(receiver) {
      this.formData.receiveId = receiver.userId;
      this.formData.receiveName = receiver.realName;
    },
    // 发布任务
    handlePublishClick() {
      publishTask(this.formData).then((res) => {
        this.$message({
          message: "发布任务成功!",
          type: "success",
        });
        this.$refs.comfirmRef.dialogFormVisible = false;
        this.$refs.dialogRef.handleCancelClick();
        this.getTaskList();
      });
    },
    // 修改任务状态后刷新页面
    updateTaskList() {
      this.getTaskList();
    },
    // 查看任务信息页面
    checkDetail(taskId) {
      this.$router.push({
        path: "/taskDetail",
        query: { taskId },
      });
    },
    // 按类型查看缺陷
    checkAllTaskClick() {
      this.queryInfo.type = 0;
      this.getTaskList();
    },
    checkMyTaskClick() {
      this.queryInfo.type = 2;
      this.getTaskList();
    },
    checkMyCreateTaskClick() {
      this.queryInfo.type = 1;
      this.getTaskList();
    },
  },
};
</script>

<style lang="scss" scoped>
.task-manger {
  display: flex;
  flex-direction: column;
  height: 90%;

  .btns {
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 10px;
  }
}
</style>
