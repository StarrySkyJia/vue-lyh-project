<template>
  <div class="card-item">
    <div class="name">
      <i class="icon" :class="icon"></i>
      <span>{{ name }}</span>
    </div>
    <div class="sum">
      <span>{{ name }}总数：{{ num }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      default: "",
    },
    num: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-item {
  display: inline-block;
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: #f2f2f2 1px solid;
  background-color: #f2f2f2;
  border-radius: 2px;
  padding: 10px;
  box-sizing: border-box;
  margin-right: 5px;
  .name {
    color: #606266;
    .icon {
      font-size: 24px;
      margin-right: 5px;
      color: #606266;
    }
  }
  .sum {
    color: #8d9096;
    font-size: 14px;
  }
}
</style>
