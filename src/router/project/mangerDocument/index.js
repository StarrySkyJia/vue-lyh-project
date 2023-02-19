const documentManger = () =>
    import ("@/views/main/projectSpace/mangerDocument/index.vue");
export default {
    path: "/documentManger",
    name: "documentManger",
    meta: { title: "文档管理" },
    component: documentManger,
};