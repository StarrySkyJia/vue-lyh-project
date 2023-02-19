const bugLobby = () =>
    import ("@/views/main/projectSpace/bugLobby/index.vue");
export default {
    path: "/bugLobby",
    name: "bugLobby",
    meta: { title: "缺陷大厅" },
    component: bugLobby,
};