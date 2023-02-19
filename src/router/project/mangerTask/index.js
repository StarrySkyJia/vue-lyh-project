const taskManger = () =>
    import ("@/views/main/projectSpace/mangerTask/index.vue");
export default {
    path: "/taskManger",
    name: "taskManger",
    meta: { title: "任务管理" },
    component: taskManger,
};