<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="申请人" prop="realName" />
      <el-table-column label="性别" prop="gender"> </el-table-column>
      <el-table-column label="部门" prop="deptName" />
      <el-table-column label="角色" prop="roleName" />
      <el-table-column label="手机号" prop="phone" />
      <el-table-column label="审批操作">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="handleEdit(scope.row)"
            >同意</el-button
          >
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)"
            >拒绝</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getApplyList, approvalApply } from "@/api/project/project";
import { mapGetters } from "vuex";
export default {
  props: {
    itemId: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      tableData: [],
      itemName: "",
    };
  },
  computed: { ...mapGetters(["userId"]) },
  mounted() {
    this.getApplyListFn();
  },
  methods: {
    handleEdit(userInfo) {
      this.$confirm(
        `是否同意 ${userInfo.realName} 加入 ${this.itemName} 项目组`,
        "确认同意",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "success",
        }
      ).then(async () => {
        const data = {
          itemId: this.itemId,
          userId: userInfo.userId,
          status: 1,
        };
        await approvalApply(data);
        this.$message({
          type: "success",
          message: "审批通过!",
        });
        this.getApplyListFn();
        this.$emit("applyComfirm");
      });
    },
    handleDelete(userInfo) {
      this.$confirm(
        `是否拒绝 ${userInfo.realName} 加入 ${this.itemName} 项目组`,
        "确认拒绝",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error",
        }
      ).then(async () => {
        const data = {
          itemId: this.itemId,
          userId: userInfo.userId,
          status: 0,
        };
        await approvalApply(data);
        this.$message({
          type: "error",
          message: "审批不通过!",
        });
        this.getApplyListFn();
        this.$emit("applyComfirm");
      });
    },
    // 获取申请人列表
    getApplyListFn() {
      const data = {
        itemId: this.itemId,
        userId: this.userId,
      };
      getApplyList(data).then((res) => {
        this.itemName = res.itemName;
        this.tableData = res.userInfoVOList;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
