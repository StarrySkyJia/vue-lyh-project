<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action
      :show-file-list="false"
      :http-request="handleUpload"
      :on-success="handleSuccess"
      multiple
    >
      <img
        v-if="imageUrl"
        :style="{ width: picWidth, height: picWidth }"
        :src="imageUrl"
        class="avatar"
      />

      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
    <div class="bottom">
      <el-button type="text" icon="el-icon-view" @click="checkPic"
        >查看大图</el-button
      >
    </div>
    <el-dialog
      :visible.sync="dialogVisible"
      width="50%"
      top="5vh"
      append-to-body
    >
      <img width="100%" :src="imageUrl" />
    </el-dialog>
  </div>
</template>

<script>
const dayjs = require("dayjs");
import { put } from "@/utils/oss-ali.js";
export default {
  props: {
    imageUrl: {
      type: String,
      default: "",
    },
    filePath: {
      type: String,
      default: "",
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
      // 生成的文件名称
      let file = option.file;
      const point = file.name.lastIndexOf(".");
      let suffix = file.name.substr(point);
      let fileName = file.name.substr(0, point);
      let date = dayjs(new Date().getTime()).format("YYYYMMDDHHmm");
      let fileNames = `${fileName}_${date}${suffix}`;

      // 调用 ali-oss 中的方法
      put(this.filePath, fileNames, option.file).then((res) => {
        this.$emit("changePicUrl", res.url);
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
::v-deep .el-upload:hover::after {
  padding-top: 120%;
  content: "点击上传";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(rgba(255, 255, 255, 0), rgb(35, 30, 59));
  color: #409eff;
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
  .bottom {
  }
}
</style>
