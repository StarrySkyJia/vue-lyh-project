export const searchFormConfig = {
    // 配置信息
    // 优先展示搜索列表
    formItems: [{
        field: "condition",
        type: "input",
        label: "模糊搜索",
        placeholder: "任务名/提报人姓名方式搜索",
    }, ],
    advanceFormItems: [{
            field: "priority",
            type: "select",
            label: "优先级",
            placeholder: "请选择优先级，默认全部",
            defaultValue: 0,
            options: [
                { value: 0, label: "全部" },
                { value: 1, label: "低" },
                { value: 2, label: "中" },
                { value: 3, label: "高" },
                { value: 4, label: "紧急" },
            ],
        },
        {
            field: "solveStatus",
            type: "select",
            label: "解决状态",
            placeholder: "请选择解决状态，默认全部",
            defaultValue: 0,
            options: [
                { value: 0, label: "全部" },
                { value: 1, label: "未解决" },
                { value: 2, label: "处理中" },
                { value: 3, label: "已解决" },
            ],
        },
        {
            field: "sort",
            type: "select",
            label: "升降序",
            placeholder: "请选择升降序，默认降序",
            defaultValue: 1,
            options: [
                { value: 1, label: "降序" },
                { value: 2, label: "升序" },
            ],
        },
        {
            field: "sortType",
            type: "select",
            label: "排序方式",
            placeholder: "请选择升降序，默认时间排序",
            defaultValue: 1,
            options: [
                { value: 1, label: "时间" },
                { value: 2, label: "优先级" },
            ],
        },
        {
            field: "bugType",
            type: "select",
            label: "缺陷类型",
            placeholder: "请选择缺陷类型，默认全部",
            defaultValue: 0,
            options: [
                { value: 0, label: "全部" },
                { value: 1, label: "接口开发" },
                { value: 2, label: "接口调整" },
                { value: 3, label: "需求变更" },
                { value: 4, label: "其它" },
            ],
        },
        {
            field: "severity",
            type: "select",
            label: "严重程度",
            placeholder: "请选择缺陷类型，默认全部",
            defaultValue: 0,
            options: [
                { value: 0, label: "全部" },
                { value: 1, label: "不重要" },
                { value: 2, label: "一般" },
                { value: 3, label: "严重" },
                { value: 4, label: "致命" },
            ],
        },
        {
            field: "type",
            type: "select",
            label: "分类方式",
            placeholder: "请选择分类方式，默认全部",
            defaultValue: 2,
            options: [
                { value: 0, label: "全部" },
                { value: 1, label: "我创建的" },
                { value: 2, label: "我处理的" },
            ],
        },
    ],
    isAdvance: true,
    labelWidth: "100px",
    itemStyle: {
        padding: "10px 40px 10px 10px",
    },
    colLayout: {
        span: 8,
    },
    rowLayout: {},
};