<template>
  <div class="doc-detail">
    <el-tabs tab-position="left">
      <el-tab-pane label="任务信息">
        <div class="info">
          <el-descriptions :column="3">
            <el-descriptions-item label="标题" :span="3"
              >{{ docDetail.documentTitle }}
            </el-descriptions-item>
            <el-descriptions-item label="所属模块"
              >{{ docDetail.moduleName }}
            </el-descriptions-item>
            <el-descriptions-item label="创建者"
              >{{ docDetail.realName }}
            </el-descriptions-item>
            <el-descriptions-item label="创建时间"
              >{{ docDetail.createTime }}
            </el-descriptions-item>
            <el-descriptions-item label="标题">
              <el-tag size="small">{{ docDetail.documentId }}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item label="评论数"
              >{{ commentList.length }}
            </el-descriptions-item>
            <el-descriptions-item label="更新时间"
              >{{ docDetail.updateTime }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="content">
          <v-md-preview :text="text"></v-md-preview>
        </div>
      </el-tab-pane>

      <el-tab-pane label="评论">
        <comment :commentList="commentList" @comment="addCommentClick" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import comment from "./comment";
import { getDocDetail } from "@/api/document";
import { addComment } from "@/api/comment";
import { mapGetters } from "vuex";

export default {
  components: { comment },
  data() {
    return {
      text: "",
      documentId: this.$route.query.documentId,
      documentName: this.$route.query.documentName,
      docDetail: {},
      commentList: [],
    };
  },
  computed: { ...mapGetters(["userInfo"]) },
  mounted() {
    this.getPageData();
  },
  methods: {
    addCommentClick(form) {
      form.commentType = 3;
      form.realName = this.userInfo.realName;
      form.userId = this.userInfo.userId;
      form.documentId = this.documentId;
      form.documentName = this.documentName;
      addComment(form).then(() => {
        this.getPageData();
      });
    },
    getPageData() {
      getDocDetail({ documentId: this.documentId }).then((res) => {
        this.docDetail = res;
        this.commentList = res.commentInfoVOList;
        this.text = res.content;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.doc-detail {
  display: flex;
  flex-direction: column;
  height: 100%;
  .content {
    flex: 1;
    width: 100%;
    height: 65vh;
    border: 1px #909399 solid;
    padding: 20px 10px;
    box-sizing: border-box;
    border-radius: 10px;
    overflow-y: scroll;
  }
}
</style>
