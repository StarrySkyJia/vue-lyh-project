<template>
  <div class="notice">
    <!-- 公布框 -->
    <el-form
      ref="form"
      :rules="rules"
      :model="noticeForm"
      size="small"
      label-width="80px"
      style="width: 100%"
    >
      <el-form-item label="公告标题" prop="title">
        <div class="send-row">
          <el-input v-model="noticeForm.title"></el-input>
          <el-button class="btn" type="primary" @click="addNotice"
            >发布公告</el-button
          >
        </div>
      </el-form-item>
      <el-form-item label="公告内容" prop="content">
        <el-input
          type="textarea"
          :rows="10"
          v-model="noticeForm.content"
        ></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="noticeForm.remark"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    commentList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      noticeForm: {},
      rules: {
        title: { required: true, message: "请输入公告标题", trigger: "blur" },
        content: [
          { required: true, message: "请输入公告内容", trigger: "blur" },
          {
            min: 5,
            max: 300,
            message: "长度在 5 到 300 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    addNotice() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("publish", this.noticeForm);
        }
        return false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.notice {
  padding: 0 80px;
  box-sizing: border-box;
  width: 100%;
  .send-row {
    display: flex;
    justify-content: flex-start;
    .btn {
      margin-left: 5px;
    }
  }
}
</style>
