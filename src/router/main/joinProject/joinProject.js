const JoinProject = () =>
    import ("@/views/main/project/joinProject/index.vue");
export default {
    path: "/joinProject",
    name: "joinProject",
    meta: { title: "我加入的项目", icon: "el-icon-s-claim" },
    component: JoinProject,
};