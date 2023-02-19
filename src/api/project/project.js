import request from "@/utils/request";

const api = {
    getMyProjList: "/item/getMyItemByCondition",
    applyIntoProj: "/item/apply",
    getApplyList: "/item/applyList",
    approvalApply: "/item/approval",
    getProjUserList: "/item/getUserListByItem",
    addUserToProj: "/item/addItemUser",
    removeUserToProj: "/item/deleteItemUser",
};

/**
 * 用户查看自己的项目空间
 * @param {*} data itemType:1：我加入的项目 2: 我管理的项目 3：企业项目列表,pageNum,pageSize,userId,condition
 *
 * @returns
 */
export function getMyProjList(data) {
    return request.post(api.getMyProjList, data);
}

/**
 * 用户申请加入项目
 * @param {*} data itemId项目id,userId用户id
 * @returns
 */
export function applyIntoProj(data) {
    return request.get(api.applyIntoProj, data);
}

/**
 * 项目经理查看申请列表
 * @param {*} data itemId项目id,userId项目经理id
 * @returns
 */
export function getApplyList(data) {
    return request.get(api.getApplyList, data);
}

/**
 * 项目经理审批加入项目申请
 * @param {*} data itemId项目id,userId用户id，status审批状态
 * @returns
 */
export function approvalApply(data) {
    return request.get(api.approvalApply, data);
}

/**
 * 分页查看项目成员
 * @param {*} data itemId项目id,pageNum,pageSize
 * @returns
 */
export function getProjUserList(data) {
    return request.post(api.getProjUserList, data);
}

/**
 * 添加用户到项目
 * @param {*} data itemId项目id,itemName项目名称,memberSets成员列表
 * @returns
 */
export function addUserToProj(data) {
    return request.post(api.addUserToProj, data);
}

/**
 * 移除成员出项目
 * @param {*} data itemId项目id,itemName项目名称,memberSets成员列表
 * @returns
 */
export function removeUserToProj(data) {
    return request.post(api.removeUserToProj, data);
}