<template>
  <div class="detail-box">
    <div class="item-name">
      <el-avatar
        :size="50"
        shape="square"
        :src="detail.itemImgUrl"
        fit="fill"
      ></el-avatar>
      <span class="name">{{ detail.itemName }}</span>
    </div>
    <Card title="项目说明">
      <el-descriptions>
        <el-descriptions-item label="创建者">{{
          detail.createBy
        }}</el-descriptions-item>
        <el-descriptions-item label="管理者">{{
          detail.managerName
        }}</el-descriptions-item>
      </el-descriptions>
      <el-descriptions :column="1">
        <el-descriptions-item label="访问方式"
          >授权访问（项目成员或创建者登录后才能访问）</el-descriptions-item
        >
        <el-descriptions-item label="项目纲要">{{
          detail.outline
        }}</el-descriptions-item>
      </el-descriptions>
    </Card>
    <Card title="项目统计">
      <div class="card-row">
        <CardItem
          :num="detail.moduleCount"
          name="模块"
          icon="el-icon-folder-opened"
        ></CardItem>
        <CardItem
          :num="detail.itemCounts"
          name="项目成员"
          icon="el-icon-user"
        ></CardItem>
        <CardItem
          :num="detail.documentCount"
          name="文档"
          icon="el-icon-tickets"
        ></CardItem>
        <CardItem
          :num="detail.fileCount"
          name="文件"
          icon="el-icon-link"
        ></CardItem>
      </div>
    </Card>
    <Card title="项目进度">
      <div class="card-row">
        <CardItem
          :num="detail.taskCount"
          name="任务数目"
          icon="el-icon-document-add"
        ></CardItem>
        <CardItem
          :num="detail.processingTaskCount"
          name="处理中的任务"
          icon="el-icon-document-remove"
        ></CardItem>
        <CardItem
          :num="detail.unfinishedTaskCount"
          name="未处理的任务"
          icon="el-icon-document-delete"
        ></CardItem>
        <CardItem
          :num="detail.bugCount"
          name="故障数目"
          icon="el-icon-warning"
        ></CardItem>
        <CardItem
          :num="detail.processingBugCount"
          name="处理中的故障"
          icon="el-icon-remove"
        ></CardItem>
        <CardItem
          :num="detail.unfinishedBugCount"
          name="未处理的故障"
          icon="el-icon-question"
        ></CardItem>
      </div>
    </Card>
    <Card title="信息统计">
      <div ref="myChart" style="width: 80%; height: 400px"></div>
    </Card>
  </div>
</template>

<script>
import { getProjectDetail } from "@/api/admin/project";
import { getProjStatistics } from "@/api/statistics";
import Card from "./card.vue";
import CardItem from "./itemCard.vue";
import * as echarts from "echarts";

export default {
  components: {
    Card,
    CardItem,
  },
  data() {
    return {
      itemId: this.$route.query.itemId,
      detail: {},
    };
  },

  mounted() {
    getProjectDetail({ itemId: this.itemId }).then((res) => {
      this.detail = res;
    });
    // 信息统计
    getProjStatistics(this.itemId).then((data) => {
      console.log(data);
      let myChart = echarts.init(this.$refs.myChart);
      myChart.setOption({
        title: {
          text: "项目任务/缺陷情况",
          subtext: "昨日统计数据",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["任务", "缺陷"],
        },
        xAxis: {
          type: "category",
          data: ["未完成", "处理中", "已完成"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "任务",
            data: [
              data.unfinishedTaskCount,
              data.processingTaskCount,
              data.completedTaskCount,
            ],
            type: "bar",
            showBackground: true,
            color: "#409EFF",
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
            markPoint: {
              data: [
                { type: "max", name: "Max" },
                { type: "min", name: "Min" },
              ],
            },
          },
          {
            name: "缺陷",
            data: [
              data.unfinishedBugCount,
              data.processingBugCount,
              data.completedBugCount,
            ],
            type: "bar",
            showBackground: true,
            color: "#67C23A",
            backgroundStyle: {
              color: "rgba(180, 180, 180, 0.2)",
            },
            markPoint: {
              data: [
                { type: "max", name: "Max" },
                { type: "min", name: "Min" },
              ],
            },
          },
        ],
      });
      myChart.resize();
    });
  },
};
</script>

<style lang="scss" scoped>
.detail-box {
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
  .item-name {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    font-size: 24px;
    color: #409eff;
    font-weight: 700;
    margin-bottom: 10px;
    .name {
      margin-left: 10px;
    }
  }
}

.card-row {
  display: flex;
  justify-content: flex-start;
}
</style>
