<template>
  <el-form
    :model="registerForm"
    ref="registerForm"
    :rules="rules"
    label-width="80px"
    :inline="false"
    size="normal"
  >
    <div class="register">
      <div class="title">填写信息</div>
      <el-form-item label="姓名" prop="realName">
        <el-input v-model="registerForm.realName"></el-input>
      </el-form-item>
      <el-form-item label="用户账号" prop="userNo">
        <el-input v-model="registerForm.userNo"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="registerForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          show-password
          type="password"
          v-model="registerForm.password"
        ></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass" :rules="checkPass">
        <el-input
          type="password"
          show-password
          v-model="registerForm.checkPass"
        ></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio v-model="registerForm.gender" label="1">男</el-radio>
        <el-radio v-model="registerForm.gender" label="0">女</el-radio>
      </el-form-item>
      <el-button type="primary" @click="handleRegister" class="btn"
        >注册账号</el-button
      >
    </div>
  </el-form>
</template>

<script>
import { rules } from "../config";
import { registerUser } from "@/api/login/register";

export default {
  data() {
    // 二次密码验证
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      registerForm: {
        gender: "1",
      },
      checkPass: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { validator: validatePass, trigger: "blur" },
      ],
      rules: rules,
    };
  },
  methods: {
    // 注册
    handleRegister() {
      // 注册前验证
      this.$refs["registerForm"].validate((validate) => {
        validate &&
          registerUser(this.registerForm)
            .then((res) => {
              this.$emit("registerSuccess", this.registerForm);
              this.$message({
                type: "success",
                message: "注册成功!",
              });
            })
            .catch((err) => {});
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.register {
  .title {
    width: 100%;
    text-align: center;
    font-size: 24px;
    margin-bottom: 20px;
  }

  .btn {
    width: 100%;
  }
}
</style>
