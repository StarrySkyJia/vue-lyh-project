<template>
  <div>
    <SearchPane
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="resetBtnClick"
      @queryBtnClick="queryBtnClick"
    ></SearchPane>
    <ContentPane
      ref="contentRef"
      :contentTableConfig="contentTableConfig"
      :dialogFormConfig="dialogFormConfig"
      pageName="role"
    >
    </ContentPane>
  </div>
</template>

<script>
import SearchPane from "@/components/search-pane";
import ContentPane from "@/components/content-pane";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { dialogFormConfig } from "./config/dialog.config";

export default {
  data() {
    return {
      searchFormConfig: searchFormConfig,
      contentTableConfig: contentTableConfig,
      dialogFormConfig: dialogFormConfig,
    };
  },
  components: {
    SearchPane,
    ContentPane,
  },
  mounted() {},
  methods: {
    // search中触发传给父组件的事件，其中就包含了search的数据，再调用content的获取数据方法
    // 由于不是vue3，无法使用hooks进行动态绑定
    queryBtnClick(queryInfo) {
      this.$refs.contentRef.getPageTableList(queryInfo);
    },
    resetBtnClick(queryInfo) {
      this.$refs.contentRef.getPageTableList(queryInfo);
    },
  },
};
</script>

<style lang="scss" scoped></style>
