<template>
  <div>
    <SearchPane
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="resetBtnClick"
      @queryBtnClick="queryBtnClick"
    />
    <TaskList :taskList="taskList" />

    <div class="page-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[15, 30, 45]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import SearchPane from "@/components/search-pane";
import TaskList from "./taskList.vue";
import { getTaskLobbyList } from "@/api/task";
import { searchFormConfig } from "./config/search.config";

export default {
  components: {
    SearchPane,
    TaskList,
  },
  data() {
    return {
      itemId: this.$route.query.itemId,
      searchFormConfig: searchFormConfig,
      queryInfo: {},
      taskList: [],
      total: 0,
      pageInfo: {
        pageSize: 15,
        pageNum: 0,
      },
    };
  },

  mounted() {},
  methods: {
    // 查询
    queryBtnClick(queryInfo) {
      this.queryInfo = queryInfo;
      this.getTaskList();
    },
    //重置查询
    resetBtnClick(queryInfo) {
      this.queryInfo = queryInfo;
      this.getTaskList();
    },
    // 获取页面数据
    getTaskList() {
      this.queryInfo.itemId = this.itemId;
      this.queryInfo.pageSize = this.pageInfo.pageSize;
      this.queryInfo.pageNum = this.pageInfo.pageNum;
      getTaskLobbyList(this.queryInfo).then((res) => {
        this.taskList = res.taskInfoVOList;
        this.total = res.total;
      });
    },
    // 切换页码大小
    handleSizeChange(pageSize) {
      this.pageInfo.pageSize = pageSize;
      this.getTaskList();
    },
    // 切换页面
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum;
      this.getTaskList();
    },
  },
};
</script>

<style lang="scss" scoped>
.page-pagination {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
}
</style>
