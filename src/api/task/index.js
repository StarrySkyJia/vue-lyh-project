import request from "@/utils/request";

const api = {
    getTaskLobbyList: "/task/hall",
    receiveTask: "/task/receive",
    publishTask: "/task/publish",
    updateTask: "/task/update",
    updateTaskStatus: "/task/updateStatus",
    getTasksByCondition: "/task/getTasksByCondition",
    getTaskDetail: "/task/detail",
    deleteBatchTask: "/task/deleteBatch",
};

/**
 * 任务大厅查看未被接单的任务
 * @param {*} data moduleId,pageNum,pageSize,condition
 * @returns
 */
export function getTaskLobbyList(data) {
    return request.post(api.getTaskLobbyList, data);
}

/**
 * 任务接单
 * @param {*} moduleId taskId,userId,realName
 * @returns
 */
export function receiveTask(data) {
    return request.post(api.receiveTask, data);
}

/**
 * 发布任务
 * @param {*} data
 * @returns
 */
export function publishTask(data) {
    return request.post(api.publishTask, data);
}

/**
 * 修改任务信息
 * @param {*} data
 * @returns
 */
export function updateTask(data) {
    return request.post(api.updateTask, data);
}

/**
 * 修改任务处理状态[处理任务]
 * @param {*} data
 * @returns
 */
export function updateTaskStatus(data) {
    return request.post(api.updateTaskStatus, data);
}

/**
 * 按条件搜索任务
 * @param {*} data
 * @returns
 */
export function getTasksByCondition(data) {
    return request.post(api.getTasksByCondition, data);
}

/**
 * 查看任务详情
 * @param {*} data
 * @returns
 */
export function getTaskDetail(data) {
    return request.get(api.getTaskDetail, data);
}

/**
 * 删除任务
 * @param {*} data
 * @returns
 */
export function deleteBatchTask(data) {
    return request.delete(api.deleteBatchTask, data);
}