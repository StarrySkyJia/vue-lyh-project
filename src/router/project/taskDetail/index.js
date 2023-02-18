const taskDetail = () =>
    import ("@/views/main/projectSpace/taskDetail/index.vue");
export default {
    path: "/taskDetail",
    name: "taskDetail",
    meta: { title: "任务详情" },
    component: taskDetail,
};