import axios from "axios";
/**
 * 获取合并数据
 * @param {*} _this 请求实例对象
 * @param {*} options 封装成get、post时调用request传入的参数，包括data、methods、url和option
 * @return 返回合并后的数据对象
 */
export const mergeConfig = (_this, options) => {
    // 判断url是不是链接， 如果不是链接就进行拼接
    const urlType = /^(http|https):\/\//.test(options.url);
    // 将超时、默认配置和具体接口调用时传入的配置合并到一起
    let config = Object.assign({ timeout: _this.timeout }, _this.config, options);

    //url设置： 如果是文件上传，则调用文件上传的url，否则调用公共请求的url
    if (options.method == "FILE") {
        config.url = urlType ? options.url : _this.fileUrl + options.url;
    } else {
        config.url = urlType ? options.url : _this.baseUrl + options.url;
    }

    // 请求头设置：判断是否有自定义的请求头
    if (options.headers) {
        config.headers = Object.assign({}, _this.headers, options.headers);
    } else {
        config.headers = Object.assign({}, _this.headers);
    }

    return config;
};

/**
 * 调用uni.request的网络请求
 * @param {*} requestInfo 请求参数
 * @returns 返回promise对象，数据为向后端请求得到的数据
 */
export const dispatchRequest = (requestInfo) => {
    return new Promise((resolve, reject) => {
        // 请求中断标识，通过和setTimeout结合，进行超时终中止
        let requestAbort = true;
        const controller = new AbortController();
        // 该参数是uni.request的参数，参考官网继续进行规范
        let requestData = {
            url: requestInfo.url,
            headers: requestInfo.headers,
        };

        // 根据官方文件 以及 设配多端请求，继续细化requestData参数
        // 具体文档：https://uniapp.dcloud.net.cn/api/request/request.html#request
        if (requestInfo.method) {
            requestData.method = requestInfo.method;
        }
        // 数据，根据get和post的不同
        if (requestInfo.data) {
            // requestInfo.data.signal = controller.signal;
            if (requestData.method === "GET" || requestData.method === "DELETE") {
                requestData.params = requestInfo.data;
            } else {
                requestData.data = requestInfo.data;
            }
        }
        //  MP-WEIXIN || MP-ALIPAY 超时时间，单位 ms
        if (requestInfo.timeout) {
            requestData.timeout = requestInfo.timeout;
        }
        //  如果设为 json，会尝试对返回的数据做一次 JSON.parse
        if (requestInfo.dataType) {
            requestData.dataType = requestInfo.dataType;
        }
        //  APP-PLUS || MP-ALIPAY 设置响应的数据类型。合法值：text、arraybuffer
        if (requestInfo.responseType) {
            requestData.responseType = requestInfo.responseType;
        }
        //  H5 跨域请求时是否携带凭证（cookies）
        if (requestInfo.withCredentials) {
            requestData.withCredentials = requestInfo.withCredentials;
        }
        // sslVerify 验证 ssl 证书，仅App安卓端支持
        if (requestInfo.sslVerify) {
            requestData.sslVerify = requestInfo.sslVerify;
        }

        // uni请求-返回一个对象，可对请求进行中断
        axios
            .request(requestData)
            .then((res) => {
                // 成功回调，在请求成功会uni会执行该函数
                // 设置为false，不执行中断
                requestAbort = false;
                // res为后端返回数据
                resolve(res);
            })
            .catch((err) => {
                requestAbort = false;
                // 跟后端沟通请求信息类型
                if (err) {
                    reject({
                        errMsg: "请求超时，请重新尝试",
                        status: 10000,
                    });
                } else {
                    reject(err);
                }
            });

        // requestAbort结合定时器，如果在超时之前，请求到了或者请求失败了，就不会中断
        setTimeout(() => {
            if (requestAbort) {
                controller.abort();
            }
        }, requestInfo.timeout);
    });
};

/**
 * jsonp请求，该请求是通过将数据拼接到标签的src路径中进行请求的
 * @param {*} requestInfo 请求参数
 * @returns 返回promise对象，数据为向后端请求得到的数据
 */

export const jsonpRequest = (requestInfo) => {
    return new Promise((resolve) => {
        let dataStr = "";
        Object.keys(requestInfo.data).forEach((key) => {
            dataStr += key + "=" + requestInfo.data[key] + "&";
        });
        if (dataStr !== "") {
            dataStr = dataStr.substring(0, dataStr.lastIndexOf("&"));
        }
        requestInfo.url = requestInfo.url + "?" + dataStr;

        let callbackName = "callback" + Math.ceil(Math.random() * 1000000);
        // if h5
        window[callbackName] = (data) => {
            resolve(data);
        };
        let script = document.createElement("script");
        script.src = requestInfo.url + "&callback" + callbackName;
        document.head.appendChild(script);
        // 及时删除，防止加载过多的JS
        document.head.removeChild(script);
        // endif h5
    });
};