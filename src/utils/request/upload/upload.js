import Request from "../core/request";
import { mergeConfig } from "../core/utils";
import { urlUpload, chooseImage, chooseVideo, qiniuUpload } from "./utils";

export default class fileUpload extends Request {
    // 继承基础网络请求的数据
    constructor(props) {
        super(props);
    }

    // 服务器上传文件，图片和视频上传都是基于文件上传
    async urlFileUpload() {
        // 1、参数校验
        // 因为上传时，可能用的是同一个服务器的默认地址，也可能用的是不用地址，或者不同服务器，所以需要区分判断
        // 所以第一个参数可能有或者没有，需要函数不写死形参，而是使用arguments来获取参数
        let requestInfo = {
            method: "FILE",
        };

        // 判断第一个参数
        if (arguments[0]) {
            if (typeof arguments[0] === "string") {
                // 第一个参数为字符串时，说明指定了url，则给requestInfo赋值url
                // 在后面再将其他配置和requestInfo进行合并
                requestInfo.url = arguments[1].url;
            } else if (typeof arguments[0] === "object") {
                // 第一个参数是对象,说明使用默认的服务器地址,直接将requestInfo信息赋值
                requestInfo = Object.assign(requestInfo, arguments[0]);
            }
        }

        // 判断第二个参数
        if (arguments[1] && typeof arguments[1] === "object") {
            requestInfo = Object.assign(requestInfo, arguments[1]);
        }

        // 如果没有url，则使用创建实例时的默认地址
        if (!requestInfo.url && this.defaultUploaderUrl) {
            requestInfo.url = this.defaultUploaderUrl;
        }

        // 运行位置变量
        let runRequestStart = false;
        try {
            if (!requestInfo.url) {
                throw {
                    errMsg: "【request】文件上传缺失数据url",
                    statusCode: 0,
                    data: requestInfo.data,
                    method: requestInfo.method,
                    headers: requestInfo.headers,
                    url: requestInfo.url,
                };
            }

            // 2、数据合并
            requestInfo = mergeConfig(this, requestInfo);
            runRequestStart = true;

            // 3、调用前拦截器执行
            if (this.requestStart) {
                let requestStart = this.requestStart(requestInfo);
                if (typeof requestStart === "object") {
                    const changeKeys = [
                        "data",
                        "headers",
                        "isPrompt",
                        "load",
                        "isFactory",
                        "files",
                    ];
                    changeKeys.forEach((key) => {
                        requestInfo[key] = requestStart[key];
                    });
                } else {
                    throw {
                        errMsg: "【request】请求开始拦截器未通过",
                        statusCode: 0,
                        data: requestInfo.data,
                        method: requestInfo.method,
                        headers: requestInfo.headers,
                        url: requestInfo.url,
                    };
                }
            }

            // 4、上传文件，获得数据-与基本请求不同，这里将dataFactory传入到请求中执行了
            let requestResult = await urlUpload(requestInfo, this.dataFactory);
            return Promise.resolve(requestResult);
        } catch (error) {
            // 5、异常报错回调
            this.requestError && this.requestError(error);
            return Promise.reject(error);
        } finally {
            // 6、终止回调
            if (runRequestStart) {
                this.requestEnd && this.requestEnd(requestInfo);
            }
        }
    }

    // 服务器上传图片
    async urlImageUpload() {
        let options = {};
        if (arguments[0]) {
            if (typeof arguments[0] === "string") {
                options.url = arguments[0];
            } else if (typeof arguments[0] === "object") {
                options = Object.assign(options, arguments[0]);
            }
        }
        if (arguments[1] && typeof arguments[1] === "object") {
            options = Object.assign(options, arguments[0]);
        }

        try {
            options.files = await chooseImage(options);
            // 完成选择回调
            options.onSelectComplete && options.onSelectComplete(options.files);
        } catch (error) {
            this.requestError && this.requestError(error);
            return Promise.reject(error);
        }

        if (options.files) {
            this.urlFileUpload(options);
        }
    }

    // 服务器上传视频
    async urlVideoUpload() {
        let options = {};
        if (arguments[0]) {
            if (typeof arguments[0] === "string") {
                options.url = arguments[0];
            } else if (typeof arguments[0] === "object") {
                options = Object.assign(options, arguments[0]);
            }
        }
        if (arguments[1] && typeof arguments[1] === "object") {
            options = Object.assign(options, arguments[0]);
        }

        try {
            options.files = await chooseVideo(options);
            // 完成选择回调
            options.onSelectComplete && options.onSelectComplete(options.files);
        } catch (error) {
            this.requestError && this.requestError(error);
            return Promise.reject(error);
        }

        if (options.files) {
            this.urlFileUpload(options);
        }
    }

    //七牛云文件上传（支持多张上传）
    async qnFileUpload(options = {}) {
        let requestInfo;
        try {
            // 数据合并
            requestInfo = {
                ...this.config,
                ...options,
                headers: {},
                method: "FILE",
            };
            //请求前回调
            if (this.requestStart) {
                let requestStart = this.requestStart(requestInfo);
                if (typeof requestStart == "object") {
                    let changekeys = ["load", "files"];
                    changekeys.forEach((key) => {
                        requestInfo[key] = requestStart[key];
                    });
                } else {
                    throw {
                        errMsg: "【request】请求开始拦截器未通过",
                        statusCode: 0,
                        data: requestInfo.data,
                        method: requestInfo.method,
                        headers: requestInfo.headers,
                        url: requestInfo.url,
                    };
                }
            }
            let requestResult = await qiniuUpload(requestInfo, this.getQnToken);
            return Promise.resolve(requestResult);
        } catch (err) {
            this.requestError && this.requestError(err);
            return Promise.reject(err);
        } finally {
            this.requestEnd && this.requestEnd(requestInfo);
        }
    }

    //七牛云上传图片
    async qnImgUpload(options = {}) {
        let files;
        try {
            files = await chooseImage(options);
            // 选择完成回调
            options.onSelectComplete && options.onSelectComplete(files);
        } catch (err) {
            this.requestError && this.requestError(err);
            return Promise.reject(err);
        }
        if (files) {
            return this.qnFileUpload({
                ...options,
                files: files,
            });
        }
    }

    //七牛云上传视频
    async qnVideoUpload(options = {}) {
        let files;
        try {
            files = await chooseVideo(options);
            // 选择完成回调
            options.onSelectComplete && options.onSelectComplete(files);
        } catch (err) {
            this.requestError && this.requestError(err);
            return Promise.reject(err);
        }
        if (files) {
            return this.qnFileUpload({
                ...options,
                files: files,
            });
        }
    }
}