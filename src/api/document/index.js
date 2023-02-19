import request from "@/utils/request";

const api = {
    getDocList: "/document/queryListByCondition",
    getDocDetail: "/document/queryDocumentDetailById",
    addDocument: "/document/create",
    deleteDocument: "/document/deleteList",
    updateDocument: "/document/update",
};

/**
 * 获取文档列表
 */
export function getDocList(data) {
    return request.post(api.getDocList, data);
}

/**
 * 获取文档列详情
 */
export function getDocDetail(data) {
    return request.get(api.getDocDetail, data);
}

/**
 * 添加新文档
 */
export function addDocument(data) {
    return request.post(api.addDocument, data);
}

/**
 * 删除文档
 */
export function deleteDocument(data) {
    return request.post(api.deleteDocument, data);
}

/**
 * 修改文档
 */
export function updateDocument(data) {
    return request.post(api.updateDocument, data);
}