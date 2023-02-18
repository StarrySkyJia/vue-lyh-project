<template>
  <div>
    <div>
      <el-row>
        <el-col :span="6">
          <el-input
            size="mini"
            v-model="query.condition"
            placeholder="搜索条件:文档标题,创建人姓名模糊搜索"
          />
        </el-col>
        <el-col :span="2">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-search"
            @click="searchClick"
            >搜索文档</el-button
          > </el-col
        ><el-col :span="2">
          <el-button size="mini" icon="el-icon-search" @click="resetClick"
            >重置</el-button
          >
        </el-col>
        <el-col :offset="12" :span="2">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-edit-outline"
            @click="toDocCreate"
            >新建文档</el-button
          >
        </el-col>
      </el-row>
    </div>
    <DocList :docList="docList" @delete="afterDeleteUpdate()" />
    <!-- 分页器 -->
    <div class="page-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[14, 28, 42]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import DocList from "./docList.vue";
import { getDocList } from "@/api/document";
import { mapGetters } from "vuex";
export default {
  components: { DocList },
  data() {
    return {
      text: " ",
      docList: [],
      total: 0,
      // 查询信息
      query: {
        condition: "",
        moduleId: this.$store.getters.moduleInfo.moduleId,
        pageNum: 0,
        pageSize: 14,
      },
    };
  },
  computed: { ...mapGetters(["moduleInfo"]) },
  mounted() {
    this.getPageData();
  },
  methods: {
    toDocCreate() {
      this.$router.push({
        path: "/documentCreate",
      });
    },
    // 获取页面数据
    getPageData() {
      getDocList(this.query).then((res) => {
        console.log(res);
        this.docList = res.documentInfoVOList;
        this.total = res.total;
      });
    },
    // 删除后更新
    afterDeleteUpdate() {
      this.getPageData();
    },
    // 切换页码大小
    handleSizeChange(pageSize) {
      this.$set(this.query, "pageSize", pageSize);
      this.getPageData();
    },
    // 切换页面
    handleCurrentChange(pageNum) {
      this.$set(this.query, "pageNum", pageNum);
      this.getPageData();
    },
    // 搜索/重置/删除后 进行刷新页面
    searchClick() {
      this.getPageData();
    },
    resetClick() {
      this.query.condition = "";
      this.getPageData();
    },
  },
};
</script>

<style lang="scss" scoped>
.page-pagination {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
}
</style>
