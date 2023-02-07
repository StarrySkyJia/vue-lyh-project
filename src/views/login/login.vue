<template>
  <div class="login">
    <!-- 背景图 -->
    <div class="bg">
      <img src="@/assets/login.svg" class="img" />
      <div class="text">欢迎使用开发任务跟踪系统</div>
    </div>
    <!-- 操作面板 -->
    <el-card class="login-pane">
      <Loings v-if="logOrReg" :formData="formData" />
      <Register v-if="!logOrReg" @registerSuccess="registerSuccess" />
      <el-link class="pane-bottom" :underline="false" @click="changeLogOrReg">{{
        logOrReg ? "立即注册" : "返回登录"
      }}</el-link>
    </el-card>
  </div>
</template>

<script>
import Register from "./components/register.vue";
import Loings from "./components/logins.vue";
export default {
  name: "login",
  components: {
    Loings,
    Register,
  },
  data() {
    return {
      // 控制登录/注册面板显示
      logOrReg: true,
      formData: {},
    };
  },
  methods: {
    // 控制登录/注册面板显示
    changeLogOrReg() {
      this.logOrReg = !this.logOrReg;
    },
    // 注册成功回到登录
    registerSuccess(formData) {
      this.formData = formData;
      this.logOrReg = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #fafafa;

  .bg {
    position: absolute;
    width: 100%;
    top: 50%;
    left: 60%;
    transform: translate(-75%, -50%);
    .img {
      width: 50%;
      transform: translateY(-5%);
    }
    .text {
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translateX(-50%);
      color: #409eff;
      font-weight: 700;
      font-size: 40px;
    }
  }

  .login-pane {
    position: absolute;
    right: 15%;
    top: 50%;
    transform: translateY(-50%);
    width: 25%;
    height: 70%;
    z-index: 99;
    text-align: left;

    .pane-bottom {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 20px;
    }
  }
}
</style>
