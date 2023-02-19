const DocCreate = () =>
    import ("@/views/main/projectSpace/createDocument/index.vue");

export default {
    path: "/documentCreate",
    name: "documentCreate",
    meta: { title: "文档编辑" },
    component: DocCreate,
};