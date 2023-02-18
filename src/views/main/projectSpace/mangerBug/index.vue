<template>
  <div class="task-manger">
    <SearchPane
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="resetBtnClick"
      @queryBtnClick="queryBtnClick"
    ></SearchPane>
    <div class="btns">
      <div>
        <el-button type="info" plain size="mini" @click="checkMyBugClick"
          >我处理的</el-button
        >
        <el-button type="info" plain size="mini" @click="checkMyCreateBugClick"
          >我创建的</el-button
        >
        <el-button type="info" plain size="mini" @click="checkAllBugClick"
          >全部</el-button
        >
      </div>
      <el-button size="mini" type="primary" @click="addBugClick"
        >新建缺陷</el-button
      >
    </div>
    <cardList
      :bugList="bugList"
      @updateBugList="updateBugList"
      @checkDetail="checkDetail"
    ></cardList>

    <!-- 查看、新增、修改弹窗 -->
    <DialogPane
      ref="dialogRef"
      :isCustomMethos="true"
      @handleAddClick="handleAddClick"
      :dialogFormConfig="dialogFormConfig"
    ></DialogPane>

    <!-- 新建任务确认弹窗 -->
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
import { getBugsByCondition, publishBug } from "@/api/bug";
import { mapGetters } from "vuex";
import {
  dialogFormConfig,
  getBugType,
  getSeverity,
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
      bugList: [],
    };
  },
  computed: {
    ...mapGetters(["projectInfo", "userInfo"]),
  },
  mounted() {
    setSelectOption(getBugType, this.dialogFormConfig, "bugTypeLabel");
    setSelectOption(getPriority, this.dialogFormConfig, "priorityLabel");
    setSelectOption(getSeverity, this.dialogFormConfig, "severityLabel");
  },
  watch: {
    moduleInfo: {
      handler(newInfo) {
        this.moduleId = newInfo.moduleId;
        this.getBugList();
      },
      deep: true,
    },
  },
  methods: {
    // 组件加载后会触发一次，进行页面初始化
    queryBtnClick(queryInfo) {
      this.queryInfo = queryInfo;
      this.getBugList();
    },
    resetBtnClick(queryInfo) {
      this.queryInfo = queryInfo;
      this.getBugList();
    },
    // 获取任务列表数据
    getBugList() {
      this.queryInfo.moduleId = this.moduleId;
      this.queryInfo.pageNum = 0;
      this.queryInfo.pageSize = 10;
      this.queryInfo.userId = this.userInfo.userId;
      this.bugList = [];
      getBugsByCondition(this.queryInfo).then((res) => {
        this.bugList = res.bugInfoVOList;
      });
    },
    // 打开添加任务弹窗
    addBugClick() {
      this.$refs.dialogRef.openDialog("add");
    },
    // 编辑任务
    editBugClick() {
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
      publishBug(this.formData).then((res) => {
        this.$message({
          message: "发布任务成功!",
          type: "success",
        });
        this.$refs.comfirmRef.dialogFormVisible = false;
        this.$refs.dialogRef.handleCancelClick();
        this.getBugList();
      });
    },
    // 修改任务状态后刷新页面
    updateBugList() {
      this.getBugList();
    },
    // 查看任务信息页面
    checkDetail(bugId) {
      this.$router.push({
        path: "/bugDetail",
        query: { bugId },
      });
    },
    // 按类型查看缺陷
    checkAllBugClick() {
      this.queryInfo.type = 0;
      this.getBugList();
    },
    checkMyBugClick() {
      this.queryInfo.type = 2;
      this.getBugList();
    },
    checkMyCreateBugClick() {
      this.queryInfo.type = 1;
      this.getBugList();
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
