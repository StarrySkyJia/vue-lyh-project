const MangerProject = () =>
    import ("@/views/main/project/mangerProject/index.vue");
export default {
    path: "/mangerProject",
    name: "mangerProject",
    meta: { title: "我管理的项目", icon: "el-icon-s-order" },
    component: MangerProject,
};