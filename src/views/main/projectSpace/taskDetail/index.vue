<template>
  <!-- 任务差个附件地址 -->
  <div class="task">
    <div class="btn">
      <el-button type="info" size="mini" @click="back"> 返回</el-button>
      <el-button
        type="primary"
        v-if="task.createById !== userId"
        size="mini"
        @click="receiveTaskClick"
      >
        领取该任务</el-button
      >
      <el-button
        type="success"
        v-if="task.receiveName"
        size="mini"
        @click="updateTaskStatusClick"
      >
        修改任务状态</el-button
      >
    </div>

    <el-tabs tab-position="left">
      <el-tab-pane label="任务信息">
        <div class="info">
          <el-descriptions :column="2">
            <el-descriptions-item label="任务名" :span="2">{{
              task.taskName
            }}</el-descriptions-item>
            <el-descriptions-item label="创建者">{{
              task.createBy
            }}</el-descriptions-item>
            <el-descriptions-item label="处理者">{{
              task.receiveName ? task.receiveName : "暂未指派"
            }}</el-descriptions-item>
            <el-descriptions-item label="所属系统">{{
              task.itemName
            }}</el-descriptions-item>
            <el-descriptions-item label="所属模块">{{
              task.moduleName
            }}</el-descriptions-item>
            <el-descriptions-item label="处理状态 ">
              <el-tag
                v-if="task.solveStatus === '未处理'"
                type="danger"
                size="mini"
                >未处理</el-tag
              >
              <el-tag
                v-if="task.solveStatus === '处理中'"
                type="primary"
                size="mini"
                >处理中</el-tag
              >
              <el-tag
                v-if="task.solveStatus === '已完成'"
                type="success"
                size="mini"
                >已完成</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item label="处理时间 ">{{
              task.solveTime
            }}</el-descriptions-item>
            <el-descriptions-item label="任务类型">{{
              task.taskType
            }}</el-descriptions-item>
            <el-descriptions-item label="优先级 ">
              <el-tag
                v-if="task.priority === '低'"
                type="success"
                size="mini"
                >{{ task.priority }}</el-tag
              >
              <el-tag v-if="task.priority === '中'" size="mini">{{
                task.priority
              }}</el-tag>
              <el-tag
                v-if="task.priority === '高'"
                type="warning"
                size="mini"
                >{{ task.priority }}</el-tag
              >
              <el-tag
                v-if="task.priority === '紧急'"
                type="danger"
                size="mini"
                >{{ task.priority }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item label="任务描述">{{
              task.content
            }}</el-descriptions-item>
          </el-descriptions>
        </div>
      </el-tab-pane>
      <el-tab-pane label="评论">
        <comment :commentList="commentList" @comment="addCommentClick" />
      </el-tab-pane>
    </el-tabs>
    <UpdateDialog ref="dialogRef" @comfirm="handleUpdateStatusClick" />
  </div>
</template>

<script>
import comment from "./comment";
import UpdateDialog from "@/components/update-dialog";

import { addComment } from "@/api/comment";
import { getTaskDetail, receiveTask, updateTaskStatus } from "@/api/task";
import { mapGetters } from "vuex";
export default {
  components: { comment, UpdateDialog },
  data() {
    return {
      taskId: this.$route.query.taskId,
      commentList: [],
      task: {},
    };
  },
  computed: {
    ...mapGetters(["userInfo", "userId"]),
  },
  mounted() {
    getTaskDetail({ taskId: this.taskId }).then((res) => {
      this.task = res;
      this.commentList = res.commentInfoVOList;
    });
  },
  methods: {
    // 添加评论
    addCommentClick(form) {
      form.commentType = 2;
      form.realName = this.userInfo.realName;
      form.userId = this.userInfo.userId;
      form.taskId = this.task.taskId;
      form.taskName = this.task.taskName;
      addComment(form).then(() => {
        getTaskDetail({ taskId: this.taskId }).then((res) => {
          this.task = res;
          this.commentList = res.commentInfoVOList;
        });
      });
    },
    // 返回上一级
    back() {
      this.$router.back();
    },
    // 领取任务
    receiveTaskClick() {
      const data = {
        realName: this.userInfo.realName,
        userId: this.userInfo.userId,
        taskId: this.task.taskId,
      };
      receiveTask(data).then(() => {
        this.$message({
          message: "领取成功！",
          type: "success",
        });
      });
    },
    updateTaskStatusClick() {
      this.$refs.dialogRef.dialogFormVisible = true;
    },
    // 修改状态
    handleUpdateStatusClick(status) {
      updateTaskStatus({
        receiveId: this.userId,
        taskId: this.task.taskId,
        solveStatus: status,
      }).then(() => {
        this.$refs.dialogRef.dialogFormVisible = false;
        this.$message({
          message: "修改任务状态成功!",
          type: "success",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.task {
  .info {
    padding: 0 40px;
    box-sizing: border-box;
  }

  .btn {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin-bottom: 10px;
  }
}
</style>
