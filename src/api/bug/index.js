import request from "@/utils/request";

const api = {
    getBugLobbyList: "/bug/hall",
    receiveBug: "/bug/receive",
    publishBug: "/bug/create",
    updateBug: "/bug/update",
    updateBugStatus: "/bug/updateStatus",
    getBugsByCondition: "/bug/getBugListByCondition",
    getBugDetail: "/bug/detail",
    deleteBatchBug: "/bug/deleteBatch",
};

/**
 * 缺陷大厅查看未被接单的缺陷
 * @param {*} data moduleId,pageNum,pageSize,condition
 * @returns
 */
export function getBugLobbyList(data) {
    return request.post(api.getBugLobbyList, data);
}

/**
 * 缺陷接单
 * @param {*} moduleId
 * @returns
 */
export function receiveBug(data) {
    return request.post(api.receiveBug, data);
}

/**
 * 发布缺陷
 * @param {*} data
 * @returns
 */
export function publishBug(data) {
    return request.post(api.publishBug, data);
}

/**
 * 修改缺陷信息
 * @param {*} data
 * @returns
 */
export function updateBug(data) {
    return request.post(api.updateBug, data);
}

/**
 * 修改缺陷处理状态[处理缺陷]
 * @param {*} data
 * @returns
 */
export function updateBugStatus(data) {
    return request.post(api.updateBugStatus, data);
}

/**
 * 按条件搜索缺陷
 * @param {*} data
 * @returns
 */
export function getBugsByCondition(data) {
    return request.post(api.getBugsByCondition, data);
}

/**
 * 查看缺陷详情
 * @param {*} data
 * @returns
 */
export function getBugDetail(data) {
    return request.get(api.getBugDetail, data);
}

/**
 * 删除缺陷
 * @param {*} data
 * @returns
 */
export function deleteBatchBug(data) {
    return request.delete(api.deleteBatchBug, data);
}