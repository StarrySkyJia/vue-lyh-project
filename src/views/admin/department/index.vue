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
      pageName="department"
    >
      <template #otherTab="scope">
        <el-tab-pane label="成员管理" name="member ">
          <Transfer :deptId="scope.data.deptId" />
        </el-tab-pane>
      </template>
    </ContentPane>
  </div>
</template>

<script>
import SearchPane from "@/components/search-pane";
import ContentPane from "@/components/content-pane";
import Transfer from "./transfer";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { dialogFormConfig, getUserOptions } from "./config/dialog.config";
import { setSelectOption } from "@/hooks/select-option.js";

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
    Transfer,
  },
  mounted() {
    setSelectOption(getUserOptions, this.dialogFormConfig, "managerName");
  },
  methods: {
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
