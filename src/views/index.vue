<template>
  <div class="index">
    <el-container style="height: 100%">
      <!-- 头部 -->
      <el-header style="text-align: right; font-size: 12px">
        <Header></Header>
      </el-header>

      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px">
          <sideMenu></sideMenu>
        </el-aside>

        <!-- view窗口 -->
        <el-main class="page-content">
          <Title></Title>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from "@/components/header";
import SideMenu from "@/components/sideMenu";
import Title from "@/components/content-title";
export default {
  data() {
    return {};
  },
  components: { Header, SideMenu, Title },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.index {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.el-main {
  border: rgb(238, 241, 246) solid 10px;
  // height: calc(100vh - 60px);
  background-color: #fff;
}

.page-content {
  height: calc(100vh - 60px);
  overflow-y: scroll;
  .page-info {
    background-color: #fff;
    border-radius: 7px;
  }
}
::v-deep .el-header {
  color: #333;
  line-height: 60px;
  border-bottom: 1px solid #ccc;
}
</style>
