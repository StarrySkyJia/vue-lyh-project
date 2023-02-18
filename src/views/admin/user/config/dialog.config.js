import { getRoleList } from "@/api/admin/role";
import { getDepartmentList } from "@/api/admin/department";
const deptOptions = [];
const roleOptions = [];

export const dialogFormConfig = {
    name: "用户",
    // 配置信息
    formItems: [{
            field: "realName",
            type: "input",
            label: "姓名",
            placeholder: "请输入用户姓名",
            rules: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
        },

        {
            field: "userId",
            type: "input",
            disabled: true,
            label: "用户ID",
            placeholder: "请输入用户ID",
        },
        {
            field: "phone",
            type: "input",
            label: "手机号",
            placeholder: "请输入用户手机",
        },
        {
            field: "workMail",
            type: "input",
            label: "工作邮箱",
            placeholder: "请输入邮箱",
        },
        {
            field: "deptName",
            type: "select",
            label: "部门",
            placeholder: "请输入用户部门",
            contactField: "deptId",
            options: deptOptions,
        },
        {
            field: "deptId",
            isHide: true,
            type: "input",
            label: "部门ID",
            placeholder: "请输入用部门ID",
        },
        {
            field: "roleName",
            type: "select",
            label: "角色",
            placeholder: "请输入用户角色",
            contactField: "roleId",
            options: roleOptions,
        },
        {
            field: "roleId",
            isHide: true,
            type: "input",
            label: "角色ID",
            placeholder: "请输入用户角色ID",
        },
        {
            field: "headImgUrl",
            type: "picUpload",
            isPic: true,
            filePath: "avatar",
            label: "用户头像",
            placeholder: "请输入用户头像",
        },
    ],

    labelWidth: "100px",
    itemStyle: {},
    colLayout: {
        span: 12,
    },
    rowLayout: {},
};

// 获取部门列表
export function getDepartmentOptions() {
    return new Promise((resolve) => {
        const deptOptions = [];
        getDepartmentList({ pageNum: 0, pageSize: 99 }).then((res) => {
            res.departmentList.forEach((dept) => {
                deptOptions.push({ label: dept.deptName, value: dept.deptId });
            });
            resolve(deptOptions);
        });
    });
}
// 获取角色列表
export function getRoleOptions() {
    return new Promise((resolve) => {
        const roleOptions = [];
        getRoleList({ pageNum: 0, pageSize: 99 }).then((res) => {
            res.roleList.forEach((role) => {
                roleOptions.push({ label: role.roleName, value: role.roleId });
            });
            resolve(roleOptions);
        });
    });
}