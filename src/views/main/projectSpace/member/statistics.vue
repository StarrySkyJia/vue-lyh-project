<template>
  <el-dialog
    title="信息统计"
    :visible.sync="dialogVisible"
    append-to-body
    width="80%"
  >
    <div
      v-if="allOrUser === 'user'"
      ref="statisticsRef"
      style="width: 100%; height: 480px"
    ></div>
    <div
      v-if="allOrUser === 'all'"
      ref="statisticsRef"
      style="width: 100%; height: 480px"
    ></div>
  </el-dialog>
</template>

<script>
import { getUserStatistics, getAllUserStatictiscs } from "@/api/statistics";
import * as echarts from "echarts";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      dialogVisible: false,
      allOrUser: "user",
    };
  },
  computed: { ...mapGetters(["currentProjId"]) },
  methods: {
    open(item) {
      this.dialogVisible = true;
      this.allOrUser = "user";

      this.$nextTick(() => {
        this.drawBar(item.userId);
      });
    },
    openAll() {
      this.dialogVisible = true;
      this.allOrUser = "all";
      this.$nextTick(() => {
        this.drawBarAll();
      });
    },
    async drawBar(userId) {
      let myChart = echarts.init(this.$refs.statisticsRef);
      const res = await getUserStatistics({
        day: 7,
        itemId: this.currentProjId,
        userId: userId,
      });
      const legendData = [
        "未完成的任务",
        "处理中的任务",
        "已完成的任务",
        "未完成的缺陷",
        "处理中的缺陷",
        "已完成的缺陷",
      ];
      const xAxisData = [];
      const seriesData_1 = [];
      const seriesData_2 = [];
      const seriesData_3 = [];
      const seriesData_4 = [];
      const seriesData_5 = [];
      const seriesData_6 = [];
      res.forEach((item) => {
        xAxisData.push(item.today);
        seriesData_1.push(item.unfinishedTaskCount);
        seriesData_2.push(item.processingTaskCount);
        seriesData_3.push(item.completedTaskCount);
        seriesData_4.push(item.unfinishedBugCount);
        seriesData_5.push(item.processingBugCount);
        seriesData_6.push(item.completedBugCount);
      });

      const option = {
        title: {
          text: "成员近期任务/缺陷情况",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: legendData,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xAxisData,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "未完成的任务",
            type: "line",
            stack: "Total",
            data: seriesData_1,
            smooth: true,
          },
          {
            name: "处理中的任务",
            type: "line",
            stack: "Total",
            data: seriesData_2,
            smooth: true,
          },
          {
            name: "已完成的任务",
            type: "line",
            stack: "Total",
            data: seriesData_3,
            smooth: true,
            markPoint: {
              data: [{ type: "max", name: "Max" }],
            },
          },
          {
            name: "未完成的缺陷",
            type: "line",
            stack: "Total",
            data: seriesData_4,
            smooth: true,
          },
          {
            name: "处理中的缺陷",
            type: "line",
            stack: "Total",
            data: seriesData_5,
            smooth: true,
          },
          {
            name: "已完成的缺陷",
            type: "line",
            stack: "Total",
            data: seriesData_6,
            smooth: true,
            markPoint: {
              data: [{ type: "max", name: "Max" }],
            },
          },
        ],
      };
      myChart.setOption(option);
      myChart.resize();
    },
    async drawBarAll() {
      const data = {
        itemId: this.currentProjId,
        pageNum: 0,
        pageSize: 99,
      };
      const res = await getAllUserStatictiscs(data);
      //   成员数据
      const member = res.memberTaskVOList;
      //   横坐标数据
      const xAxisData = [];
      member.forEach((item) => {
        xAxisData.push(item.realName);
      });
      const legendData = ["任务数", "缺陷数", "文件数", "文档数"];
      const dataObj = {
        0: "taskCount",
        1: "bugCount",
        2: "fileCount",
        3: "documentCount",
      };
      const seriesData = [];
      legendData.forEach((item, index) => {
        const data = [];
        member.forEach((item) => {
          data.push(item[dataObj[index]]);
        });
        seriesData.push({
          name: item,
          type: "bar",
          data: data,
          markPoint: {
            data: [
              { type: "max", name: "Max" },
              { type: "min", name: "Min" },
            ],
          },
          markLine: {
            data: [{ type: "average", name: "Avg" }],
          },
        });
      });

      const option = {
        title: {
          text: "所有成员信息",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: legendData,
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            // prettier-ignore
            data:xAxisData,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: seriesData,
      };
      //   图表赋值
      let myChart = echarts.init(this.$refs.statisticsRef);
      myChart.setOption(option);
      myChart.resize();
    },
  },
};
</script>

<style lang="scss" scoped></style>
