<template>
  <div class="header">
    <div class="title">
      <img src="@/assets/logo.svg" class="logo" />
      开发任务跟踪系统
    </div>
    <div style="flex: 1">
      <el-menu
        class="header-menu"
        mode="horizontal"
        :default-active="activeIndex"
        @select="handleSelect"
      >
        <el-menu-item index="message">
          我的信息
          <el-badge
            :hidden="messageNum === 0"
            :value="messageNum"
            class="item"
          />
        </el-menu-item>
        <el-menu-item index="system">
          {{ isAdmin ? "系统管理" : "项目中心" }}
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 个人信息 -->
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <el-avatar
          size="medium"
          shape="square"
          :src="userInfo.headImgUrl"
        ></el-avatar>
        <div class="name">
          {{ userInfo.realName
          }}<i class="el-icon-arrow-down el-icon--right"></i>
        </div>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="baseInfo">个人信息</el-dropdown-item>
        <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import router from "../../router";
import { mapGetters } from "vuex";

import { connectWebsocket } from "@/utils/websocket.js";

export default {
  computed: {
    messageNum() {
      return this.$store.state.user.messageNum;
    },
    ...mapGetters(["userInfo", "isAdmin"]),
  },
  data() {
    return {
      activeIndex: this.$store.state.currentTab,
    };
  },

  mounted() {
    // 获取我的未读信息数据
    this.$store.dispatch("getMessageAction");

    connectWebsocket(
      // 测试地址
      `ws://120.78.88.135:8080/websocket/${this.$store.getters.userId}`,
      // 传递给后台的数据
      {},
      // 成功拿到后台返回的数据的回调函数
      (data) => {
        const message = JSON.parse(data);
        this.$notify.success({
          title: message.title,
          message: message.content,
        });
        this.$store.dispatch("getMessageAction");
      },
      // websocket连接失败的回调函数
      () => {
        console.log("失败的回调函数");
      }
    );
  },
  methods: {
    handleCommand(command) {
      if (command === "baseInfo") {
        this.activeIndex = "none";
        this.$store.commit("SET_COLLAPSE", true);
        router.push("/userInfo");
      } else if (command === "logout") {
        // 退出登录
        this.$confirm("是否退出登陆，浏览器会清空相关信息", "退出登录", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "退出成功!",
            });
            this.$store.dispatch("logoutAction");
            router.push("/login");
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消退出",
            });
          });
      }
    },
    handleSelect(index) {
      this.$store.commit("SET_HEARD_TAB", index);
      if (index === "system") {
        // 项目管理页面
        this.$store.commit("SET_COLLAPSE", false);
        this.$store.commit("SET_SPACE_MENU", false);
        if (this.isAdmin) {
          this.$router.push({
            path: "/index",
          });
        } else {
          this.$router.push({
            path: "/allProject",
          });
        }
      } else if (index === "message") {
        // 我的信息页
        this.$router.push({
          path: "/myMessage",
        });
        this.$store.commit("SET_COLLAPSE", true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .header-menu {
    width: 100%;
    justify-content: flex-end;
    box-sizing: border-box;
    padding: 0 20px;
  }
  .title {
    display: flex;
    align-items: center;
    .logo {
      width: 34px;
      height: 34px;
      margin-right: 10px;
    }
    font-size: 24px;
    font-weight: 700;
    color: #409eff;
  }
  .el-dropdown-link {
    height: 60px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .name {
      margin-left: 10px;
    }
  }
}

::v-deep .el-menu--horizontal > .el-menu-item {
  float: right;
}

.item {
  position: absolute;
  top: -8px;
}
</style>
