export const contentTableConfig = {
    // content标题
    title: "部门列表",
    showIndexColumn: true,
    // showSelectColumn: true,
    isCreate: true,
    createBtnName: "新增项目",
    otherPropSlots: ["projectInfo"],
    propList: [{
            prop: "itemName",
            label: "项目信息",
            slotName: "projectInfo",
            // 最小宽度
            minWidth: "200px",
        },
        { prop: "itemId", label: "项目ID" },
        {
            prop: "createBy",
            label: "项目创建人",
        },
        { prop: "managerName", label: "项目管理员" },
        { prop: "managerId", label: "管理员ID" },
        {
            prop: "itemCounts",
            label: "项目人数",
        },
        // { prop: "outline", label: "项目纲要" },
        {
            prop: "handler",
            label: "操作",
            handlerArr: ["edit", "check", "delete"],
            slotName: "handler",
        },
    ],
};