const Role = () =>
    import ("@/views/admin/role/index.vue");

export default {
    path: "/role",
    name: "role",
    meta: { title: "角色管理", icon: "el-icon-s-custom" },
    component: Role,
};