<template>
  <div class="editer">
    <div class="form">
      <el-descriptions :column="3">
        <el-descriptions-item label="所属模块"
          >{{ moduleInfo.moduleName }}
        </el-descriptions-item>
        <el-descriptions-item label="编写人"
          >{{ userInfo.realName }}
        </el-descriptions-item>
      </el-descriptions>
      <div class="info">
        <el-form
          ref="form"
          :rules="rules"
          :model="data"
          size="small"
          label-width="120px"
        >
          <el-form-item label="文档标题" prop="documentTitle">
            <div class="send-row">
              <el-input v-model="data.documentTitle"></el-input>
              <el-button
                v-if="isEdit"
                class="btn"
                type="primary"
                @click="updateDocument"
                >修改文档</el-button
              >
              <el-button
                v-else
                class="btn"
                type="primary"
                @click="publicDocument"
                >发布文档</el-button
              >
            </div>
          </el-form-item>
          <el-form-item label="简介" prop="remark">
            <el-input type="textarea" v-model="data.remark"></el-input>
          </el-form-item>
          <el-form-item label="是否允许评论" prop="isComment">
            <div class="radio">
              <el-radio v-model="data.isComment" :label="1">是</el-radio>
              <el-radio v-model="data.isComment" :label="0">否</el-radio>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <v-md-editor v-model="data.content" height="70vh"></v-md-editor>
  </div>
</template>

<script>
import { addDocument, getDocDetail, updateDocument } from "@/api/document";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      isEdit: this.$route.query.isEdit,
      documentId: this.$route.query.documentId,
      text: "",
      data: {
        isComment: 1,
      },
      rules: {
        documentTitle: {
          required: true,
          message: "请输入评论标题",
          trigger: "blur",
        },
        remark: [
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
  computed: { ...mapGetters(["moduleInfo", "userInfo"]) },
  mounted() {
    if (this.isEdit && this.documentId) {
      getDocDetail({ documentId: this.documentId }).then((res) => {
        this.docDetail = res;
        this.commentList = res.commentInfoVOList;
        this.$set(this.data, "content", res.content);
        this.$set(this.data, "documentTitle", res.documentTitle);
        this.$set(this.data, "isComment", res.isComment === "是" ? 1 : 0);
        this.$set(this.data, "remark", res.remark);
        this.$set(this.data, "documentId", res.documentId);
      });
    }
  },
  methods: {
    publicDocument() {
      this.data.moduleId = this.moduleInfo.moduleId;
      this.data.moduleName = this.moduleInfo.moduleName;
      this.data.userId = this.userInfo.userId;
      this.data.realName = this.userInfo.realName;
      addDocument(this.data).then(() => {
        this.$message.success("新增成功");
        this.$router.back();
      });
    },
    updateDocument() {
      this.data.moduleId = this.moduleInfo.moduleId;
      this.data.moduleName = this.moduleInfo.moduleName;
      this.data.userId = this.userInfo.userId;
      this.data.realName = this.userInfo.realName;
      updateDocument(this.data).then(() => {
        this.$message.success("修改成功");
        this.$router.back();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.info {
  .send-row {
    display: flex;
    justify-content: flex-start;
    .btn {
      margin-left: 5px;
    }
  }
}

.radio {
  float: left;
}
</style>
