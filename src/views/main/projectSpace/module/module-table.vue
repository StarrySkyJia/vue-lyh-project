<template>
  <div>
    <el-table
      :data="moduleList"
      style="width: 100%"
      :row-key="getRowKeys"
      :expand-row-keys="expands"
      @expand-change="rowClick"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-descriptions class="desc" :column="3">
            <el-descriptions-item label="模块名称">{{
              moduleDetail.moduleName
            }}</el-descriptions-item>
            <el-descriptions-item label="模块id">{{
              moduleDetail.moduleId
            }}</el-descriptions-item>
            <el-descriptions-item label="模块类型">{{
              moduleDetail.moduleType
            }}</el-descriptions-item>
            <el-descriptions-item label="模块创建人">{{
              moduleDetail.createBy
            }}</el-descriptions-item>
            <el-descriptions-item label="创建时间">{{
              moduleDetail.createTime
            }}</el-descriptions-item>
            <el-descriptions-item label="所属项目名称">{{
              moduleDetail.itemName
            }}</el-descriptions-item>
          </el-descriptions>
          <el-descriptions class="desc" :column="4">
            <el-descriptions-item label="模块任务数"
              ><el-tag size="small">{{
                moduleDetail.moduleTaskCount
              }}</el-tag></el-descriptions-item
            >
            <el-descriptions-item label="模块故障数"
              ><el-tag size="small">{{
                moduleDetail.moduleBugCount
              }}</el-tag></el-descriptions-item
            >
            <el-descriptions-item label="模块文件数"
              ><el-tag size="small">{{
                moduleDetail.moduleFileCount
              }}</el-tag></el-descriptions-item
            >
            <el-descriptions-item label="模块文档数"
              ><el-tag size="small">{{
                moduleDetail.moduleDocumentCount
              }}</el-tag></el-descriptions-item
            >
          </el-descriptions>
        </template>
      </el-table-column>
      <el-table-column label="模块名称" prop="moduleName"> </el-table-column>
      <el-table-column label="模块类型" prop="moduleType"> </el-table-column>
      <el-table-column label="模块创建人" prop="createBy"> </el-table-column>
      <el-table-column label="模块URL" prop="moduleUrl"> </el-table-column>
      <el-table-column label="操作" prop="handler">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            slot="reference"
            @click="editModuleClick(scope.row)"
            >编辑</el-button
          >
          <el-popconfirm
            title="确定删除该模块吗（不可恢复）"
            @confirm="deleteModuleClick(scope.row)"
          >
            <el-button
              type="text"
              size="small"
              slot="reference"
              style="color: #f56c6c"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <div class="page-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import { getModuleDetail } from "@/api/module/module.js";

export default {
  props: {
    moduleList: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      moduleDetail: {},
      expands: [],
      getRowKeys(row) {
        return row.moduleId;
      },
    };
  },
  methods: {
    // 控制table每次只打开一行
    rowClick(row, expandedRows) {
      if (expandedRows.length) {
        this.expands = [];
        this.expands.push(row.moduleId);
      } else {
        this.expands = [];
      }
      getModuleDetail(row.moduleId).then((res) => {
        this.moduleDetail = res;
      });
    },
    // 切换页码大小
    handleSizeChange(pageSize) {
      this.$emit("pageSize", pageSize);
    },
    // 切换页面
    handleCurrentChange(pageNum) {
      this.$emit("pageNum", pageNum);
    },
    // 删除模块
    deleteModuleClick(row) {
      this.$emit("delete", row);
    },
    editModuleClick(row) {
      this.$emit("edit", row);
    },
  },
};
</script>

<style lang="scss" scoped>
.desc {
  width: 80%;
  padding: 0 80px;
  box-sizing: border-box;
}

.page-pagination {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
}
</style>
