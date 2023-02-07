export const contentTableConfig = {
    // content标题
    title: "角色列表",
    isCreate: true,
    createBtnName: "新增角色",
    showIndexColumn: true,
    // showSelectColumn: true,
    propList: [
        { prop: "roleName", label: "角色姓名", minWidth: "100" },
        { prop: "roleId", label: "角色ID", minWidth: "60" },
        { prop: "remarks", label: "角色描述", minWidth: "150" },
        {
            prop: "createTime",
            label: "创建时间",
            minWidth: "130",
        },
        {
            prop: "updateTime",
            label: "更新时间",
            minWidth: "130",
        },

        {
            prop: "handler",
            label: "操作",
            minWidth: "150",
            handlerArr: ["edit", "check", "delete"],
            slotName: "handler",
        },
    ],
};