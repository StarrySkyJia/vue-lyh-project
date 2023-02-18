<template>
  <div class="task-list">
    <div class="task-box">
      <div class="task-title">
        <div class="line"></div>
        未处理
      </div>
      <el-empty
        v-if="taskList_unresolved.length === 0"
        description="暂无数据"
      ></el-empty>
      <div v-for="taskItem in taskList_unresolved" :key="taskItem.taskId">
        <CardItem
          type="unsolved"
          :taskInfo="taskItem"
          @changeUpdate="changeStatus"
          @checkDetial="checkDetailClick"
        />
      </div>
    </div>
    <div class="task-box">
      <div class="task-title solving">
        <div class="line line-solving"></div>
        处理中
      </div>
      <el-empty
        v-if="taskList_solving.length === 0"
        description="暂无数据"
      ></el-empty>
      <div v-for="taskItem in taskList_solving" :key="taskItem.taskId">
        <CardItem
          type="solving"
          :taskInfo="taskItem"
          @changeUpdate="changeStatus"
        />
      </div>
    </div>
    <div class="task-box">
      <div class="task-title resolved">
        <div class="line line-resolved"></div>
        已解决
      </div>
      <el-empty
        v-if="taskList_resolved.length === 0"
        description="暂无数据"
      ></el-empty>
      <div v-for="taskItem in taskList_resolved" :key="taskItem.taskId">
        <CardItem
          type="resolved"
          :taskInfo="taskItem"
          @changeUpdate="changeStatus"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardItem from "./cardItem.vue";
export default {
  components: { CardItem },
  props: {
    taskList: {
      type: Array,
      require: true,
    },
  },
  computed: {
    taskList_unresolved() {
      return this.taskList.filter((task) => {
        return task.solveStatus === "未处理";
      });
    },
    taskList_solving() {
      return this.taskList.filter((task) => {
        return task.solveStatus === "处理中";
      });
    },
    taskList_resolved() {
      return this.taskList.filter((task) => {
        return task.solveStatus === "已完成";
      });
    },
  },
  data() {
    return {};
  },
  methods: {
    changeStatus() {
      this.$emit("updateTaskList");
    },
    checkDetailClick(taskId) {
      this.$emit("checkDetail", taskId);
    },
  },
};
</script>

<style lang="scss" scoped>
.task-list {
  width: 100%;
  display: flex;
  justify-content: center;
  flex: 1;
  .task-box {
    border: #ccc 1px solid;
    flex: 1;
    height: 100%;
    margin: 0 10px;
    border-radius: 10px;
    overflow: hidden;
    .task-title {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      text-align: left;
      color: #f56c6c;
      font-size: 18px;
      padding: 10px;
      .line {
        display: inline-block;
        width: 5px;
        height: 20px;
        border-radius: 5px;
        background-color: #f56c6c;
        margin-right: 5px;
      }

      .line-solving {
        background-color: #409eff;
      }
      .line-resolved {
        background-color: #67c23a;
      }
    }
    .solving {
      color: #409eff;
    }
    .resolved {
      color: #67c23a;
    }
  }
}
</style>
