<template>
  <el-menu router>
    <div v-for="item in userRoutes" :key="item.name">
      <el-submenu v-if="item.children" :index="item.path">
        <template slot="title"
          ><i :class="item.meta.icon"></i>
          <span slot="title">{{ item.meta.title }}</span></template
        >
        <el-menu-item
          v-for="routeItem in item.children"
          :key="routeItem.meta.name"
          :index="routeItem.path"
        >
          <!-- <i :class="routeItem.meta.icon"></i> -->
          <span slot="title">{{ routeItem.meta.title }}</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item v-else :index="item.path">
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userRoutes"]),
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
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
