export const dialogFormConfig = {
    name: "角色",
    // 配置信息
    formItems: [{
            field: "roleName",
            type: "input",
            label: "角色",
            placeholder: "请输入角色名称",
            rules: [{ required: true, message: "请输入角色名称", trigger: "blur" }],
        },
        {
            field: "roleId",
            type: "input",
            label: "角色ID",
            placeholder: "新建角色无需填写ID，由系统生成",
            isId: true,
            disabled: true,
        },
        {
            field: "remarks",
            type: "input",
            label: "备注",
            placeholder: "请输入部门备注",
        },
    ],

    labelWidth: "100px",
    colLayout: {
        span: 12,
    },
};