const bugDetail = () =>
    import ("@/views/main/projectSpace/bugDetail/index.vue");
export default {
    path: "/bugDetail",
    name: "bugDetail",
    meta: { title: "缺陷详情" },
    component: bugDetail,
};