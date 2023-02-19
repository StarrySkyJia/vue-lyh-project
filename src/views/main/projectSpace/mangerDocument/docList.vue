<template>
  <div class="document-list">
    <div class="item-box" v-for="item in docList" :key="item.documentId">
      <div class="item">
        <div class="title">{{ item.documentTitle }}</div>
        <div class="remark">{{ item.remark ? item.remark : "暂无简介" }}</div>
        <div class="footer">
          <div class="name">{{ item.realName }}</div>
          <el-button
            size="mini"
            type="text"
            slot="reference"
            class="detail"
            @click="detailDocumentClick(item)"
            >详情</el-button
          >
          <el-popconfirm title="这是一段内容确定删除吗？">
            <el-button
              size="mini"
              type="text"
              slot="reference"
              class="delete"
              @click="deleteDocumentClick(item)"
              >删除</el-button
            >
          </el-popconfirm>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { deleteDocument } from "@/api/document";
import { mapGetters } from "vuex";
export default {
  props: {
    docList: {
      type: Array,
      default: () => [],
    },
  },
  computed: { ...mapGetters(["userId"]) },
  methods: {
    deleteDocumentClick(item) {
      const data = {
        userId: this.userId,
        documentId: item.documentId,
      };
      deleteDocument(data).then(() => {
        this.$message.success("删除成功！");
        this.$emit("delete");
      });
    },
    detailDocumentClick(item) {
      this.$router.push({
        path: "/documentDetail",
        query: { documentId: item.documentId, documentName: item.documentName },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.document-list {
  display: flex;
  justify-content: flex-start;
  color: #909399;
  margin: 20px 0;

  .item-box {
    width: 25%;
    flex-shrink: 0;
    padding: 10px 20px;
    box-sizing: border-box;
    .item {
      &:hover {
        box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        background-color: #fff;
        cursor: pointer;
      }
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 10px;
      background-color: #ecf5ff;
      border-radius: 5px;
      .title {
        text-align: left;
        margin-bottom: 5px;
      }

      .remark {
        word-break: break-all;
        -webkit-line-clamp: 2;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .footer {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .delete {
          color: #f56c6c;
        }

        .detail {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          margin-right: 5px;
        }
        .name {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
