const validatePhone = (rule, value, callback) => {
    var reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
    if (reg.test(value)) {
        callback();
    } else {
        callback(new Error("请输入正确的手机号"));
    }
};

export const rules = {
    realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
    userNo: [{ required: true, message: "请输入账号", trigger: "blur" }],
    password: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 3, message: "密码长度不能少于 3 个字符", trigger: "blur" },
    ],
    phone: [
        { required: true, message: "请输入手机号", trigger: "blur" },
        { validator: validatePhone, trigger: "blur" },
    ],
    code: [{ required: true, message: "请输入验证码", trigger: "blur" }],
    gender: [{ required: true, message: "请选择性别", trigger: "change" }],
};