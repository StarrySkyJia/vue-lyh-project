import request from "@/utils/request";

const api = {
    getMessageList: "/message/list",
    readMessage: "/message/read",
    deleteMessage: "/message/delete",
    removeBatchMessage: "/message/removeBatch",
};

/**
 * 用户查看自己的消息列表
 * @param {*} data
 * @returns
 */
export function getMessageList(data) {
    return request.post(api.getMessageList, data);
}

/**
 * 读取消息[选择我已阅读标记为已读]
 * @param {*} messageId
 * @returns
 */
export function readMessage(messageId) {
    return request.get(api.readMessage, { messageId });
}

/**
 * 读取消息[选择我已阅读标记为已读]
 * @param {*} messageId
 * @returns
 */
export function deleteMessage(messageId) {
    return request.delete(api.deleteMessage, { messageId });
}

/**
 * 清空已读消息
 * @param {*} userId
 * @returns
 */
export function removeBatchMessage(userId) {
    return request.delete(api.removeBatchMessage, { userId });
}