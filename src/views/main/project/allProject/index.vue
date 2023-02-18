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
      pageName="allProj"
    >
      <template #projectInfo="scope">
        <div class="project-info">
          <el-avatar shape="square" :src="scope.row.itemImgUrl"></el-avatar>
          <div class="name">{{ scope.row.itemName }}</div>
        </div>
      </template>

      <template #btns="scope">
        <el-button
          type="text"
          size="small"
          @click="applyIntoProjClick(scope.row)"
        >
          申请加入项目
        </el-button>
      </template>
    </ContentPane>
  </div>
</template>

<script>
import SearchPane from "@/components/search-pane";
import ContentPane from "@/components/project-pane";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { dialogFormConfig } from "./config/dialog.config";

import { applyIntoProj } from "@/api/project/project";

import { mapGetters } from "vuex";
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
  computed: { ...mapGetters(["userId"]) },
  methods: {
    queryBtnClick(queryInfo) {
      this.$refs.contentRef.getPageTableList(queryInfo);
    },
    resetBtnClick(queryInfo) {
      this.$refs.contentRef.getPageTableList(queryInfo);
    },
    applyIntoProjClick(info) {
      console.log(info);
      const data = { itemId: info.itemId, userId: this.userId };
      this.$confirm(`是否申请加入 ${info.itemName} 项目组`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await applyIntoProj(data);
          this.$message({
            type: "success",
            message: "申请成功，等待审批通过!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消申请",
          });
        });
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
