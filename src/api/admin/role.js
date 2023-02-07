import request from "@/utils/request";

const api = {
    addRole: "/admin/role/create",
    deleteRole: "/admin/role/delete",
    deleteRoleList: "/admin/role/deleteList",
    getRoleList: "/admin/role/getRoleByCondition",
    updateRole: "/admin/role/update",
};

//新增角色
export function addRole(data) {
    return request.post(api.addRole, data);
}

//获取角色列表
export function getRoleList(data) {
    return request.post(api.getRoleList, data);
}
//删除角色
export function deleteRole(data) {
    return request.delete(api.deleteRole, data);
}

//批量删除角色
export function deleteRoleList(data) {
    return request.delete(api.deleteRoleList, data);
}

// 修改角色
export function updateRole(data) {
    return request.post(api.updateRole, data);
}