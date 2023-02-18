<template>
  <div class="notice">
    <div class="notive-left">
      <div class="notice-list">
        <div v-for="noticeItem in noticeList" :key="noticeItem.noticeId">
          <div
            class="notice-item"
            :class="{ active: noticeItem.noticeId === currentId }"
            @click="checkNotice(noticeItem.noticeId)"
          >
            <div class="title">{{ noticeItem.title }}</div>
            <div class="detail">
              <span> {{ noticeItem.createTime }}</span>
              <span> {{ noticeItem.managerName }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="isProjManger" class="btn">
        <el-button
          type="text"
          icon="el-icon-s-promotion"
          @click="publishNoticeClick"
          >发布公告</el-button
        >
      </div>
    </div>

    <div class="notice-content">
      <div class="publish" v-if="isPublish">
        <PublishNotice @publish="addNotice" />
      </div>
      <div class="notive-detial" v-else>
        <div class="title">
          {{ noticeDetial.title }}
          <el-popconfirm
            v-if="noticeDetial.title"
            title="这是确定删除该公告吗？"
            @confirm="deleteNoticeClick(noticeDetial.noticeId)"
          >
            <el-button type="danger" size="mini" slot="reference"
              >删除公告</el-button
            >
          </el-popconfirm>
        </div>
        <div class="content">{{ noticeDetial.content }}</div>
        <div class="remark">{{ noticeDetial.remark ?? "暂无备注" }}</div>
        <div class="info">
          {{ noticeDetial.createTime }}- {{ noticeDetial.managerName }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PublishNotice from "./publishNotice.vue";
import {
  getNoticeList,
  publishNotice,
  getNoticeDetail,
  deleteNotice,
} from "@/api/notice";
import { mapGetters } from "vuex";
export default {
  components: { PublishNotice },
  data() {
    return {
      isPublish: false,
      itemId: this.$route.query.itemId,
      noticeList: [],
      noticeDetial: {},
      currentId: 0,
    };
  },
  computed: {
    ...mapGetters(["userInfo", "isProjManger", "userId"]),
  },
  mounted() {
    this.getAllNoticeList();
  },
  methods: {
    // 打开公告编辑窗口
    publishNoticeClick() {
      this.isPublish = true;
    },
    // 发布公告
    addNotice(form) {
      form.itemId = this.itemId;
      form.managerId = this.userInfo.userId;
      form.managerName = this.userInfo.realName;
      publishNotice(form).then(() => {
        this.getAllNoticeList();
      });
    },
    // 查看公告信息
    checkNotice(noticeId) {
      this.isPublish = false;
      this.currentId = noticeId;
      getNoticeDetail({ noticeId }).then((res) => {
        this.noticeDetial = res;
      });
    },
    // 删除公告
    deleteNoticeClick(noticeId) {
      deleteNotice({ noticeId: noticeId, userId: this.userId }).then(() => {
        this.$message.success("删除公告成功");
        this.getAllNoticeList();
      });
    },
    // 获取列表
    getAllNoticeList() {
      const data = {
        itemId: this.itemId,
        pageNum: 0,
        pageSize: 0,
      };
      getNoticeList(data).then((res) => {
        this.noticeList = res;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.notice {
  height: 90%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .notive-left {
    flex: 3;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #ecf5ff;
    border-radius: 10px;
    padding: 10px;
    overflow: hidden;
    .notice-list {
      overflow: scroll;
      overflow-x: hidden;
      padding-bottom: 30px;
      .notice-item {
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 5px;
        padding: 10px;
        margin: 10px 3px;

        &:hover {
          box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
          background-color: #c6e2ff;
        }
        .title {
          text-align: left;
          margin-bottom: 5px;
        }

        .detail {
          display: flex;
          justify-content: space-between;
          color: #909399;
          font-size: 12px;
        }
      }

      .active {
        background-color: #d9ecff;
      }
    }
    .btn {
      position: absolute;
      box-sizing: border-box;
      padding: 0 10px;
      width: 100%;
      bottom: 0;
      right: 0;
      background-color: #ecf5ff;
      border-radius: 0 0 10px 10px;
    }
  }

  .notice-content {
    box-sizing: border-box;
    flex: 7;
    height: 100%;
    background-color: #ecf5ff;
    border-radius: 10px;
    padding: 10px;
    margin-left: 10px;

    .publish {
      width: 100%;
      box-sizing: border-box;
      padding: 20px 0;
    }

    .notive-detial {
      height: 100%;
      display: flex;
      flex-direction: column;

      .title {
        display: flex;
        justify-content: space-between;
        width: 100%;
        background-color: #fff;
        border-radius: 20px;
        margin-bottom: 10px;
        padding: 5px 20px;
        box-sizing: border-box;
        text-align: left;
      }

      .content {
        flex: 8;
        border-radius: 20px;
        background-color: #fff;
        padding: 10px 40px;
        box-sizing: border-box;
        text-align: left;
        margin-bottom: 10px;
      }

      .remark {
        flex: 2;
        border-radius: 20px;
        background-color: #fff;
        padding: 10px 20px;
        box-sizing: border-box;
        text-align: left;
      }
      .info {
        padding: 5px 20px;
        box-sizing: border-box;
        color: #909399;
        font-size: 12px;
      }
    }
  }
}
</style>
