<template>
  <div class="bug-list">
    <div class="bug-box">
      <div class="bug-title">
        <div class="line"></div>
        未处理
      </div>
      <el-empty
        v-if="bugList_unresolved.length === 0"
        description="暂无数据"
      ></el-empty>
      <div v-for="bugItem in bugList_unresolved" :key="bugItem.bugId">
        <CardItem
          type="unsolved"
          :bugInfo="bugItem"
          @changeUpdate="changeStatus"
          @checkDetial="checkDetailClick"
        />
      </div>
    </div>
    <div class="bug-box">
      <div class="bug-title solving">
        <div class="line line-solving"></div>
        处理中
      </div>
      <el-empty
        v-if="bugList_solving.length === 0"
        description="暂无数据"
      ></el-empty>
      <div v-for="bugItem in bugList_solving" :key="bugItem.bugId">
        <CardItem
          type="solving"
          :bugInfo="bugItem"
          @changeUpdate="changeStatus"
        />
      </div>
    </div>
    <div class="bug-box">
      <div class="bug-title resolved">
        <div class="line line-resolved"></div>
        已解决
      </div>
      <el-empty
        v-if="bugList_resolved.length === 0"
        description="暂无数据"
      ></el-empty>
      <div v-for="bugItem in bugList_resolved" :key="bugItem.bugId">
        <CardItem
          type="resolved"
          :bugInfo="bugItem"
          @changeUpdate="changeStatus"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardItem from "./cardItem.vue";
export default {
  components: { CardItem },
  props: {
    bugList: {
      type: Array,
      defualt: () => [],
    },
  },
  computed: {
    bugList_unresolved() {
      return this.bugList.filter((bug) => {
        return bug.solveStatus === "未处理";
      });
    },
    bugList_solving() {
      return this.bugList.filter((bug) => {
        return bug.solveStatus === "处理中";
      });
    },
    bugList_resolved() {
      return this.bugList.filter((bug) => {
        return bug.solveStatus === "已完成";
      });
    },
  },
  data() {
    return {};
  },
  methods: {
    changeStatus() {
      this.$emit("updateBugList");
    },
    checkDetailClick(bugId) {
      this.$emit("checkDetail", bugId);
    },
  },
};
</script>

<style lang="scss" scoped>
.bug-list {
  width: 100%;
  display: flex;
  justify-content: center;
  flex: 1;
  .bug-box {
    border: #ccc 1px solid;
    flex: 1;
    height: 100%;
    margin: 0 10px;
    border-radius: 10px;
    overflow: hidden;
    .bug-title {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      text-align: left;
      color: #f56c6c;
      font-size: 18px;
      padding: 10px;

      .line {
        display: inline-block;
        width: 5px;
        height: 20px;
        border-radius: 5px;
        background-color: #f56c6c;
        margin-right: 5px;
      }

      .line-solving {
        background-color: #409eff;
      }
      .line-resolved {
        background-color: #67c23a;
      }
    }
    .solving {
      color: #409eff;
    }
    .resolved {
      color: #67c23a;
    }
  }
}
</style>
