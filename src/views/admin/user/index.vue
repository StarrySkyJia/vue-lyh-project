<template>
  <div>
    <SearchPane
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="resetBtnClick"
      @queryBtnClick="queryBtnClick"
    />
    <ContentPane
      ref="contentRef"
      :contentTableConfig="contentTableConfig"
      :dialogFormConfig="dialogFormConfig"
      pageName="user"
    >
      <template #userInfo="scope">
        <div class="user-info">
          <el-avatar :src="scope.row.headImgUrl"></el-avatar>
          <div class="info-left">
            <div class="name">{{ scope.row.realName }}</div>
            <div class="contact">{{ scope.row.workMail }}</div>
          </div>
        </div>
      </template>
    </ContentPane>
  </div>
</template>

<script>
import SearchPane from "@/components/search-pane";
import ContentPane from "@/components/content-pane";
import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import {
  dialogFormConfig,
  getRoleOptions,
  getDepartmentOptions,
} from "./config/dialog.config";
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
  },
  mounted() {
    // 设置部门选项
    setSelectOption(getDepartmentOptions, this.dialogFormConfig, "deptName");
    // 设置角色选项
    setSelectOption(getRoleOptions, this.dialogFormConfig, "roleName");
  },
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

<style lang="scss" scoped>
.user-info {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .info-left {
    font-size: 14px;
    margin-left: 5px;
    .name {
      flex-shrink: 0;
    }
    .contact {
      color: #999;
    }
  }
}
</style>
