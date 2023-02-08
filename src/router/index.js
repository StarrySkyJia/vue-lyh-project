import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index.vue";
Vue.use(VueRouter);
// 修复Navigation cancelled from “/xxx“ to “/xxx“ with a new navigation.
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
// push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject);
    return originalPush.call(this, location).catch((err) => err);
};
// replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalReplace.call(this, location, onResolve, onReject);
    return originalReplace.call(this, location).catch((err) => err);
};

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