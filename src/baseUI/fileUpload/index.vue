<template>
  <div>
    <el-upload
      class="upload-demo"
      drag
      action
      :http-request="handleUpload"
      :on-success="handleSuccess"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <div class="el-upload__tip" slot="tip">
        <!-- 只能上传jpg/png文件，且不超过500kb -->
      </div>
    </el-upload>
  </div>
</template>

<script>
import { put } from "@/utils/oss-ali.js";
export default {
  props: {
    imageUrl: {
      type: String,
      default: "",
    },
    filePath: {
      type: String,
      default: "module_file",
      require: true,
    },
    picWidth: {
      type: String,
      default: "100px",
    },
  },
  data() {
    return {
      fileList: [],
      dialogVisible: false,
    };
  },
  mounted() {},
  methods: {
    //    上传成功后的回调
    handleSuccess(response, file, fileList) {
      this.$emit("on-success", file, fileList);
    },
    /**
     * 自定义上传方法
     */
    handleUpload(option) {
      // 调用 ali-oss 中的方法
      put(this.filePath, option.file).then((res) => {
        this.$emit("fileUpload", res);
      });
    },
    checkPic() {
      this.dialogVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-upload {
  position: relative;
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
  line-height: 100px;
  text-align: center;
}
.avatar-uploader {
  position: relative;
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
}
</style>
