import { mergeConfig, jsonpRequest, dispatchRequest } from "./utils";
// 基础的请求功能封装类
export default class Request {
    // 构造函数
    constructor(options) {
        // 公共请求地址
        this.baseUrl = options.baseUrl || "";
        // 公共文件上传请求地址
        this.fileUrl = options.fileUrl || "";
        // 超时时间
        this.timeout = options.timeout || "";
        // 服务器视频、图片上传默认地址
        this.defaultUploaderUrl = options.defaultUploaderUrl || "";
        // 默认请求头
        this.headers = options.headers;
        // 默认配置：是否超时提示、是否加载、是否调用外部处理函数
        this.config = options.config || {
            isPrompt: true,
            load: true,
            isFactory: true,
            isTimestamp: false,
            resend: 0,
        };
    }

    // 网络请求
    async request(data) {
        // 1、对参数进行验证
        //      请求合并参数
        let requestInfo = null;
        //      请求运行记录参数，false为运行
        let runRequestStart = false;
        try {
            // 必要参数url验证
            if (!data.url) {
                throw {
                    errMsg: "request请求缺失url地址",
                    statusCode: 0,
                };
            }

            // 2、参数合并-将额外参数和实例属性合并
            requestInfo = mergeConfig(this, data);
            // 运行记录，已运行到此处
            runRequestStart = true;

            // 3、请求前拦截器,请求前拦截器函数，创建实例时$http.requestStart传入
            // 传入合并数据，进行一些数据再处理
            if (this.requestStart) {
                let requestStart = this.requestStart(requestInfo);
                if (typeof requestStart == "object") {
                    // 拦截器对这些进行了操作
                    let changeKeys = ["data", "headers", "isPrompt", "load", "isFactory"];
                    changeKeys.forEach((key) => {
                        requestInfo[key] = requestStart[key];
                    });
                } else {
                    throw {
                        errMsg: "request拦截器未通过",
                        statusCode: 0,
                        data: requestInfo.data,
                        method: requestInfo.method,
                        headers: requestInfo.headers,
                        url: requestInfo.url,
                    };
                }
            }

            // 4、请求，得到结果
            // requestResult请求返回数据，requestInfo请求最终参数
            let requestResult = {};
            if (requestInfo.method == "JSONP") {
                requestResult = await jsonpRequest(requestInfo);
            } else {
                requestResult = await dispatchRequest(requestInfo);
            }
            // 5、外部处理函数
            if (requestInfo.isFactory && this.dataFactory) {
                // 采用外部函数处理数据
                let result = await this.dataFactory({
                    ...requestInfo,
                    response: requestResult,
                });
                return Promise.resolve(result);
            } else {
                // 不采用外部函数处理
                return Promise.resolve(requestResult);
            }
        } catch (error) {
            // 在处理以上步骤时发生报错，调用$http定义的报错回调函数
            this.requestError && this.requestError(error);
            return Promise.reject(error);
        } finally {
            // 只有真正发送了请求（即使失败），才会调用终结函数，同样也是$http定义
            if (runRequestStart) {
                this.requestEnd && this.requestEnd(requestInfo);
            }
        }
    }

    // 以下是基于request封装的请求方法
    // get请求
    get(url = "", data = {}, options = {}) {
            return this.request({
                method: "GET",
                url,
                data,
                ...options,
            });
        }
        // post请求
    post(url = "", data = {}, options = {}) {
        return this.request({
            method: "POST",
            url,
            data,
            ...options,
        });
    }

    // post请求
    put(url = "", data = {}, options = {}) {
        return this.request({
            method: "PUT",
            url,
            data,
            ...options,
        });
    }

    // delete
    delete(url = "", data = {}, options = {}) {
        return this.request({
            method: "DELETE",
            url,
            data,
            ...options,
        });
    }

    // jsonp请求，H5专属
    jsonp(url = "", data = {}, options = {}) {
        return this.request({
            method: "JSONP",
            url,
            data,
            ...options,
        });
    }
}