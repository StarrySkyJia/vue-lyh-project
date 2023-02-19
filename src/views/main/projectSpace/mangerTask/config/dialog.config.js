import { getDictByValue } from "@/api/dictionaries";
import store from "../../../../../store";
export const dialogFormConfig = {
    name: "任务",
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
            disabled: true,
            defaultValue: store.state.module.moduleInfo.moduleName,
            rules: [{ required: true, message: "请输入模块名称", trigger: "blur" }],
        },
        {
            field: "moduleId",
            label: "模块ID",
            type: "input",
            isHide: true,
            defaultValue: store.state.module.moduleInfo.moduleId,
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
            field: "createById",
            label: "填写人",
            type: "input",
            isHide: true,
            defaultValue: store.state.user.userInfo.userId,
        },
        {
            field: "taskName",
            type: "input",
            label: "任务名称",
            placeholder: "请输入任务名称",
            rules: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
        },
        {
            field: "taskTypeLabel",
            type: "select",
            label: "任务类型",
            contactField: "taskType",
            options: [],
            rules: [{ required: true, message: "请输入任务类型", trigger: "change" }],
        },
        {
            label: "任务类型",
            field: "taskType",
            type: "input",
            isHide: true,
        },
        {
            field: "priorityLabel",
            type: "select",
            label: "优先级",
            contactField: "priority",
            options: [],
            rules: [{ required: true, message: "请输入优先级", trigger: "change" }],
        },
        {
            label: "优先级",
            field: "priority",
            type: "input",
            isHide: true,
        },
        {
            field: "content",
            type: "textarea",
            label: "内容",
            placeholder: "请输入内容",
            colspan: 24,
            rules: [{
                required: true,
                min: 5,
                max: 5000,
                message: "内容需要在5-5000字之间",
                trigger: "blur",
            }, ],
        },
    ],

    labelWidth: "100px",
    colLayout: {
        span: 12,
    },
};
// 获取任务类型
export function getTaskType() {
    return new Promise((resolve) => {
        const options = [];
        getDictByValue({ value: 5000 }).then((res) => {
            res.forEach((item) => {
                options.push({ label: item.label, value: item.value });
            });
            resolve(options);
        });
    });
}
// 获取优先级
export function getPriority() {
    return new Promise((resolve) => {
        const options = [];

        getDictByValue({ value: 3000 }).then((res) => {
            res.forEach((item) => {
                options.push({ label: item.label, value: item.value });
            });
            resolve(options);
        });
    });
}