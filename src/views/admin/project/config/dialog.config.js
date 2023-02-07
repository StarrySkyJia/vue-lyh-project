import { getUserList } from "@/api/admin/user";

const managerOptions = [];
export const dialogFormConfig = {
    name: "项目",
    // 配置信息

    formItems: [{
            field: "itemName",
            type: "input",
            label: "项目名称",
            placeholder: "请输入项目名称",
            rules: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
        },
        {
            field: "itemId",
            type: "input",
            label: "项目ID",
            placeholder: "新建项目无需填写ID，由系统生成",
            isId: true,
            disabled: true,
            // rules: [{ required: true, message: "请输入项目ID", trigger: "blur" }],
        },
        {
            field: "createBy",
            type: "select",
            label: "项目创建人",
            placeholder: "新建项目无需填写ID，由系统生成",
            options: managerOptions,
            rules: [
                { required: true, message: "请输入项目创建人", trigger: "change" },
            ],
        },
        {
            field: "managerName",
            type: "select",
            label: "项目管理员",
            placeholder: "请输入项目管理员",
            contactField: "managerId",
            options: managerOptions,
            rules: [
                { required: true, message: "请输入项目管理员", trigger: "change" },
            ],
        },
        {
            field: "managerId",
            isHide: true,
            type: "input",
            label: "管理员ID",
            placeholder: "请输入用管理员ID",
        },
        {
            field: "itemImgUrl",
            type: "input",
            label: "项目图片地址",
            isPic: true,
            placeholder: "请输入项目图片地址",
        },
        {
            field: "outline",
            type: "textarea",
            label: "项目纲要",
            placeholder: "请输入项目纲要",
            colspan: 24,
        },
    ],

    labelWidth: "100px",
    colLayout: {
        span: 12,
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