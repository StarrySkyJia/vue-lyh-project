<template>
  <div class="header">
    <div class="title">
      <img src="@/assets/logo.svg" class="logo" />
      开发任务跟踪系统
    </div>
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
        <el-dropdown-item>个人信息</el-dropdown-item>
        <el-dropdown-item>邮箱</el-dropdown-item>
        <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import router from "../../router";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    handleCommand() {
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
</style>
