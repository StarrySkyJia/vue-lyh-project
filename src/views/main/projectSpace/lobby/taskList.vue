<template>
  <div class="task-list">
    <div class="task-item" v-for="taskInfo in taskList" :key="taskInfo.taskId">
      <div>
        <div class="title">
          <div class="name">
            <span style="margin-right: 5px"> {{ taskInfo.taskName }} </span>
            <el-tag
              v-if="taskInfo.priority === '低'"
              type="success"
              size="mini"
              >{{ taskInfo.priority }}</el-tag
            >
            <el-tag v-if="taskInfo.priority === '中'" size="mini">{{
              taskInfo.priority
            }}</el-tag>
            <el-tag
              v-if="taskInfo.priority === '高'"
              type="warning"
              size="mini"
              >{{ taskInfo.priority }}</el-tag
            >
            <el-tag
              v-if="taskInfo.priority === '紧急'"
              type="danger"
              size="mini"
              >{{ taskInfo.priority }}</el-tag
            >
          </div>

          <!-- 按钮 -->
          <el-button-group>
            <el-button
              type="primary"
              size="mini"
              circle
              icon="el-icon-zoom-in"
              @click="checkDetailClick(taskInfo.taskId)"
            />
            <el-button
              type="success"
              size="mini"
              circle
              icon="el-icon-finished"
              @click="receiveTaskClick(taskInfo.taskId)"
            />
          </el-button-group>
        </div>
        <div class="content">
          <el-row style="margin-bottom: 4px">
            <el-col :span="8">创建者:{{ taskInfo.createBy }}</el-col>
            <el-col :span="8"
              >处理人:{{
                taskInfo.receiveName ? taskInfo.receiveName : "暂未指派"
              }}</el-col
            >
          </el-row>
          <el-row>
            <el-col :span="16">更新时间:{{ taskInfo.updateTime }}</el-col>
            <el-col :span="8">任务类型:{{ taskInfo.taskType }}</el-col>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { receiveTask } from "@/api/task";
import { mapGetters } from "vuex";

export default {
  props: {
    taskList: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters(["userInfo", "userId"]),
  },
  methods: {
    checkDetailClick(taskId) {
      this.$router.push({
        path: "taskDetail",
        query: { taskId: taskId },
      });
    },
    // 领取任务
    receiveTaskClick(taskId) {
      const data = {
        realName: this.userInfo.realName,
        userId: this.userInfo.userId,
        taskId: taskId,
      };
      receiveTask(data).then(() => {
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
  flex-wrap: wrap;
  .task-item {
    width: 30%;
    flex-shrink: 0;
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
