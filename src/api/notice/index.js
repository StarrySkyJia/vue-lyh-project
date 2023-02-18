import request from "@/utils/request";

const api = {
    publishNotice: "/notice/publish",
    getNoticeList: "/notice/getNoticeListByPageable",
    getNoticeDetail: "/notice/detail",
    deleteNotice: "/notice/delete",
};

/**
 * 发布公告
 * @param {*} data
 * @returns
 */
export function publishNotice(data) {
    return request.post(api.publishNotice, data);
}

/**
 * 查看公告列表
 * @param {*} data
 * @returns
 */
export function getNoticeList(data) {
    return request.post(api.getNoticeList, data);
}

/**
 * 查看公告详情
 * @param {*} data
 * @returns
 */
export function getNoticeDetail(data) {
    return request.get(api.getNoticeDetail, data);
}

/**
 * 删除公告
 * @param {*} data
 * @returns
 */
export function deleteNotice(data) {
    return request.delete(api.deleteNotice, data);
}