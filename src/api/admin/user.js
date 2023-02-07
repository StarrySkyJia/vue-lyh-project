import request from "@/utils/request";

const api = {
    addUser: "/register/user",
    getUserList: "/user/getUsersByCondition",
    updateUser: "/user/edit",
    getUserDetail: "/user/getUserDetailById",
    changeUserState: "/user/changeStatus",
    updatePassword: "/user/updatePassword",
};

//新增用户
export function addUser(data) {
    return request.post(api.addUser, data);
}

// 获取用户列表
export function getUserList(data) {
    return request.post(api.getUserList, data);
}

//修改用户状态(禁用和启用状态的相互转换)
export function changeUserState(userId) {
    return request.get(api.changeUserState, { userId });
}

//修改用户信息
export function updateUser(data) {
    return request.post(api.updateUser, data);
}

//获取用户信息
export function getUserDetailInfo(data) {
    return request.get(api.getUserDetail, data);
}

//修改用户密码
export function updatePassword(data) {
    return request.get(api.updatePassword, data);
}