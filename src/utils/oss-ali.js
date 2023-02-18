import OSS from "ali-oss";
const dayjs = require("dayjs");

const client = new OSS({
    region: "oss-cn-guangzhou",
    //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
 
});

/**
 *  上传文件，大小不能超过5GB
 * @param {string} filePath OSS的储存路径
 * @param {object} file 本地文件
 * @retruns Promise
 */
export const put = async(filePath, file) => {
    try {
        // 文件在oss云端的名称，为了防止同名覆盖，添加时间戳作为唯一辨识
        const point = file.name.lastIndexOf(".");
        let suffix = file.name.substr(point);
        let fileName = file.name.substr(0, point);
        let date = dayjs(new Date().getTime()).format("YYYYMMDDHHmm");
        let ossFileName = `${fileName}_${date}${suffix}`;

        // filePath为在oss云端的存储地址，ossFileName是在oss的文件名，与前端页面展示的文件无关
        let result = await client.put(`${filePath}/${ossFileName}`, file);
        // file.name就是本地文件的名称
        return {...result, fileName: file.name };
    } catch (e) {
        console.log(e);
    }
};

/**
 *  下载文件，使用Blob类型对get到的数据进行转换，使用a标签进行下载
 * @param {string} filePath OSS的储存路径,即文件夹的地址/文件在oss的名称
 * @param {string} fileName 文件下载后的名字
 * @retruns Promise
 */
export const get = async(filePath, fileName) => {
    try {
        const result = await client.get(filePath);
        // 获取blob数据流进行转换
        const blob = new Blob([result.content], {
            type: result.res.headers["content-type"],
        });

        // 创建a标签进行文件下载
        const eleA = document.createElement("a");
        eleA.download = fileName;
        eleA.style.display = "none";
        eleA.href = URL.createObjectURL(blob);
        document.body.appendChild(eleA);
        eleA.click();
        URL.revokeObjectURL(eleA.href); //释放URL对象
        document.body.removeChild(eleA);
        return result;
    } catch (e) {
        console.log(e);
    }
};

export const getBlob = async(filePath) => {
    try {
        const result = await client.get(filePath);
        // 获取blob数据流进行转换
        const blob = new Blob([result.content], {
            type: result.res.headers["content-type"],
        });
        return result;
    } catch (e) {
        console.log(e);
    }
};

/**
 *  signatureUrl下载文件，直接使用url结合a标签进行下载
 * @param {string} filePath OSS的储存路径,即文件夹的地址/文件在oss的名称
 * @param {string} fileName 文件下载后的名字
 * @retruns Promise
 */
export const download = async(filePath, fileName) => {
    try {
        const response = {
            "content-disposition": `attachment; filename=${decodeURIComponent(
        fileName
      )}`,
        };

        // 创建a标签，下载后卸载a标签
        const url = await client.signatureUrl(filePath, { response });
        const a = document.createElement("a");
        a.download = decodeURIComponent(fileName);
        a.href = url;
        a.style.display = "none";
        document.body.appendChild(a);
        a.click();
        a.remove();

        return url;
    } catch (e) {
        console.log(e);
    }
};

/**
 *  分片文件
 * @param {string} filePath OSS的储存路径
 * @param {string} ObjName 文件名字
 * @param {object} file 本地文件
 * @retruns Promise
 */
export const multipartUpload = async(filePath, ObjName, file) => {
    try {
        let result = await client.multipartUpload(`${filePath}/${ObjName}`, file);
        // AAA为文件夹， ObjName为文件名字,可以只写名字，就直接储存在 bucket 的根路径

        return result;
    } catch (e) {
        console.log(e);
    }
};
