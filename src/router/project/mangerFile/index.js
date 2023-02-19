const File = () =>
    import ("@/views/main/projectSpace/mangerFile/index.vue");
export default {
    path: "/fileManger",
    name: "fileManger",
    meta: { title: "文件管理" },
    component: File,
};