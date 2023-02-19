import request from "@/utils/request";

const api = {
    getProjStatistics: "/statistics/item",
    getUserStatistics: "/statistics/person",
    getUserDetailStatistics: "/statistics/task/detail",
    getAllUserStatictiscs: "/statistics/task/list",
};

/**
 * 项目经理查看近端时间的任务、缺陷清空【项目统计】z
 * @param {*} data itemId
 * @returns
 */
export function getProjStatistics(itemId) {
    return request.get(api.getProjStatistics, { itemId });
}

/**
 * 用户查看自己近段时间的任务、缺陷情况【个人统计】
 * @param {*} data itemId
 * @returns
 */
export function getUserStatistics(data) {
    return request.post(api.getUserStatistics, data);
}

/**
 * 查看项目具体成员的项目情况
 * @param {*} data itemId
 * @returns
 */
export function getUserDetailStatistics(data) {
    return request.post(api.getUserDetailStatistics, data);
}

/**
 * 管理员查看项目所有成员的项目情况
 * @param {*} data itemId
 * @returns
 */
export function getAllUserStatictiscs(data) {
    return request.post(api.getAllUserStatictiscs, data);
}