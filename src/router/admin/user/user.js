const User = () =>
    import ("@/views/admin/user/index.vue");
export default {
    path: "/user",
    name: "user",
    meta: {
        title: "用户管理",
        icon: "el-icon-user-solid",
    },
    component: User,
};