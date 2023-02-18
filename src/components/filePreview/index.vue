<template>
  <div class="preview">
    <el-dialog
      :visible.sync="prevFileVisible"
      top="5vh"
      width="90%"
      title="文件预览"
      :append-to-body="true"
    >
      <Pdf v-if="file.suffix === '.pdf'" :pdfUrl="file.url" :file="file" />
      <!-- word表格 -->
      <!-- <Word v-else-if="fileType === '.docx'" :pdfUrl="pdfUrl" :file="file" /> -->
      <div
        v-else-if="file.suffix === '.docx' || file.suffix === '.doc'"
        style="height: 80vh"
      >
        <iframe
          width="100%"
          height="100%"
          :src="`https://view.officeapps.live.com/op/view.aspx?src=${file.url}`"
        ></iframe>
      </div>
      <!-- excel表格 -->
      <div
        v-else-if="file.suffix === '.xlsx' || file.suffix === '.xls'"
        style="height: 80vh"
      >
        <iframe
          width="100%"
          height="100%"
          :src="`https://view.officeapps.live.com/op/view.aspx?src=${file.url}`"
        ></iframe>
      </div>
      <!-- ppt -->
      <div
        v-else-if="file.suffix === '.ppt' || file.suffix === '.pptx'"
        style="height: 80vh"
      >
        <iframe
          width="100%"
          height="100%"
          :src="`https://view.officeapps.live.com/op/view.aspx?src=${file.url}`"
        ></iframe>
      </div>
      <div v-else class="no-support">
        <img class="no-support-img" src="@/assets/file-icon/no_support.svg" />
        <span class="no-support-text"
          >该文件格式 ({{ file.suffix }}) 暂不支持在线预览</span
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pdf from "@/baseUI/pdf-preview";
import Word from "@/baseUI/word-preview";
export default {
  components: { Pdf },
  props: {
    file: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      prevFileVisible: false,
      fileType: "",
    };
  },
  methods: {
    open() {
      this.prevFileVisible = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.no-support {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  .no-support-img {
    width: 20%;
  }
  .no-support-text {
    margin-top: 20px;
    color: #909399;
    font-size: 16px;
  }
}

::v-deep .el-dialog__body {
  padding: 10px 20px !important;
}
</style>
