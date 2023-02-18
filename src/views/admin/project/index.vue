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
      pageName="project"
    >
      <template #projectInfo="scope">
        <div class="project-info">
          <el-avatar shape="square" :src="scope.row.itemImgUrl"></el-avatar>
          <div class="name">{{ scope.row.itemName }}</div>
        </div>
      </template>
      <template #otherTab="scope">
        <el-tab-pane label="成员管理" name="member">
          <Transfer
            :itemId="scope.data.itemId"
            :itemName="scope.data.itemName"
            @changeMember="changeMember"
          />
        </el-tab-pane>
      </template>
    </ContentPane>
  </div>
</template>

<script>
import SearchPane from "@/components/search-pane";
import ContentPane from "@/components/content-pane";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { dialogFormConfig, getUserOptions } from "./config/dialog.config";
import Transfer from "./transfer";

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
    setSelectOption(getUserOptions, this.dialogFormConfig, "createBy");
  },
  methods: {
    queryBtnClick(queryInfo) {
      this.$refs.contentRef.getPageTableList(queryInfo);
    },
    resetBtnClick(queryInfo) {
      this.$refs.contentRef.getPageTableList(queryInfo);
    },
    changeMember() {
      this.$refs.contentRef.getPageTableList();
    },
  },
};
</script>

<style lang="scss" scoped>
.project-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .name {
    margin-left: 5px;
  }
}
</style>
