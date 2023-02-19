const AllProject = () =>
    import ("@/views/main/project/allProject/index.vue");
export default {
    path: "/allProject",
    name: "allProject",
    meta: { title: "企业项目列表", icon: "el-icon-s-promotion" },
    component: AllProject,
};