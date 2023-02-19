<template>
  <div class="index">
    <el-container style="height: 100%">
      <!-- 头部 -->
      <el-header style="text-align: right; font-size: 12px">
        <Header></Header>
      </el-header>

      <el-container>
        <!-- 侧边栏 -->
        <el-aside class="aside" :width="isCollapse ? '0px' : '200px'">
          <!-- 不是项目空间侧边栏，那么就是 管理员的管理侧边栏或者用户的项目中心侧边栏 -->
          <sideMenu v-if="!isSpaceMenu"></sideMenu>
          <!-- 项目空间的侧边栏，直接替换 -->
          <ProjectSideMenu v-if="isSpaceMenu" />
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
import ProjectSideMenu from "@/components/project-sideMenu";
import Title from "@/components/content-title";

export default {
  data() {
    return {};
  },
  components: { Header, SideMenu, Title, ProjectSideMenu },
  computed: {
    isCollapse() {
      return JSON.parse(this.$store.state.isCollapse);
    },
    isSpaceMenu() {
      return JSON.parse(this.$store.state.isSpaceMenu);
    },
  },

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

.aside {
  height: calc(100vh - 60px);
}

.page-content {
  height: calc(100vh - 60px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  .page-info {
    flex: 1;
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
