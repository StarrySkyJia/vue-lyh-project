import request from "@/utils/request";

const api = {
    addProject: "/item/create",
    deleteProject: "/item/delete",
    getProjectList: "/item/getItemByCondition",
    getProjectDetail: "/item/getItemById",
    updateProject: "/item/update",
    getProjectMemberList: "/item/getUserListByItem",
    addProjectMember: "/item/addItemUser",
    removeProjectMember: "/item/deleteItemUser",
};

//新增项目
export function addProject(data) {
    return request.post(api.addProject, data);
}

//删除项目
export function deleteProject(data) {
    return request.delete(api.deleteProject, data);
}

// 获取项目详情
export function getProjectDetail(data) {
    return request.get(api.getProjectDetail, data);
}

//获取项目列表
export function getProjectList(data) {
    return request.post(api.getProjectList, data);
}

// 编辑项目
export function updateProject(data) {
    return request.post(api.updateProject, data);
}

// 获取项目成员
export function getProjectMemberList(data) {
    return request.post(api.getProjectMemberList, data);
}

// 添加项目成员
export function addProjectMember(data) {
    return request.post(api.addProjectMember, data);
}

// 删除项目成员
export function removeProjectMember(data) {
    return request.post(api.removeProjectMember, data);
}