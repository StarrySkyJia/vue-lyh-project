<template>
  <div class="page-content">
    <MyTable
      :listData="dataList"
      :listCount="dataCount"
      v-bind="contentTableConfig"
      :loading="loading"
      :pageInfo.sync="pageInfo"
      :propList="contentTableConfig.propList"
      @rowDoubleClick="rowDoubleClick"
    >
      <template #headerHandler v-if="contentTableConfig.isCreate">
        <el-button type="primary" size="small" @click="handleAddClick">{{
          contentTableConfig.createBtnName
        }}</el-button>
      </template>

      <template #handler="scope">
        <!-- 特定页面的按钮事件 -->
        <slot name="btns" :row="scope.row"></slot>

        <el-button
          v-if="hasBtn('in')"
          type="text"
          size="small"
          @click="toProjectSpaceClick(scope.row)"
        >
          进入项目空间
        </el-button>
        <el-button
          v-if="hasBtn('check')"
          type="text"
          size="small"
          @click="rowDoubleClick(scope.row)"
        >
          详情
        </el-button>
        <el-button
          v-if="hasBtn('edit')"
          type="text"
          size="small"
          @click="handleEditClick(scope.row)"
        >
          调整成员
        </el-button>
        <el-button
          v-if="hasBtn('apply')"
          type="text"
          size="small"
          @click="handleApplyClick(scope.row)"
        >
          申请列表
        </el-button>
      </template>

      <template
        v-for="item in contentTableConfig.otherPropSlots"
        #[item]="scope"
      >
        <div v-if="item" :key="item.prop">
          <slot :name="item" :row="scope.row"></slot>
        </div>
      </template>
    </MyTable>

    <DialogPane
      ref="dialogRef"
      :pageName="pageName"
      :dialogFormConfig="dialogFormConfig"
    >
      <template #otherTab="scope">
        <slot name="otherTab" :data="scope.data"></slot>
      </template>
    </DialogPane>
  </div>
</template>

<script>
import MyTable from "@/baseUI/table";
import DialogPane from "@/components/dialog-pane";
import { changeUserState } from "@/api/admin/user";
import router from "../../router";

export default {
  components: {
    MyTable,
    DialogPane,
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true,
    },
    dialogFormConfig: {
      type: Object,
      required: true,
    },
    pageName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      pageInfo: { pageNum: 0, pageSize: 10 },
      pervQueryInfo: {},
      otherPropSlots: [],
      loading: false,
    };
  },
  computed: {
    dataList() {
      return this.$store.state.project[`${this.pageName}List`];
    },
    dataCount() {
      return this.$store.state.project[`${this.pageName}Count`];
    },
  },
  watch: {
    pageInfo(newVal) {
      this.pervQueryInfo.pageNum = newVal.pageNum;
      this.pervQueryInfo.pageSize = newVal.pageSize;
      this.getPageTableList(this.pervQueryInfo);
    },
  },
  mounted() {
    this.getPageTableList({ condition: "" });
  },
  methods: {
    // content组件获取数据更新到table上
    // 该方法会在父组件通过search事件触发来调用
    getPageTableList(queryInfo) {
      this.loading = true;
      this.$store
        .dispatch("getProjectPageListAction", {
          pageName: this.pageName,
          queryInfo: { ...this.pageInfo, ...queryInfo },
        })
        .then((res) => {
          this.loading = false;
          this.pervQueryInfo = { ...this.pageInfo, ...queryInfo };
        });
    },
    // 进入项目空间
    toProjectSpaceClick(info) {
      this.$store.commit("SET_SPACE_MENU", true);
      this.$store.commit("SET_PROJ_TAB", "projectDtail");
      this.$store.commit("SET_CURR_ID", info.itemId);
      this.$store.commit("SET_CURR_PROJ_INFO", info);
      router.push({
        path: "/projectDtail",
        query: { itemId: info.itemId },
      });
    },
    // 双击查看详情
    rowDoubleClick(rowData) {
      this.$refs.dialogRef.openDialog("check", rowData);
    },
    // 新增按钮
    handleAddClick() {
      this.$refs.dialogRef.openDialog("add");
    },
    // 编辑按钮
    handleEditClick(rowData) {
      this.$refs.dialogRef.openDialog("member", rowData);
    },
    // 审批按钮
    handleApplyClick(rowData) {
      this.$refs.dialogRef.openDialog("apply", rowData);
    },
    hasBtn(btnStr) {
      let handlerArr = [];
      this.contentTableConfig.propList.forEach((item) => {
        if (item.prop === "handler") {
          handlerArr = item.handlerArr;
        }
      });
      return handlerArr.find((item) => item === btnStr);
    },
  },
};
</script>

<style lang="scss" scoped>
.delete-btn {
  color: #f56c6c !important;
}
</style>
