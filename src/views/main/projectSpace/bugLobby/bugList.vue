<template>
  <div class="task-list">
    <div class="task-item" v-for="bugInfo in bugList" :key="bugInfo.taskId">
      <div>
        <div class="title">
          <div class="name">
            <span style="margin-right: 5px"> {{ bugInfo.taskName }} </span>
            <el-tag
              v-if="bugInfo.priority === '低'"
              type="success"
              size="mini"
              >{{ bugInfo.priority }}</el-tag
            >
            <el-tag v-if="bugInfo.priority === '中'" size="mini">{{
              bugInfo.priority
            }}</el-tag>
            <el-tag
              v-if="bugInfo.priority === '高'"
              type="warning"
              size="mini"
              >{{ bugInfo.priority }}</el-tag
            >
            <el-tag
              v-if="bugInfo.priority === '紧急'"
              type="danger"
              size="mini"
              >{{ bugInfo.priority }}</el-tag
            >
          </div>

          <!-- 按钮 -->
          <el-button-group>
            <el-button
              type="primary"
              size="mini"
              circle
              icon="el-icon-zoom-in"
              @click="checkDetailClick(bugInfo.bugId)"
            />
            <el-button
              type="success"
              size="mini"
              circle
              icon="el-icon-finished"
              @click="receiveBugClick(bugInfo.bugId)"
            />
          </el-button-group>
        </div>
        <div class="content">
          <el-row style="margin-bottom: 4px">
            <el-col :span="8">严重程度:{{ bugInfo.severity }}</el-col>
            <el-col :span="8">报告人:{{ bugInfo.createBy }}</el-col>
            <el-col :span="8"
              >处理人:{{ bugInfo.receiveName ?? "暂未指派" }}</el-col
            >
          </el-row>
          <el-row>
            <el-col :span="16">更新时间:{{ bugInfo.updateTime }}</el-col>
            <el-col :span="8">缺陷类型:{{ bugInfo.bugType }}</el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { receiveBug } from "@/api/bug";
import { mapGetters } from "vuex";

export default {
  props: {
    bugList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(["userInfo", "userId"]),
  },
  methods: {
    checkDetailClick(bugId) {
      this.$router.push({
        path: "/bugDetail",
        query: { bugId: bugId },
      });
    },
    // 领取任务
    receiveBugClick(bugId) {
      const data = {
        realName: this.userInfo.realName,
        userId: this.userInfo.userId,
        bugId: bugId,
      };
      receiveBug(data).then(() => {
        this.$message({
          message: "领取成功！",
          type: "success",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.task-list {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  .task-item {
    width: 33.33%;
    &:hover {
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      background-color: #fff;
    }
    margin: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #f6f6f6;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name {
        display: flex;
        align-items: center;
      }
    }
    ::v-deep .el-descriptions__header {
      margin-bottom: 5px;
    }

    .content {
      font-size: 12px;
      color: #909399;
      text-align: left;
      margin: 4px 0;
    }
  }
}
</style>
