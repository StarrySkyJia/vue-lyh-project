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
      pageName="mangerProj"
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
            ref="transferRef"
            :info="scope.data"
            :getMemberFn="getProjUserList"
            :addMemberFn="addUserToProj"
            :removeMemberFn="removeUserToProj"
            @changeMember="changeMember"
          />
        </el-tab-pane>
        <el-tab-pane label="申请列表" name="apply">
          <Apply :itemId="scope.data.itemId" @applyComfirm="applyComfirm" />
        </el-tab-pane>
      </template>
    </ContentPane>
  </div>
</template>

<script>
import SearchPane from "@/components/search-pane";
import ContentPane from "@/components/project-pane";
import Transfer from "@/baseUI/transfer";
import Apply from "./apply.vue";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { dialogFormConfig } from "./config/dialog.config";
import {
  getProjUserList,
  addUserToProj,
  removeUserToProj,
} from "@/api/project/project";
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
    Apply,
  },
  methods: {
    queryBtnClick(queryInfo) {
      this.$refs.contentRef.getPageTableList(queryInfo);
    },
    resetBtnClick(queryInfo) {
      this.$refs.contentRef.getPageTableList(queryInfo);
    },
    changeMember() {
      this.$refs.contentRef.getPageTableList({ condition: "" });
    },
    applyComfirm() {
      this.$refs.contentRef.getPageTableList({ condition: "" });
      this.$refs.transferRef.getUserListFn();
    },
    getProjUserList: getProjUserList,
    addUserToProj: addUserToProj,
    removeUserToProj: removeUserToProj,
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
