<template>
  <el-menu
    router
    :default-active="currentProjTab"
    class="project-sidemenu"
    :collapse-transition="true"
    @select="handleSelect"
  >
    <!-- 项目内各项操作 -->
    <el-menu-item
      v-for="menuItem in menuList"
      :key="menuItem.path"
      :index="menuItem.path"
      :route="{ path: `/${menuItem.path}`, query: { itemId: currentProjId } }"
    >
      {{ menuItem.title }}
    </el-menu-item>

    <!-- 模块部分，通过接口获取项目有多少个模块，遍历生成模块列表 -->
    <el-submenu index="module">
      <template slot="title"> 所有模块 </template>
      <el-submenu
        v-for="(moduleItem, moduleIndex) in moduleList"
        :key="moduleItem.moduleId"
        :index="moduleIndex.toString()"
      >
        <template slot="title">{{ moduleItem.moduleName }}</template>
        <!-- 模块列表下都有四个小管理模块，都需要分别遍历 -->
        <el-menu-item
          v-for="menuItem in moduleMenuList"
          :key="menuItem.path"
          :index="moduleIndex.toString() + menuItem.path"
          :route="{
            path: `/${menuItem.path}`,
            query: {
              moduleId: moduleItem.moduleId,
            },
          }"
        >
          {{ menuItem.title }}
        </el-menu-item>
      </el-submenu>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    },
    currentProjTab() {
      return this.$store.state.project.currentProjTab;
    },
    ...mapGetters(["currentProjId", "moduleList"]),
  },

  data() {
    return {
      menuList: [
        { title: "项目详情", path: "projectDtail" },
        { title: "项目成员", path: "memberManger" },
        { title: "任务大厅", path: "taskLobby" },
        { title: "缺陷大厅", path: "bugLobby" },
        { title: "信息公告", path: "message" },
        { title: "模块管理", path: "moduleManger" },
      ],
      moduleMenuList: [
        { index: "0", title: "任务管理", path: "taskManger" },
        { index: "1", title: "故障管理", path: "bugManger" },
        { index: "2", title: "文档管理", path: "documentManger" },
        { index: "3", title: "文件管理", path: "fileManger" },
      ],
    };
  },
  mounted() {
    this.$store.dispatch("getAllModuleAction");
  },
  watch: {
    currentProjId(newId) {
      this.getModuleMenuInfo();
    },
    moduleList: {
      handler(newList) {},
      deep: true,
    },
  },
  methods: {
    handleSelect(itemIndex, indexs) {
      this.$store.commit("SET_PROJ_TAB", itemIndex);
      if (indexs[1]) {
        this.$store.commit(
          "SET_CURR_MODULE_INFO",
          this.moduleList[indexs[1] - 0]
        );
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.project-sidemenu {
  width: 200px;
}
::v-deep .el-menu-item.is-active {
  background-color: #c6e2ff !important;
  border-radius: 10px;
}
::v-deep .el-menu-item:hover {
  border-radius: 10px;
}
.el-menu {
  margin-top: 20px !important;
  text-align: left !important;
  border: none;
}
.el-menu-item,
::v-deep .el-submenu__title {
  height: 46px;
  line-height: 46px;
  list-style: none;
  margin: 0 10px;
  // text-align: left !important;
  min-width: 160px;
}

::v-deep .el-submenu__title:hover {
  border-radius: 10px;
}

.el-dropdown-menu__item,
.el-menu-item {
  font-size: 14px;
  padding: 0 20px;
  margin: 5px 10px;
  cursor: pointer;
}

.el-aside {
  color: #333;
}
</style>
