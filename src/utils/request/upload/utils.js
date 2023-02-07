// const qiniuUploader = require("./qiniuUploader");

// /**
//  * 服务器文件上传请求
//  * @param {*} requestInfo 请求参数，会将该参数
//  * @param {*} dataFactory
//  * @returns
//  */
// export const urlUpload = function(requestInfo, dataFactory) {
//     return new Promise((resolve, reject) => {
//         // 1、删除请求头信息
//         if (requestInfo.headers["Content-Type"]) {
//             delete requestInfo.headers["Content-Type"];
//         }
//         if (requestInfo.headers["content-type"]) {
//             delete requestInfo.headers["content-type"];
//         }

//         // 2、判断文件是不是数据类型
//         if (Array.isArray(requestInfo.files)) {
//             // 请求的次数
//             const len = requestInfo.files.lenght - 1;
//             // 最终所有的请求后的数据
//             const fileList = new Array();

//             // 3、递归调用，进行文件上传
//             // 由于多端差异，使用递归单个上传，能够解决一些平台无法多文件上传的问题
//             fileUpload(0);

//             function fileUpload(i) {
//                 // 3.1从requestInfo中获取当前上传的文件信息
//                 let item = requestInfo.files[i];
//                 // 该fileData是回调成功后返回给调用者的参数，方便观看每次上传的对象，以及所有的对象
//                 let fileData = {
//                     fileIndex: i,
//                     files: requestInfo.files,
//                     ...item,
//                 };

//                 // 3.2 设置uni.uploadFile的参数
//                 // 该config是传给uni.uploadFile的参数，参考文档填写参数
//                 let config = {
//                     url: requestInfo.url,
//                     filePath: item.path,
//                     headers: requestInfo.headers,
//                     name: requestInfo.name || "file",
//                     // 3.3设置参数内的回调函数，是重点理解部分
//                     success: (response) => {
//                         if (requestInfo.isFactory && dataFactory) {
//                             // 获得请求结果后，执行外部数据处理函数
//                             dataFactory({
//                                 ...requestInfo,
//                                 response: response,
//                             }).then(
//                                 (data) => {
//                                     // 获取本次请求处理后的数据，调用单次上传的回调函数
//                                     fileList.push(data);
//                                     requestInfo.onEachUpdata &&
//                                         requestInfo.onEachUpdata({
//                                             data: data,
//                                             ...fileData,
//                                         });
//                                     // 判断是否还有未发送的请求，如果有则递归调用
//                                     if (len <= i) {
//                                         resolve(fileList);
//                                     } else {
//                                         fileUpload(i + 1);
//                                     }
//                                 },
//                                 (err) => {
//                                     reject(err);
//                                 }
//                             );
//                         } else {
//                             // 获取本次请求处理后的数据，调用单次上传的回调函数
//                             fileList.push(data);
//                             requestInfo.onEachUpdata &&
//                                 requestInfo.onEachUpdata({
//                                     data: data,
//                                     ...fileData,
//                                 });
//                             // 判断是否还有未发送的请求，如果有则递归调用
//                             if (len <= i) {
//                                 resolve(fileList);
//                             } else {
//                                 fileUpload(i + 1);
//                             }
//                         }
//                     },
//                     fail: (err) => {
//                         reject(err);
//                     },
//                 };
//                 // 3.4参数内有额外数据携带判断
//                 if (requestInfo.data) {
//                     config.formData = requestInfo.data;
//                 }

//                 // 3.5调用接口，发起文件上传
//                 const uploadTask = uni.uploadFile(config);
//                 // 3.6发起上传时会获得一个实例对象，可以调用内部方法监控上传进度
//                 uploadTask.onProgressUpdate((res) => {
//                     requestInfo.onProgressUpdate &&
//                         requestInfo.onProgressUpdate(Object.assign({}, fileData, res));
//                 });
//             }
//         } else {
//             reject({
//                 errMsg: "files 必须是数组类型",
//                 statusCode: 0,
//             });
//         }
//     });
// };

// /**
//  * 照片选择，调用uni原生接口
//  * @param {*} options 选择图片的配置
//  * @returns promise对象
//  */
// export const chooseImage = function(options) {
//     return new Promise((resolve, reject) => {
//         uni.chooseImage({
//             // 上传数量，上限为9
//             count: options.count || 9,
//             // 原图或者压缩图
//             sizeType: options.sizeType || ["original", "compressed"],
//             // 照片来源，相机和相册
//             sourceType: options.sourceType || ["album", "camera"],
//             success: (res) => {
//                 resolve(res);
//             },
//             fail: (err) => {
//                 reject({
//                     errMsg: err.errMsg,
//                     errCode: err.errCode,
//                     statusCode: 0,
//                 });
//             },
//         });
//     });
// };

