import request from "@/utils/request";

const api = {
    getFileList: "/file/getFileListByCondition",
    saveModuleFile: "/file/save",
    deleteModuleFile: "/file/delete",
};

// 查看项目模块的文件列表 condition,moduleId,pageNum,pageSize
export function getFileList(data) {
    return request.post(api.getFileList, data);
}

// 模块上传保存接口
export function saveModuleFile(data) {
    return request.post(api.saveModuleFile, data);
}

// 模块文件删除接口
export function deleteModuleFile(data) {
    return request.post(api.deleteModuleFile, data);
}