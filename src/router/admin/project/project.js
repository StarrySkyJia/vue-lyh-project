const Project = () =>
    import ("@/views/admin/project/index.vue");
export default {
    path: "/project",
    name: "project",
    meta: { title: "项目管理", icon: "el-icon-s-marketing" },

    component: Project,
};