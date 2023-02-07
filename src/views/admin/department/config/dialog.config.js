import store from "../../../../store";
import { getUserList } from "@/api/admin/user";

const managerOptions = [];
export const dialogFormConfig = {
    // dialog名称,用于生成新建按钮、弹窗标题等
    name: "部门",
    // 配置信息
    formItems: [{
            field: "deptName",
            type: "input",
            label: "部门名称",
            placeholder: "请输入部门名称",
            rules: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
        },
        {
            field: "deptNo",
            type: "input",
            label: "部门编号",
            placeholder: "请输入部门编号",
            rules: [{ required: true, message: "请输入部门编号", trigger: "blur" }],
        },
        {
            label: "部门Id",
            field: "deptId",
            // 是否是id，是的话新建时不会携带
            isId: true,
            // 是否隐藏，编辑时也会携带上
            isHide: true,
        },
        {
            // 字段名
            field: "managerName",
            // 类型
            type: "select",
            // 文本标签
            label: "部门管理员",
            // 默认值
            defaultValue: store.state.user.userInfo.realName,
            // 是否能标记
            disabled: true,
            // 提示输入
            placeholder: "请输入部门管理员",
            // select选项
            options: managerOptions,

            // 规则
            rules: [{ required: true, message: "请输入部门管理员", trigger: "blur" }],
        },
        {
            label: "管理员Id",
            field: "managerId",
            isHide: true,
            defaultValue: store.state.user.userInfo.userId,
        },
        {
            field: "remarks",
            type: "input",
            label: "部门描述",
            placeholder: "请输入邮箱",
        },
    ],

    labelWidth: "100px",
    itemStyle: {},
    colLayout: {
        span: 12,
    },
    rowLayout: {
        // justify: "center",
        // type: "flex",
    },
};

// 获取用户列表
export function getUserOptions() {
    return new Promise((resolve) => {
        const managerOptions = [];
        getUserList({ pageNum: 0, pageSize: 99 }).then((res) => {
            res.users.forEach((dept) => {
                managerOptions.push({ title: dept.realName, value: dept.userId });
            });
            resolve(managerOptions);
        });
    });
}