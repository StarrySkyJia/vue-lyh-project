import request from "@/utils/request";

const api = {
    getAllDict: "/dict/getAllDict",
    getAllManager: "/dict/getAllManager",
    getDictByValue: "/dict/getDictByValue",
};

/**
 * 获取所有字典集合
 * @returns
 */
export function getAllDict() {
    return request.get(api.getAllDict);
}

/**
 * 获取所有项目管理员和项目经理
 * @returns
 */
export function getAllManager() {
    return request.get(api.getAllManager);
}

/**
 * 获取指定字典的下拉选择
 * @returns
 */
export function getDictByValue(data) {
    return request.get(api.getDictByValue, data);
}