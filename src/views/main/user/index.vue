<template>
  <div class="userinfo">
    <el-card class="avatar-card">
      <!-- <el-avatar
        :size="150"
        shape="square"
        :src="userInfo.headImgUrl"
      ></el-avatar> -->
      <PicUpload
        :imageUrl="userInfo.headImgUrl"
        picWidth="200px"
        filePath="avatar"
      />
    </el-card>
    <el-card class="info-card">
      <el-descriptions title="用户信息">
        <el-descriptions-item label="用户名">{{
          userInfo.realName
        }}</el-descriptions-item>
        <el-descriptions-item label="用户号">{{
          userInfo.userNo
        }}</el-descriptions-item>
        <el-descriptions-item label="用户id">{{
          userInfo.userId
        }}</el-descriptions-item>
        <el-descriptions-item label="手机号">{{
          userInfo.phone
        }}</el-descriptions-item>
        <el-descriptions-item label="部门名称">
          <el-tag size="small">{{ userInfo.deptName }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="角色">
          <el-tag size="small">{{ userInfo.roleName }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="工作邮箱">{{
          userInfo.workMail
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
import PicUpload from "@/baseUI/picUpload";
import { mapGetters } from "vuex";
export default {
  components: {
    PicUpload,
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
.userinfo {
  display: flex;
  flex-direction: row;
  width: 100%;
  .avatar-card {
    flex: 2;
    margin-right: 10px;
  }

  .info-card {
    flex: 8;
  }
}
</style>
