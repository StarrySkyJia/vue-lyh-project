const moduleManger = () =>
    import ("@/views/main/projectSpace/module/index.vue");
export default {
    path: "/moduleManger",
    name: "moduleManger",
    meta: { title: "模块管理" },
    component: moduleManger,
};