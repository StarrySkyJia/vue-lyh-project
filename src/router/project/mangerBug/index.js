const bugManger = () =>
    import ("@/views/main/projectSpace/mangerBug/index.vue");
export default {
    path: "/bugManger",
    name: "bugManger",
    meta: { title: "缺陷管理" },
    component: bugManger,
};