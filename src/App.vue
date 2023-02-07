<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  width: 100%;
  height: 100%;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  box-sizing: border-box;
}

// 滚动条样式
::-webkit-scrollbar {
  width: 5px;
  height: 14px;
}
::-webkit-scrollbar-thumb {
  //滑块部分
  border-radius: 3px;
  background-color: #b6b6b6;
}
::-webkit-scrollbar-track {
  //轨道部分
  // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgb(238, 241, 246);
  border-radius: 5px;
}
</style>
