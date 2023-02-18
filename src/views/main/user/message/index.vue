<template>
  <div class="message">
    <div class="message-left">
      <div class="query">
        <div class="query-select">
          <div>是否已读：</div>
          <el-select v-model="query.isRead" size="mini" placeholder="请选择">
            <el-option label="全部" :value="0" />
            <el-option label="未读" :value="1" />
          </el-select>
        </div>
        <div class="query-select">
          <div>信息类型：</div>
          <el-select
            v-model="query.messageType"
            size="mini"
            placeholder="请选择"
          >
            <el-option
              v-for="item in TypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- 信息列表 -->
      <div class="message-list">
        <el-empty v-if="messageList.length === 0" description="暂无信息" />
        <div v-for="(message, index) in messageList" :key="message.messageId">
          <div
            class="message-item"
            :class="{ active: message.messageId === currentId }"
            @click="checkMessage(index, message.messageId)"
          >
            <div class="title">{{ message.title }}</div>
            <div class="detail">
              <span> {{ message.createTime }}</span>
              <el-badge v-if="message.isRead == '未读'" is-dot class="item">{{
                message.isRead
              }}</el-badge>
              <span v-else> {{ message.isRead }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="message-content">
      <div v-if="isShow" class="message-detial">
        <div class="title">{{ messageList[currentIndex].title }}</div>
        <div class="content">{{ messageList[currentIndex].content }}</div>
        <div class="info">
          {{ messageList[currentIndex].createTime }}-
          {{ messageList[currentIndex].updateTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMessageList, readMessage } from "@/api/message";
import { mapGetters } from "vuex";
export default {
  computed: { ...mapGetters(["userId"]) },
  data() {
    return {
      messageList: [],
      total: 0,
      currentIndex: 0,
      currentId: 0,
      isShow: false,
      query: {
        isRead: 1,
        messageType: 0,
        pageNum: 0,
        pageSize: 10,
        userId: this.$store.getters.userId,
      },
      TypeOptions: [
        { label: "全部", value: 0 },
        { label: "任务通知", value: 1 },
        { label: "任务更新通知", value: 2 },
        { label: "任务接取通知", value: 3 },
        { label: "缺陷通知", value: 4 },
        { label: "缺陷更新通知", value: 5 },
        { label: "缺陷接取通知", value: 6 },
      ],
    };
  },
  mounted() {
    this.getPageData();
  },
  watch: {
    query: {
      handler() {
        this.getPageData();
      },
      deep: true,
    },
  },
  methods: {
    getPageData() {
      getMessageList(this.query).then((res) => {
        this.$nextTick(() => {
          this.messageList = res.messageInfoVOList;
          this.total = res.total;
          this.query.pageSize = this.total;
          getMessageList(this.query).then((res) => {
            this.messageList = res.messageInfoVOList;
            this.total = res.total;
          });
        });
      });
    },
    checkMessage(index, currentId) {
      this.currentIndex = index;
      readMessage(currentId).then((res) => {
        this.$store.dispatch("getMessageAction");
        this.$set(this.messageList[index], "isRead", "已读");
        this.isShow = true;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.message {
  height: 90vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  .message-left {
    flex: 3;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    background-color: #ecf5ff;
    border-radius: 10px;
    padding: 10px;
    padding-top: 50px;
    overflow: hidden;
    .message-list {
      overflow: scroll;
      overflow-x: hidden;
      .message-item {
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
    .query {
      position: absolute;
      box-sizing: border-box;
      display: flex;
      justify-content: flex-end;
      padding: 0 10px;
      width: 100%;
      top: 20px;
      right: 0;
      background-color: #ecf5ff;
      border-radius: 0 0 10px 10px;
      .query-select {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #909399;
        font-size: 12px;
        margin: 0 5px;
        div {
          white-space: nowrap;
        }
      }
    }
  }

  .message-content {
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

    .message-detial {
      height: 100%;
      display: flex;
      flex-direction: column;

      .title {
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
