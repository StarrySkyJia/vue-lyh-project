import request from "@/utils/request";

const api = {
    addDepartment: "/admin/department/create",
    deleteDepartment: "/admin/department/delete",
    deleteDepartmentList: "/admin/department/delete",
    getDepartmentList: "/admin/department/queryListByCondition",
    updateDepartment: "/admin/department/update",
    getDeptById: "/admin/department/getDeptById",
    getDeptMemberList: "/admin/department/userList",
    addDeptMember: "/admin/department/addUser",
    removeDeptMember: "/admin/department/removeUser",
};

//新增部门
export function addDepartment(data) {
    return request.post(api.addDepartment, data);
}

//删除部门
export function deleteDepartment(data) {
    return request.delete(api.deleteDepartment, data);
}

//批量删除部门
export function deleteDepartmentList(data) {
    return request.delete(api.deleteDepartmentList, data);
}

// 获取部门详情
export function getDepartmentDetail(data) {
    return request.get(api.getDeptById, data);
}

//获取项目列表
export function getDepartmentList(data) {
    return request.post(api.getDepartmentList, data);
}

// 编辑项目
export function updateDepartment(data) {
    return request.post(api.updateDepartment, data);
}

// 获取部门成员
export function getDeptMemberList(data) {
    return request.post(api.getDeptMemberList, data);
}

// 添加部门成员
export function addDeptMember(data) {
    return request.post(api.addDeptMember, data);
}

// 删除部门成员
export function removeDeptMember(data) {
    return request.post(api.removeDeptMember, data);
}