<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action
      :http-request="handleUpload"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-remove="beforeRemove"
      multiple
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import { put } from "@/utils/oss-ali.js";
export default {
  data() {
    return {
      imageUrl: "",
      fileList: [],
    };
  },
  methods: {
    handleRemove(file, fileList) {
      this.$emit("on-remove", file, fileList);
    },
    handlePreview(file) {
      this.$emit("on-preview", file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleSuccess(response, file, fileList) {
      this.fileList = fileList;
      this.$emit("on-success", file, fileList);
    },
    /**
     * 自定义上传方法
     */
    handleUpload(option) {
      // 生成的文件名称
      //   let objName = getFileNameUUID()

      // 调用 ali-oss 中的方法
      put(option.file.name, option.file).then((res) => {
        this.imageUrl = res.url;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
::v-deep .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
