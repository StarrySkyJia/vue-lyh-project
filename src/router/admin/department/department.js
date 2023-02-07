const Department = () =>
    import ("@/views/admin/department/index.vue");
export default {
    path: "/department",
    name: "department",
    meta: { title: "部门管理", icon: "el-icon-s-order" },
    component: Department,
};