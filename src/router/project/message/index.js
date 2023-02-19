const message = () =>
    import ("@/views/main/projectSpace/message/index.vue");
export default {
    path: "/message",
    name: "message",
    meta: { title: "信息公告" },
    component: message,
};