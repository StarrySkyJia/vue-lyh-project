export const searchFormConfig = {
    // 配置信息
    // 优先展示搜索列表
    formItems: [{
            field: "condition",
            type: "input",
            label: "模糊搜索",
            placeholder: "模块名/模块url/创建人方式搜索",
        },
        {
            field: "moduleType",
            type: "select",
            label: "模块类型",
            placeholder: "请选择模块类型，默认全部",
            options: [
                { value: 0, label: "全部" },
                { value: 1, label: "基础模块" },
                { value: 2, label: "公共模块" },
                { value: 3, label: "应用模块" },
                { value: 4, label: "其它模块" },
            ],
        },
    ],

    labelWidth: "100px",
    itemStyle: {
        padding: "10px 40px 10px 10px",
    },
    colLayout: {
        span: 8,
    },
    rowLayout: {},
};