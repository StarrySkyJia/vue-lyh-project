import store from "../../../../../store";
export const dialogFormConfig = {
    name: "模块",
    // 配置信息
    formItems: [{
            field: "itemName",
            type: "input",
            label: "项目名称",
            disabled: true,
            defaultValue: store.state.project.projectInfo.itemName,
            rules: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
            colspan: 24,
        },
        {
            label: "项目ID",
            field: "itemId",
            type: "input",
            isHide: true,
            defaultValue: store.state.project.projectInfo.itemId,
        },
        {
            field: "moduleName",
            type: "input",
            label: "模块名称",
            rules: [{ required: true, message: "请输入模块名称", trigger: "blur" }],
        },
        {
            field: "moduleId",
            label: "模块ID",
            type: "input",
            isHide: true,
        },
        {
            field: "createBy",
            label: "填写人",
            type: "input",
            disabled: true,
            defaultValue: store.state.user.userInfo.realName,
            rules: [{ required: true, message: "请输入填写人", trigger: "blur" }],
        },

        {
            field: "moduleTypeLabel",
            type: "select",
            label: "模块类型",
            contactField: "moduleType",
            options: [
                { value: 0, label: "全部" },
                { value: 1, label: "基础模块" },
                { value: 2, label: "公共模块" },
                { value: 3, label: "应用模块" },
                { value: 4, label: "其它模块" },
            ],
            rules: [{ required: true, message: "请输入模块类型", trigger: "change" }],
        },
        {
            label: "模块类型",
            field: "moduleType",
            type: "input",
            isHide: true,
        },
        {
            label: "模块url地址",
            field: "moduleUrl",
            type: "input",
        },
    ],

    labelWidth: "100px",
    colLayout: {
        span: 12,
    },
};