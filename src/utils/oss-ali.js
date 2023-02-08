import OSS from "ali-oss";
const client = new OSS({
    region: "oss-cn-guangzhou",
    //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
    accessKeyId: "LTAI5tMCdmfm9ZJnk1Bs4LSE",
    accessKeySecret: "2Nznq9e9xVQ3KfPSu2Sz7W7vKI5OwA",
    bucket: "image-url-lyh",
});

/**
 *  上传文件，大小不能超过5GB
 * @param {string} filePath OSS的储存路径
 * @param {string} ObjName 文件名字
 * @param {object} file 本地文件
 *
 * @retruns Promise
 */
export const put = async(filePath, ObjName, file) => {
    try {
        let result = await client.put(`${filePath}/${ObjName}`, file);
        // AAA为文件夹， ObjName为文件名字,可以只写名字，就直接储存在 bucket 的根路径
        return result;
    } catch (e) {
        console.log(e);
    }
};