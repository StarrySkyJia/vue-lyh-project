import request from "@/utils/request";

const api = {
    addComment: "/comment/add",
    deleteComment: "/comment/delete",
};

/**
 * 新增评论接口
 * @param {*} data
 * @returns
 */
export function addComment(data) {
    return request.post(api.addComment, data);
}
/**
 * 新增评论接口
 * @param {*} data
 * @returns
 */
export function deleteComment(data) {
    return request.delete(api.deleteComment, data);
}