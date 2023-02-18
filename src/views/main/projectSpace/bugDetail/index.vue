<template>
  <!-- 任务差个附件地址 -->
  <div class="bug">
    <div class="btn">
      <el-button type="info" size="mini" @click="back"> 返回</el-button>
      <el-button type="primary" size="mini" @click="receiveBugClick">
        领取该缺陷</el-button
      >
      <el-button
        type="success"
        v-if="bug.receiveName"
        size="mini"
        @click="updateBugStatusClick"
      >
        修改缺陷状态</el-button
      >
    </div>

    <el-tabs tab-position="left">
      <el-tab-pane label="缺陷信息">
        <div class="info">
          <el-descriptions :column="2">
            <el-descriptions-item label="缺陷名" :span="2">{{
              bug.bugTitle
            }}</el-descriptions-item>
            <el-descriptions-item label="创建者">{{
              bug.createBy
            }}</el-descriptions-item>
            <el-descriptions-item label="处理者">{{
              bug.receiveName ?? "暂未指派"
            }}</el-descriptions-item>
            <el-descriptions-item label="所属系统">{{
              bug.itemName
            }}</el-descriptions-item>
            <el-descriptions-item label="所属模块">{{
              bug.moduleName
            }}</el-descriptions-item>
            <el-descriptions-item label="处理状态 ">
              <el-tag
                v-if="bug.solveStatus === '未处理'"
                type="danger"
                size="mini"
                >未处理</el-tag
              >
              <el-tag
                v-if="bug.solveStatus === '处理中'"
                type="primary"
                size="mini"
                >处理中</el-tag
              >
              <el-tag
                v-if="bug.solveStatus === '已完成'"
                type="success"
                size="mini"
                >已完成</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item label="处理时间 ">{{
              bug.solveTime
            }}</el-descriptions-item>
            <el-descriptions-item label="任务类型">{{
              bug.bugType
            }}</el-descriptions-item>
            <el-descriptions-item label="严重程度">{{
              bug.severity
            }}</el-descriptions-item>
            <el-descriptions-item label="优先级 ">
              <el-tag v-if="bug.priority === '低'" type="success" size="mini">{{
                bug.priority
              }}</el-tag>
              <el-tag v-if="bug.priority === '中'" size="mini">{{
                bug.priority
              }}</el-tag>
              <el-tag v-if="bug.priority === '高'" type="warning" size="mini">{{
                bug.priority
              }}</el-tag>
              <el-tag
                v-if="bug.priority === '紧急'"
                type="danger"
                size="mini"
                >{{ bug.priority }}</el-tag
              >
            </el-descriptions-item>
            <el-descriptions-item label="缺陷描述">{{
              bug.content
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
import { getBugDetail, receiveBug, updateBugStatus } from "@/api/bug";
import { mapGetters } from "vuex";
export default {
  components: { comment, UpdateDialog },
  data() {
    return {
      bugId: this.$route.query.bugId,
      commentList: [],
      bug: {},
    };
  },
  computed: {
    ...mapGetters(["userInfo", "userId"]),
  },
  mounted() {
    getBugDetail({ bugId: this.bugId }).then((res) => {
      this.bug = res;
      this.commentList = res.commentInfoVOList;
    });
  },
  methods: {
    // 添加评论
    addCommentClick(form) {
      form.commentType = 1;
      form.realName = this.userInfo.realName;
      form.userId = this.userInfo.userId;
      form.bugId = this.bug.bugId;
      form.bugName = this.bug.bugName;
      addComment(form).then(() => {
        getBugDetail({ bugId: this.bugId }).then((res) => {
          this.bug = res;
          this.commentList = res.commentInfoVOList;
        });
      });
    },
    // 返回上一级
    back() {
      this.$router.back();
    },
    // 领取任务
    receiveBugClick() {
      const data = {
        realName: this.userInfo.realName,
        userId: this.userInfo.userId,
        bugId: this.bug.bugId,
      };
      receiveBug(data).then(() => {
        this.$message({
          message: "领取成功！",
          type: "success",
        });
      });
    },
    updateBugStatusClick() {
      this.$refs.dialogRef.dialogFormVisible = true;
    },
    // 修改状态
    handleUpdateStatusClick(status) {
      updateBugStatus({
        receiveId: this.userId,
        bugId: this.bug.bugId,
        solveStatus: status,
      }).then(() => {
        this.$refs.dialogRef.dialogFormVisible = false;
        this.$message({
          message: "修改缺陷状态成功!",
          type: "success",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.bug {
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
