export const contentTableConfig = {
    // content标题
    title: "部门列表",
    showIndexColumn: true,
    // showSelectColumn: true,
    isCreate: true,
    createBtnName: "新增部门",
    propList: [
        { prop: "deptName", label: "部门名称" },
        { prop: "deptNo", label: "部门ID" },
        { prop: "managerName", label: "部门管理人" },
        {
            prop: "counts",
            label: "部门人数",
        },
        { prop: "remarks", label: "部门描述" },
        {
            prop: "createTime",
            label: "成立时间",
        },
        {
            prop: "handler",
            label: "操作",
            slotName: "handler",
            handlerArr: ["edit", "check", "delete"],
        },
    ],
};