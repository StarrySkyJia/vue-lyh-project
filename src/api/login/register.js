import request from "@/utils/request";

const api = {
    register: "/register/user",
};

// 获取验证码
export function registerUser(data) {
    return request.post(api.register, data);
}