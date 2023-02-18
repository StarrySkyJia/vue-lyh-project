const memberManger = () =>
    import ("@/views/main/projectSpace/member/index.vue");
export default {
    path: "/memberManger",
    name: "memberManger",
    meta: { title: "项目成员" },
    component: memberManger,
};