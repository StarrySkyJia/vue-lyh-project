<template>
  <div>
    <SearchPane
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="resetBtnClick"
      @queryBtnClick="queryBtnClick"
    />
    <BugList :bugList="bugList" />

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
import BugList from "./bugList.vue";
import { getBugLobbyList } from "@/api/bug";
import { searchFormConfig } from "./config/search.config";

export default {
  components: {
    SearchPane,
    BugList,
  },
  data() {
    return {
      itemId: this.$route.query.itemId,
      searchFormConfig: searchFormConfig,
      queryInfo: {},
      bugList: [],
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
      this.getBugList();
    },
    //重置查询
    resetBtnClick(queryInfo) {
      this.queryInfo = queryInfo;
      this.getBugList();
    },
    // 获取页面数据
    getBugList() {
      this.queryInfo.itemId = this.itemId;
      this.queryInfo.pageSize = this.pageInfo.pageSize;
      this.queryInfo.pageNum = this.pageInfo.pageNum;
      getBugLobbyList(this.queryInfo).then((res) => {
        this.bugList = res.bugInfoVOList;
        this.total = res.total;
      });
    },
    // 切换页码大小
    handleSizeChange(pageSize) {
      this.pageInfo.pageSize = pageSize;
      this.getBugList();
    },
    // 切换页面
    handleCurrentChange(pageNum) {
      this.pageInfo.pageNum = pageNum;
      this.getBugList();
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
