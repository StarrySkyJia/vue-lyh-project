import request from "@/utils/request";

const api = {
    getCaptcha: "/login/send",
    phoneLogin: "/login/loginByTel",
    passwordLogin: "/login/loginByPassword",
    getUserId: "/login/getUserId",
    getRealName: "/login/getRealName",
};

// 获取验证码
export function getCaptcha(phone) {
    return request.get(api.getCaptcha, { phone }, { load: false });
}

/**
 * 手机登录
 * @param {*} data code验证阿妈，phone手机号
 * @returns
 */
export function phoneLogin(data) {
    return request.post(api.phoneLogin, data, { load: false });
}

/**
 * 密码登录
 * @param {*} data password密码，userNo账号
 * @returns
 */
export function passwordLogin(data) {
    return request.post(api.passwordLogin, data, { load: false });
}

/**
 * 通过token获取用户id
 * @param {*} token
 * @returns
 */
export function getUserIdByToken(token) {
    return request.post(api.getUserId, { token });
}

/**
 * 通过token获取用户真实姓名
 * @param {*} token
 * @returns
 */
export function getUserNameByToken(token) {
    return request.post(api.getRealName, { token });
}