<template>
  <el-dialog
    append-to-body
    title="更改任务状态"
    width="30%"
    center
    :visible="dialogFormVisible"
  >
    <div class="dialog">
      <el-radio-group v-model="status">
        <el-radio :label="1">未处理</el-radio>
        <el-radio :label="2">处理中</el-radio>
        <el-radio :label="3">已完成</el-radio>
      </el-radio-group>
    </div>

    <div slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogFormVisible = false"
        >取 消</el-button
      >
      <el-button size="small" type="primary" @click="handleComfirm"
        >确 定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      status: 1,
    };
  },
  methods: {
    handleComfirm() {
      this.$emit("comfirm", this.status);
    },
  },
};
</script>

<style lang="scss" scoped></style>
