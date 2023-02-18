<template>
  <div class="my-table">
    <div class="header">
      <slot name="header">
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>

    <el-table
      fix
      fit
      :data="listData"
      style="width: 100%"
      class="table-b"
      v-bind="childrenProps"
      v-loading="loading"
      element-loading-spinner="el-icon-loading"
      element-loading-text="数据加载中"
      @row-dblclick="handleRowClick"
    >
      <!-- 两个不需要遍历就可以生成的数据：可选和序号 -->
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
      ></el-table-column>

      <el-table-column
        v-if="showIndexColumn"
        type="index"
        label="序号"
        width="60"
      >
      </el-table-column>

      <el-table-column
        v-for="propItem in propList"
        :key="propItem.prop"
        v-bind="propItem"
        show-overflow-tooltip
      >
        <template #default="scope">
          <slot :name="propItem.slotName" :row="scope.row">
            <!-- 没有匹配到插槽，就会执行这里的值 -->
            {{ scope.row[propItem.prop] }}
          </slot>
        </template>
      </el-table-column>
    </el-table>

    <div class="footer" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pagesize"
          :page-sizes="[10, 20, 30]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listCount"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 标题
    title: {
      type: String,
      default: "",
    },
    // 是否展示序号
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
    // 是否展示可选
    showSelectColumn: {
      type: Boolean,
      default: false,
    },
    // 页面列表数据
    listData: {
      type: Array,
      required: true,
    },
    // 分页器页面总数
    listCount: {
      type: Number,
      default: 0,
    },
    // 分页器page数据
    pageInfo: {
      type: Object,
      default: () => ({ currentPage: 0, pagesize: 10 }),
    },
    // 列表展示配置数据
    propList: {
      type: Array,
      required: true,
    },
    //菜单的展开表格配置
    childrenProps: {
      type: Object,
      default: () => ({}),
    },
    // 是否展示分页器
    showFooter: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleSizeChange(pageSize) {
      this.$emit("update:pageInfo", { ...this.pageInfo, pageSize });
    },
    handleCurrentChange(currentPage) {
      this.$emit("update:pageInfo", { ...this.pageInfo, pageNum: currentPage });
    },
    handleRowClick(row) {
      this.$emit("rowDoubleClick", row);
    },
  },
};
</script>

<style lang="scss" scoped>
.my-table {
  .header {
    width: 100%;
    display: flex;
    padding: 5px 10px;
    justify-content: flex-start;
  }
  .footer {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    margin: 20px;
    padding-right: 20px;
  }
}
</style>
