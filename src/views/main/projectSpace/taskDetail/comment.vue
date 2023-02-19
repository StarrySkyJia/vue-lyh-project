<template>
  <div class="comment">
    <!-- 评论列表 -->
    <el-empty v-if="commentList.length === 0" description="暂无评论"></el-empty>
    <div v-else class="comment-list">
      <el-timeline>
        <el-timeline-item
          v-for="comment in commentList"
          :key="comment.commentId"
          :timestamp="comment.createTime"
          placement="top"
        >
          <div class="comment-item">
            <div class="title">
              {{ comment.title }} - {{ comment.realName }}
            </div>
            <div class="content">{{ comment.content }}</div>
          </div>
        </el-timeline-item>
      </el-timeline>
    </div>
    <!-- 评论框 -->
    <el-form
      ref="form"
      :rules="rules"
      :model="commentForm"
      size="small"
      label-width="80px"
    >
      <el-form-item label="评论标题" prop="title">
        <div class="send-row">
          <el-input v-model="commentForm.title"></el-input>
          <el-button class="btn" type="primary" @click="addComment"
            >添加评论</el-button
          >
        </div>
      </el-form-item>

      <el-form-item label="评论内容" prop="content">
        <el-input type="textarea" v-model="commentForm.content"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="commentForm.remark"></el-input>
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
      commentForm: {},
      rules: {
        title: { required: true, message: "请输入评论标题", trigger: "blur" },
        content: [
          { required: true, message: "请输入评论标题", trigger: "blur" },
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
    addComment() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit("comment", this.commentForm);
        }
        return false;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  padding: 0 80px;
  box-sizing: border-box;
  .send-row {
    display: flex;
    justify-content: flex-start;
    .btn {
      margin-left: 5px;
    }
  }
}

.comment-list {
  padding: 0 80px;
  ::v-deep .el-timeline-item__timestamp.is-top {
    text-align: left;
  }

  .comment-item {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    border: 1px rgb(240, 240, 240) solid;
    box-sizing: border-box;
    padding: 10px;
    border-radius: 5px;

    &:hover {
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
    }
    .title {
      color: #909399;
      font-size: 12px;
    }

    .content {
      color: #303133;
      margin: 4px 0;
      padding: 0 20px;
    }
  }
}
</style>
