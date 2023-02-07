<template>
  <el-tabs stretch>
    <el-tab-pane label="账号登录">
      <el-form
        :model="accountForm"
        ref="accountForm"
        :rules="rules"
        label-position="top"
        size="normal"
      >
        <el-form-item label="账号" prop="userNo">
          <el-input
            v-model="accountForm.userNo"
            placeholder="请输入账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="accountForm.password"
            type="password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-row type="flex" class="row-bg" justify="space-between">
            <el-col :span="6">
              <el-checkbox v-model="rememberMe">记住我</el-checkbox></el-col
            >
            <el-col :span="6" :offset="6">
              <el-link :underline="false">忘记密码</el-link></el-col
            >
          </el-row>
        </el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          class="btn"
          @click="handlePasswordLogin"
          >登录</el-button
        >
      </el-form>
    </el-tab-pane>
    <!-- 账号登录↑ 手机登录↓ -->
    <el-tab-pane label="手机登录">
      <el-form
        :model="phoneForm"
        ref="phoneForm"
        :rules="rules"
        label-position="top"
        size="normal"
      >
        <el-form-item label="手机号" prop="phone">
          <el-input
            v-model="phoneForm.phone"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-row :gutter="10">
            <el-col :span="14">
              <el-input v-model="phoneForm.code" placeholder="请输入验证码" />
            </el-col>
            <el-col :span="8">
              <el-button @click="sendCaptcha" :disabled="captchaDis">{{
                !captchaDis ? "发送验证码" : captchaText
              }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          class="btn"
          @click="handlePhoneLogin"
          >登录</el-button
        >
      </el-form></el-tab-pane
    >
  </el-tabs>
</template>

<script>
import { getCaptcha } from "@/api/login/login";
import { rules } from "../config";
import storage from "@/utils/storage";
export default {
  props: {
    formData: { type: Object, default: () => {} },
  },
  data() {
    return {
      accountForm: {
        userNo: "957000",
        password: "admin123456",
      },
      phoneForm: {
        phone: 15820642174,
      },
      rememberMe: false,
      captchaDis: false,
      loading: false,
      rules: rules,
      captchaText: "重新发送(60s)",
    };
  },
  mounted() {
    // 记住我
    this.rememberMe = storage.get("rememberMe", true);
    if (this.rememberMe) {
      this.accountForm = storage.get("accountInfo", true);
    }

    if (Object.keys(this.formData).length !== 0) {
      this.accountForm.userNo = this.formData.userNo;
      this.accountForm.password = this.formData.password;
    }
  },
  methods: {
    // 账号密码登录
    handlePasswordLogin() {
      this.$refs["accountForm"].validate((validate) => {
        if (validate) {
          this.loading = true;
          this.$store
            .dispatch("passwordLoginAction", this.accountForm)
            .then(() => {
              // 成功登陆，存储信息
              this.loading = false;
              // 记住我
              if (this.rememberMe) {
                storage.set("accountInfo", this.accountForm);
                storage.set("rememberMe", this.rememberMe);
              } else {
                storage.remove("accountInfo");
                storage.set("rememberMe", this.rememberMe);
              }
            })
            .catch((err) => {
              // 登陆失败
              this.loading = false;
            });
        }
      });
    },
    // 发送验证码
    sendCaptcha() {
      // 发送前验证手机
      this.$refs["phoneForm"].validateField("phone", (err) => {
        if (!err) {
          getCaptcha(this.phoneForm.phone);
          let time = 60;
          const interval = setInterval(() => {
            this.captchaDis = true;
            time = time - 1;
            this.captchaText = `重新发送(${time}s)`;
            if (time === 0) {
              clearInterval(interval);
              this.captchaDis = false;
            }
          }, 1000);
        }
      });
    },
    // 手机登录
    handlePhoneLogin() {
      this.$refs["phoneForm"].validate((validate) => {
        if (validate) {
          this.loading = true;
          this.$store
            .dispatch("phoneLoginAction", this.phoneForm)
            .then(() => {
              this.loading = false;
            })
            .catch((err) => {
              // 登陆失败
              this.loading = false;
            });
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  width: 100%;
}
</style>
