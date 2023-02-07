import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import store from "./store";
import { setupStore } from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
Vue.use(ElementUI);

const vue = new Vue({
    router,
    store,
    render: (h) => h(App),
});

// 刷新后从缓存中获取用户信息
setupStore();

vue.$mount("#app");