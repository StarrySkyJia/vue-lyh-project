const Lobby = () =>
    import ("@/views/main/projectSpace/lobby/index.vue");
export default {
    path: "/taskLobby",
    name: "taskLobby",
    meta: { title: "任务大厅" },
    component: Lobby,
};