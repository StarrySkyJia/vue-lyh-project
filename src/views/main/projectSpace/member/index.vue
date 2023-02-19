<template>
  <div>
    <el-table :data="userList" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <div class="user-info">
            <div class="desc">
              <el-descriptions :column="2">
                <el-descriptions-item label="用户名称">{{
                  props.row.realName
                }}</el-descriptions-item>
                <el-descriptions-item label="用户编号">{{
                  props.row.userNo
                }}</el-descriptions-item>
                <el-descriptions-item label="性别"
                  ><el-tag size="small">{{
                    props.row.gender
                  }}</el-tag></el-descriptions-item
                >
                <el-descriptions-item label="所在部门">{{
                  props.row.deptName
                }}</el-descriptions-item>
                <el-descriptions-item label="职位">{{
                  props.row.roleName
                }}</el-descriptions-item>
                <el-descriptions-item label="手机号">{{
                  props.row.phone
                }}</el-descriptions-item>
                <el-descriptions-item label="工作邮箱">{{
                  props.row.workMail
                }}</el-descriptions-item>
              </el-descriptions>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="用户名称" prop="realName"> </el-table-column>
      <el-table-column label="所在部门" prop="deptName"></el-table-column>
      <el-table-column label="职位" prop="roleName"> </el-table-column>
      <el-table-column label="手机号" prop="phone"> </el-table-column>
      <el-table-column label="工作邮箱" prop="workMail"> </el-table-column>
      <el-table-column label="统计" prop="handler">
        <template slot-scope="scope">
          <el-button
            @click="handleStatisticsClick(scope.row)"
            type="text"
            size="small"
            >近期信息</el-button
          >
          <el-button
            @click="handleStatisticsClick(scope.row)"
            type="text"
            size="small"
            >所有信息</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div v-if="isProjManger" class="s-btn">
      <el-button type="primary" icon="el-icon-s-data" @click="handleALLStaClick"
        >所有成员统计</el-button
      >
    </div>

    <Statistics ref="dialog" />
  </div>
</template>

<script>
import Statistics from "./statistics.vue";
import { getProjUserList } from "@/api/project/project";
import { mapGetters } from "vuex";
export default {
  components: { Statistics },
  data() {
    return {
      itemId: this.$route.query.itemId,
      userList: [],
      total: 0,
    };
  },
  computed: { ...mapGetters(["isProjManger"]) },
  mounted() {
    const data = { itemId: this.itemId, pageNum: 0, pageSize: 10 };

    getProjUserList(data).then((res) => {
      this.userList = res.userInfoVOList;
      this.total = res.total;
    });
  },
  methods: {
    handleStatisticsClick(item) {
      this.$refs.dialog.open(item);
    },
    handleALLStaClick() {
      this.$refs.dialog.openAll();
    },
  },
};
</script>

<style lang="scss" scoped>
.user-info {
  width: 100%;
  padding: 0 80px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  .desc {
    flex: 7;
    flex-shrink: 0;
    box-sizing: border-box;
  }
  .chart {
    flex: 3;
  }
}

.s-btn {
  margin-top: 10px;
  float: left;
}
</style>
