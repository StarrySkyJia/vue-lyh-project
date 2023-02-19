<template>
  <el-card class="card" shadow="hover">
    <div class="card-title">
      <div class="block"></div>
      {{ title }}
    </div>
    <slot></slot>
  </el-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "默认标题",
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 10px 0;
  .card-title {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 10px;
    .block {
      width: 4px;
      background-color: #409eff;
      border-radius: 3px;
      height: 20px;
      margin-right: 5px;
    }
  }
}
</style>
