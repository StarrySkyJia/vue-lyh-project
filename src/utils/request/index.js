import { Request } from "./requestClasses";
const apiUrl = "http://120.78.88.135:8080";
import { Loading, Message, MessageBox } from "element-ui";

// const apiUrl = "http://localhost:3000";
import storage from "../storage";
const $http = new Request({
    baseUrl: apiUrl,
    fileUrl: apiUrl,
    defaultUploaderUrl: "upload/image",
    timeout: 10000,
    headers: {
        "content-type": "application/json;charset=utf-8",
    },
    config: {
        // 是否自动提示错误
        isPrompt: true,
        // 是否显示加载动画
        load: false,
        // 是否使用外部数据处理
        isFactory: true,
        // 是否需要时间戳防止数据缓存
        isTimestamp: true,
    },
});

// 闭包变量-用于加载动画判断
// 该变量记录请求的个数，如果有多个请求，即使先完成一部分，加载动画仍存在
let requestNum = 0;

// 设置拦截器
$http.requestStart = (options) => {
    // 设置加载动画
    if (options.load) {
        if (requestNum <= 0) {
            Loading.service({
                text: "正在加载中",
                fullscreen: true,
            });
        }
        // 请求数量+1
        requestNum += 1;
    }

    // 需要时间戳，说明数据不需要缓存获取，网易云api有两分钟的数据缓存
    // 即两分钟中内数据相同的请求会缓存相同的响应数据
    if (options.isTimestamp) {
        const timestamp = new Date().getTime();
        options.data.timestamp = timestamp;
    }

    // 文件上传限制拦截
    if (options.method == "FILE" && options.maxSize) {
        const maxSize = options.maxSize;
        for (const item of options.files) {
            if (item.size > maxSize) {
                setTimeout(() => {
                    Message({
                        message: "文件过大，请重新选择",
                    });
                }, 10);
                // return false 表示请求拦截，不会继续请求
                return false;
            }
        }
    }

    // 请求前加入Token
    options.headers["Access-Token"] = storage.get("ACCESS_TOKEN");
    options.headers["authorization"] = storage.get("ACCESS_TOKEN");

    return options;
};

// 当前是否显示modal-弹窗
let loginModal = false;

// 设置数据处理函数
// uni.request返回的数据，即res.respone
// data	Object/String/ArrayBuffer	开发者服务器返回的数据
// status	Number	开发者服务器返回的 HTTP 状态码
// headers	Object	开发者服务器返回的 HTTP Response Header
// cookies	Array.<string>	开发者服务器返回的 cookies，格式为字符串数组
$http.dataFactory = (res) => {
    // 判断后端返回的状态码，需要跟后端协商
    if (!res.response.status || res.response.status != 200) {
        return Promise.reject({
            status: res.response.status,
            // errMsg: "http状态码错误",
            errMsg: res.response.data.message,
        });
    }

    // 纯后端返回的数据，脱离了requestInfo参数
    let httpData = res.response.data;

    // 判断后端返回的数据格式
    // jsnop格式
    if (typeof httpData === "string") {
        try {
            httpData = JSON.parse(httpData);
        } catch (error) {
            httpData = false;
        }
    }
    // 数据不存在，数据格式有误
    if (httpData === false || typeof httpData !== "object") {
        return Promise.reject({
            status: res.response.status,
            errMsg: "请检查api地址能否正常访问",
        });
    }

    // ！！！基础模板，根据不同的后端进行接口返回类型修改！！！//
    // 状态 200：请求成功 500：有错误 401：未登录 403：没有登录权限
    if (httpData.code == 200) {
        // return Promise.resolve(httpData);
        return Promise.resolve(httpData.data);
    }

    // 401未登录，在此处进行登录跳转
    if (httpData.code === 401) {
        // 401也可能是登录过期了，如果本地仓库有存储信息，则需要调用清除用户信息的action
        // store.dispatch('Logout')

        // 弹窗提示，登录跳转
        if (!loginModal) {
            loginModal = true;
            MessageBox({
                title: "温馨提示",
                message: "需要用户登录",
                confirmButtonText: "去登陆",
                cancelButtonText: "暂不登录",
                callback: (action, instance) => {
                    if (action === "confirm") {
                        // 去登陆，跳转到登录界面
                        instance.close();
                    } else if (action === "cancel") {
                        // 暂不登录，返回上一页
                    }
                },
            });
        }

        // 返回错误的结果(catch接受数据)
        return Promise.reject({
            status: 0,
            errMsg: httpData.message,
            result: httpData,
        });
    }

    // 500服务器错误，其他错误提示
    if (httpData.code == 500) {
        if (res.isPrompt) {
            setTimeout(() => {
                Message.error({
                        message: httpData.message,
                    },
                    10
                );
            });
        }
        // 返回错误的结果(catch接受数据)
        return Promise.reject({
            status: 0,
            errMsg: httpData.message,
            result: httpData,
        });
    }
    if (httpData.status == 503) {
        if (res.isPrompt) {
            setTimeout(() => {
                Message({
                        message: httpData.message,
                    },
                    10
                );
            });
        }
        // 返回错误的结果(catch接受数据)
        return Promise.reject({
            status: 0,
            errMsg: httpData.message,
            result: httpData,
        });
    }
};

// 错误信息提示
const showRequestError = (e) => {
    // let errMsg = "网络请求出错:" + e.errMsg;
    let errMsg = e.errMsg;
    // #ifdef MP-WEIXIN
    if (e.errMsg === "request:fail url not in domain list") {
        errMsg = "当前API域名未添加到微信小程序授权名单 " + e.errMsg;
    }
    // #endif
    if (e.errMsg === "request:fail") {
        errMsg = "网络请求错误：请检查api地址能否访问正常";
    }
    Message({
        message: errMsg,
    });
};

// 报错回调
$http.requestError = (error) => {
    // 如果是0错误，那么将数据返回给调用时处理;
    if (error.status === 0) {
        throw error;
    } else if (error.status === 10000) {
        Message.error({
            message: error.errMsg,
        });
    } else {
        // 如果不是0错误，则进行错误信息展示
        setTimeout(() => showRequestError(error), 10);
    }
};

// 请求终止，加载动画关闭
$http.requestEnd = (options) => {
    if (options.load) {
        requestNum = requestNum - 1;
        if (requestNum <= 0) {
            const LoadingInstance = Loading.service({
                text: "正在加载中",
                fullscreen: true,
            });
            LoadingInstance.close();
        }
    }
};

export default $http;