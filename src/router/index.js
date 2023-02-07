import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index.vue";
Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Home",
        component: Index,
    },
    {
        path: "/login",
        name: "login",
        meta: {
            title: "登录页",
        },
        component: () =>
            import ("@/views/login/login.vue"),
    },
    {
        path: "/index",
        name: "index",
        meta: {
            title: "首页",
        },
        component: () =>
            import ("@/views/index.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

// 更新页面标题
router.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = `开发任务跟踪系统-${to.meta.title}`;
    }
    next();
});

export default router;