// /**
//  * 视频选择，调用uni原生接口
//  * @param {*} options 选择图片的配置
//  * @returns promise对象
//  */
// export const chooseVideo = function(options) {
//     return new Promise((resolve, reject) => {
//         uni.chooseVideo({
//             //是否压缩所选的视频源文件，默认值为 true，需要压缩。
//             compressed: data.compressed || false,
//             // 照片来源，相机和相册
//             sourceType: options.sourceType || ["album", "camera"],
//             // 拍摄视频最长时长
//             maxDuration: options.maxDuration || 60,
//             // 使用前置还是后置摄像头
//             camera: options.camera || "back",
//             success: (res) => {
//                 let files = [{
//                     path: res.tempFilePath,
//                 }, ];
//                 // #ifdef APP-PLUS || H5 || MP-WEIXIN
//                 files[0].duration = res.duration;
//                 files[0].size = res.size;
//                 files[0].height = res.height;
//                 files[0].width = res.width;
//                 // #endif
//                 // #ifdef H5
//                 files[0].name = res.name;
//                 // #endif
//                 // 视频是单个，但是调用文件上传的接口必须是数组参数
//                 resolve(files);
//             },
//             fail: (err) => {
//                 reject({
//                     errMsg: err.errMsg,
//                     errCode: err.errCode,
//                     statusCode: 0,
//                 });
//             },
//         });
//     });
// };

// /**
//  * 使用七牛云上传文件
//  * @param {*} requestInfo 发送的参数配置
//  * @param {*} getQnToken 七牛云上传时需要token，对上传的地址、权限进行验证，该参数在创建实例时传入
//  * @returns
//  */
// export const qiniuUpload = function(requestInfo, getQnToken) {
//     return new Promise((resolve, reject) => {
//         // 与服务器上传对比少了一步请求头删除
//         if (Array.isArray(requestInfo.files)) {
//             let len = requestInfo.files.length;
//             let fileList = new Array();
//             if (getQnToken) {
//                 getQnToken((qnRes) => {
//                     /*
//                      *接口返回参数：
//                      *visitPrefix:访问文件的域名
//                      *token:七牛云上传token
//                      *folderPath:上传的文件夹
//                      *region: 地区 默认为：SCN
//                      */
//                     let prefixLen = qnRes.visitPrefix.length;
//                     if (qnRes.visitPrefix.charAt(prefixLen - 1) == "/") {
//                         qnRes.visitPrefix = qnRes.visitPrefix.substring(0, prefixLen - 1);
//                     }
//                     uploadFile(0);

//                     function uploadFile(i) {
//                         let item = requestInfo.files[i];
//                         // 七牛云上传文件命名
//                         let updateUrl = randomChar(10, qnRes.folderPath);
//                         let fileData = {
//                             fileIndex: i,
//                             files: requestInfo.files,
//                             ...item,
//                         };
//                         if (item.name) {
//                             fileData.name = item.name;
//                             let nameArr = item.name.split(".");
//                             updateUrl += "." + nameArr[nameArr.length - 1];
//                         }
//                         // 交给七牛上传
//                         qiniuUploader.upload(
//                             // 文件路径或者对象
//                             item.path || item,
//                             // 成功回调
//                             (res) => {
//                                 fileData.url = res.imageURL;
//                                 requestInfo.onEachUpdate &&
//                                     requestInfo.onEachUpdate({
//                                         url: res.imageURL,
//                                         ...fileData,
//                                     });
//                                 fileList.push(res.imageURL);
//                                 if (len - 1 > i) {
//                                     uploadFile(i + 1);
//                                 } else {
//                                     resolve(fileList);
//                                 }
//                             },
//                             // 失败回调
//                             (error) => {
//                                 reject(error);
//                             },
//                             // 配置
//                             {
//                                 region: qnRes.region || "SCN", //地区
//                                 domain: qnRes.visitPrefix, // bucket 域名，下载资源时用到。
//                                 key: updateUrl,
//                                 uptoken: qnRes.token, // 由其他程序生成七牛 uptoken
//                                 uptokenURL: "UpTokenURL.com/uptoken", // 上传地址
//                             },
//                             // 进度回调
//                             (res) => {
//                                 console.log(requestInfo);
//                                 requestInfo.onProgressUpdate &&
//                                     requestInfo.onProgressUpdate(
//                                         Object.assign({}, fileData, res)
//                                     );
//                                 // console.log('上传进度', res.progress)
//                                 // console.log('已经上传的数据长度', res.totalBytesSent)
//                                 // console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
//                             }
//                         );
//                     }
//                 });
//             } else {
//                 reject({
//                     errMsg: "请添加七牛云回调方法：getQnToken",
//                     statusCode: 0,
//                 });
//             }
//         } else {
//             reject({
//                 errMsg: "files 必须是数组类型",
//                 statusCode: 0,
//             });
//         }
//     });
// };

// //七牛云上传文件命名
// export const randomChar = function(l, url = "") {
//     const x = "0123456789qwertyuioplkjhgfdsazxcvbnm";
//     let tmp = "";
//     let time = new Date();
//     for (let i = 0; i < l; i++) {
//         tmp += x.charAt(Math.ceil(Math.random() * 100000000) % x.length);
//     }
//     return "file/" + url + time.getTime() + tmp;
// };