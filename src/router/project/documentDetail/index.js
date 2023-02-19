const DocDetail = () =>
    import ("@/views/main/projectSpace/documentDetail/index.vue");

export default {
    path: "/documentDetail",
    name: "documentDetail",
    meta: { title: "文档页面" },
    component: DocDetail,
};