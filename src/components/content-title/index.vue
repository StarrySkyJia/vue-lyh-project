<template>
  <div class="title">
    <div class="name">{{ currentPath }}</div>
    <!-- <div>
      <el-button size="mini" @click="back">返回</el-button>
    </div> -->
  </div>
</template>

<script>
export default {
  computed: {
    currentPath() {
      return this.$route.meta.title;
    },
  },
  mounted() {},
  methods: {
    back() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  .name {
    position: relative;
    padding-left: 10px;
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 5px;
      height: 24px;
      margin-right: 5px;
      background-color: #409eff;
      border-radius: 5px;
    }
  }
}
</style>
