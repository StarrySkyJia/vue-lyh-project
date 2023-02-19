<template>
  <div class="file-list">
    <div class="file-item" v-for="file in fileList" :key="file.fileId">
      <img
        v-if="getFileSuffix(file.fileUrl) === '.png'"
        class="icon"
        src="@/assets/file-icon/image-files.svg"
      />
      <img
        v-else-if="getFileSuffix(file.fileUrl) === '.pdf'"
        class="icon"
        src="@/assets/file-icon/file-pdf-one.svg"
      />
      <img
        v-else-if="getFileSuffix(file.fileUrl) === '.xlsx'"
        class="icon"
        src="@/assets/file-icon/excel.svg"
      />
      <img
        v-else-if="getFileSuffix(file.fileUrl) === '.txt'"
        class="icon"
        src="@/assets/file-icon/file-txt-one.svg"
      />
      <img
        v-else-if="getFileSuffix(file.fileUrl) === '.ppt'"
        class="icon"
        src="@/assets/file-icon/file-ppt.svg"
      />
      <img
        v-else-if="getFileSuffix(file.fileUrl) === '.docx'"
        class="icon"
        src="@/assets/file-icon/file-doc.svg"
      />
      <img
        v-else-if="getFileSuffix(file.fileUrl) === '.zip'"
        class="icon"
        src="@/assets/file-icon/file-zip.svg"
      />
      <img
        v-else-if="getFileSuffix(file.fileUrl) === '.mp4'"
        class="icon"
        src="@/assets/file-icon/video-file.svg"
      />
      <img v-else class="icon" src="@/assets/file-icon/file-question.svg" />
      <el-tooltip placement="top">
        <div slot="content">{{ file.fileName }}</div>
        <div class="file-name">{{ file.fileName }}</div>
      </el-tooltip>
      <div class="dropdown">
        <el-dropdown size="small" @command="handleCommand($event, file)">
          <span class="el-dropdown-link">
            <i class="el-icon-more" style="color: #909399"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="down">下载</el-dropdown-item>
            <el-dropdown-item command="delete">删除</el-dropdown-item>
            <el-dropdown-item command="check">文件预览</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { get, download, getBlob } from "@/utils/oss-ali";
import { deleteModuleFile } from "@/api/file";
import { mapGetters } from "vuex";

export default {
  props: {
    fileList: {
      type: Array,
      default: () => [],
    },
  },
  computed: { ...mapGetters(["userId"]) },

  data() {
    return {};
  },
  methods: {
    // 获取文件格式
    getFileSuffix(url) {
      const point = url.lastIndexOf(".");
      let suffix = url.substr(point);
      return suffix;
    },
    handleCommand(command, file) {
      if (command === "down") {
        this.handleDownloadFile(file);
      } else if (command === "delete") {
        this.handleDeleteFile(file.fileId);
      } else if (command === "check") {
        getBlob(file.fileUrl).then((res) => {
          const point = res.res.requestUrls[0].lastIndexOf("?");
          const url = res.res.requestUrls[0].substr(0, point);

          let suffix = url.substr(url.lastIndexOf("."));
          this.$emit("previewFile", { ...file, url, suffix });
        });
      }
    },
    handleDownloadFile(file) {
      // fileUrl是文件存在的url地址，其实是 文件夹的地址/文件在oss的名称
      // fileName是文件的名称
      // 使用bolb类型进行文件下载
      get(file.fileUrl, file.fileName);

      // 使用signatureUrl获取URL下载
      // download(file.fileUrl, file.fileName);
      this.$message({
        message: "下載成功",
        type: "success",
      });
    },
    handleDeleteFile(fileId) {
      const data = {
        fileId: fileId,
        userId: this.userId,
      };
      deleteModuleFile(data).then(() => {
        this.$emit("delete");
        this.$message({
          message: "删除成功",
          type: "success",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.file-list {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin-top: 20px;
  .file-item {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    flex-shrink: 0;
    width: 12%;
    height: 180px;
    margin: 10px;
    padding: 10px 10px 5px;
    border-radius: 10px;
    background-color: #ecf5ffde;

    &:hover {
      border: 1px #409eff dotted;
      box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
      background-color: #c6e2ff;
    }
    .icon {
      width: 80px;
      height: 80px;
      margin: 20px 0 10px;
    }

    .file-name {
      width: 100%;
      font-size: 14px;
      color: #909399;
      word-break: break-all;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .dropdown {
      position: absolute;
      bottom: 5px;
      right: 10px;
      width: 100%;
      display: flex;
      justify-content: flex-end;
      .drop-delete {
        color: #f56c6c;
      }
    }
  }
}
</style>
