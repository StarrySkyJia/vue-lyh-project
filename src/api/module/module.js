import request from "@/utils/request";

const api = {
    getModuleList: "/module/getModuleListByCondition",
    getModuleDetail: "/module/getModuleDetail",
    addModule: "/module/create",
    deleteModule: "/module/delete",
    deleteModuleList: "/module/deleteModuleList",
    updateModule: "/module/update",
};

/**
 * 查询项目模块列表
 * @param {*} data itemId,pageNum,pageSize,moduleType,condition
 * @returns
 */
export function getModuleList(data) {
    return request.post(api.getModuleList, data);
}

/**
 * 查询模块详情
 * @param {*} moduleId 模块id
 * @returns
 */
export function getModuleDetail(moduleId) {
    return request.get(api.getModuleDetail, { moduleId });
}

/**
 * 新增项目模块
 * @param {*} data createBy ,itemId,itemName,moduleName,moduleType,moduleId,moduleUrl
 * @returns
 */
export function addModule(data) {
    return request.post(api.addModule, data);
}

/**
 * 批量删除项目模块
 * @param {*} moduleIdList
 * @returns
 */
export function deleteModuleList(moduleIdList) {
    return request.delete(api.deleteModuleList, moduleIdList);
}

/**
 * 删除项目模块
 * @param {*} moduleId
 * @returns
 */
export function deleteModule(moduleId) {
    return request.delete(api.deleteModule, { moduleId });
}

/**
 * 修改项目模块
 * @param {*} datacreateBy ,itemId,itemName,moduleName,moduleType,moduleId,moduleUrl
 * @returns
 */
export function updateModule(data) {
    return request.post(api.updateModule, data);
}