export const contentTableConfig = {
    // content标题
    title: "用户列表",
    // 是否展示序号
    showIndexColumn: true,
    // 是否展示多选框
    // showSelectColumn: true,
    // 组件特有的插槽需要声明
    // 由于动态生成slot存在问题，所以需要在配置里声明
    otherPropSlots: ["userInfo"],
    // table列表展示
    propList: [{
            // 属性名
            prop: "userId",
            // 文本名
            label: "用户基本信息",
            // 插槽名称:分为公共插槽和特有插槽,特有插槽需要声明
            slotName: "userInfo",
            // 最小宽度
            minWidth: "200px",
        },
        { prop: "userNo", label: "用户ID" },
        { prop: "phone", label: "手机号" },
        { prop: "deptName", label: "所属部门" },
        {
            prop: "roleName",
            label: "角色",
        },
        {
            prop: "userStatus",
            label: "禁用状态",
            slotName: "status",
        },

        {
            prop: "handler",
            label: "操作",
            // 操作栏按钮列表, 操作按钮内容展示通过数组写入
            // 目前支持编辑和删除
            handlerArr: ["edit", "check"],
            slotName: "handler",
        },
    ],
};