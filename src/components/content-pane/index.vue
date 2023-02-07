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

      <template #status="scope">
        <el-button
          :type="scope.row.userStatus === 1 ? 'success' : 'danger'"
          plain
          size="small"
          @click="changeUserStatus(scope.row.userId)"
          >{{ scope.row.userStatus === 1 ? "启用" : "禁用" }}</el-button
        >
      </template>

      <template #handler="scope">
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
          编辑
        </el-button>
        <el-button
          v-if="hasBtn('delete')"
          type="text"
          size="small"
          class="delete-btn"
          @click="handlrDeleteClick(scope.row)"
        >
          删除
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
import MyTable from "./table.vue";
import DialogPane from "@/components/dialog-pane";
import { changeUserState } from "@/api/admin/user";

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
      return this.$store.state.admin[`${this.pageName}List`];
    },
    dataCount() {
      return this.$store.state.admin[`${this.pageName}Count`];
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
    this.getPageTableList();
  },
  methods: {
    // content组件获取数据更新到table上
    // 该方法会在父组件通过search事件触发来调用
    getPageTableList(queryInfo) {
      this.loading = true;
      this.$store
        .dispatch("getPageTableListAction", {
          pageName: this.pageName,
          queryInfo: { ...this.pageInfo, ...queryInfo },
        })
        .then((res) => {
          this.loading = false;
          this.pervQueryInfo = { ...this.pageInfo, ...queryInfo };
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
      console.log(rowData);
      this.$refs.dialogRef.openDialog("edit", rowData);
    },
    // 删除按钮
    handlrDeleteClick(rowData) {
      this.$refs.dialogRef.openDialog("delete", rowData);
    },
    // 更改用户状态
    changeUserStatus(userId) {
      console.log(userId);
      changeUserState(userId).then(() => {
        this.getPageTableList(this.pervQueryInfo);
      });
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
