<template>
  <div class="task-item">
    <div>
      <div class="title">
        <div class="name">
          <span style="margin-right: 5px"> {{ bugInfo.taskName }} </span>
          <el-tag v-if="bugInfo.priority === '低'" type="success" size="mini">{{
            bugInfo.priority
          }}</el-tag>
          <el-tag v-if="bugInfo.priority === '中'" size="mini">{{
            bugInfo.priority
          }}</el-tag>
          <el-tag v-if="bugInfo.priority === '高'" type="warning" size="mini">{{
            bugInfo.priority
          }}</el-tag>
          <el-tag
            v-if="bugInfo.priority === '紧急'"
            type="danger"
            size="mini"
            >{{ bugInfo.priority }}</el-tag
          >
        </div>

        <!-- 按钮 -->
        <el-button-group>
          <el-button
            :type="btnType"
            size="mini"
            circle
            icon="el-icon-zoom-in"
            @click="checkDetailClick"
          />
          <el-button
            v-if="bugInfo.createById === userId"
            :type="btnType"
            size="mini"
            circle
            icon="el-icon-delete"
            @click="deleteBugClick"
          />
          <el-button
            :type="btnType"
            size="mini"
            circle
            icon="el-icon-edit-outline"
            @click="changeStatusClick"
          />
        </el-button-group>
      </div>
      <div class="content">
        <el-row style="margin-bottom: 4px">
          <el-col :span="8">创建者:{{ bugInfo.createBy }}</el-col>
          <el-col :span="8"
            >处理人:{{
              bugInfo.receiveName ? bugInfo.receiveName : "暂未指派"
            }}</el-col
          >
        </el-row>
        <el-row>
          <el-col :span="16">更新时间:{{ bugInfo.updateTime }}</el-col>
          <el-col :span="8">缺陷类型:{{ bugInfo.taskType }}</el-col>
        </el-row>
      </div>
    </div>

    <UpdateDialog ref="dialogRef" @comfirm="handleUpdateStatusClick" />
  </div>
</template>

<script>
import UpdateDialog from "@/components/update-dialog";
import { updateBugStatus, deleteBatchBug } from "@/api/bug";
import { mapGetters } from "vuex";
export default {
  props: {
    bugInfo: {
      type: Object,
      require: true,
    },
    type: {
      type: String,
    },
  },
  components: {
    UpdateDialog,
  },
  data() {
    return {
      status: 1,
    };
  },
  computed: {
    ...mapGetters(["userId"]),
    btnType() {
      const btn = {
        unsolved: "danger",
        solving: "primary",
        resolved: "success",
      };
      return btn[this.type];
    },
  },
  methods: {
    // 打开更改状态的弹窗
    changeStatusClick() {
      this.$refs.dialogRef.dialogFormVisible = true;
    },
    deleteBugClick() {
      const data = {
        userId: this.userId,
        bugIdList: [this.bugInfo.bugId],
      };
      deleteBatchBug(data).then(() => {
        this.$message({
          message: "删除成功!",
          type: "success",
        });
      });
    },
    // 修改状态
    handleUpdateStatusClick(status) {
      const _this = this;
      updateBugStatus({
        receiveId: this.userId,
        bugId: this.bugInfo.bugId,
        solveStatus: status,
      }).then(() => {
        _this.$emit("changeUpdate");
        _this.$refs.dialogRef.dialogFormVisible = false;
        _this.$message({
          message: "修改缺陷状态成功!",
          type: "success",
        });
      });
    },
    checkDetailClick() {
      this.$emit("checkDetial", this.bugInfo.bugId);
    },
  },
};
</script>

<style lang="scss" scoped>
.task-item {
  &:hover {
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    background-color: #fff;
  }
  margin: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #f6f6f6;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      display: flex;
      align-items: center;
    }
  }
  ::v-deep .el-descriptions__header {
    margin-bottom: 5px;
  }

  .content {
    font-size: 12px;
    color: #909399;
    text-align: left;
    margin: 4px 0;
  }
}

.dialog {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
