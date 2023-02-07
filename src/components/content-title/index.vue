<template>
  <div class="title">
    <div>{{ currentPath }}</div>
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
};
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
}

.title::before {
  content: "";
  width: 5px;
  height: 24px;
  margin-right: 5px;
  background-color: #409eff;
}
</style>
