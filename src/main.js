import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import store from "./store";
import { setupStore } from "./store";

import ElementUI from "element-ui";
import { Notification } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// md编辑器
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";

// highlightjs
import hljs from "highlight.js";

// codemirror 编辑器的相关资源
import Codemirror from "codemirror";

VMdEditor.Codemirror = Codemirror;
VMdPreview.Codemirror = Codemirror;
VMdEditor.use(githubTheme, { Hljs: hljs });
VMdPreview.use(githubTheme, { Hljs: hljs });

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VMdEditor);
Vue.use(VMdPreview);

const vue = new Vue({
    router,
    store,
    render: (h) => h(App),
});

// 刷新后从缓存中获取用户信息
setupStore();

vue.$mount("#app");