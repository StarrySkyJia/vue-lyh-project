export const searchFormConfig = {
    // 配置信息
    // 优先展示搜索列表
    formItems: [{
        field: "realName",
        type: "input",
        label: "姓名",
        placeholder: "请输入用户姓名",
    }, ],
    // 高级搜索列表
    advanceFormItems: [{
            field: "realName",
            type: "input",
            label: "姓名",
            placeholder: "请输入用户姓名",
        },
        {
            field: "deptName",
            type: "input",
            label: "部门",
            placeholder: "请输入用户部门",
        },
        {
            field: "userNo",
            type: "input",
            label: "用户ID",
            placeholder: "请输入用户ID",
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
    isAdvance: true,
};