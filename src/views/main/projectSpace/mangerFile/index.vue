<template>
  <div class="file">
    <!-- 搜索和上传 -->
    <div class="file-top">
      <el-row>
        <el-col :span="6">
          <el-input
            size="mini"
            v-model="query.condition"
            placeholder="搜索条件:文档标题,创建人姓名模糊搜索"
          />
        </el-col>
        <el-col :span="2">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-search"
            @click="searchClick"
            >搜索文件</el-button
          > </el-col
        ><el-col :span="2">
          <el-button size="mini" icon="el-icon-search" @click="resetClick"
            >重置</el-button
          >
        </el-col>
        <el-col :offset="12" :span="2">
          <el-button
            size="mini"
            type="primary"
            icon="el-icon-upload"
            @click="dialogVisible = true"
            >上传文件</el-button
          >
        </el-col>
      </el-row>

      <!-- 上传文件 -->
      <el-dialog
        :visible.sync="dialogVisible"
        width="50%"
        title="上传文件"
        :append-to-body="true"
      >
        <div class="dialog">
          <FileUpload @fileUpload="handleFileUpload" />
          <el-form ref="dialogForm" class="form" :model="formData" size="small">
            <el-form-item label="文件名称" :rules="{ require: true }">
              <el-input v-model="formData.fileName" />
            </el-form-item>
            <el-form-item label="备注信息" :rules="{ require: true }">
              <el-input type="textarea" :rows="3" v-model="formData.remark" />
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button
            size="small"
            type="primary"
            @click="handleComfirmFileUpload"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>

    <!-- 文件列表展示 -->
    <FileList
      :fileList="fileList"
      @delete="handleAfterDelete"
      @previewFile="previewFile"
    />

    <!-- 预览文件窗口展示 -->
    <FilePreview ref="prevRef" :file="file"></FilePreview>

    <!-- 分页器 -->
    <div class="page-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[14, 28, 42]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      />
    </div>
  </div>
</template>

<script>
import FileUpload from "@/baseUI/fileUpload";
import FileList from "./file-list";
import FilePreview from "@/components/filePreview";
import { getFileList, saveModuleFile } from "@/api/file";
import { mapGetters } from "vuex";

export default {
  components: { FileUpload, FileList, FilePreview },
  data() {
    return {
      dialogVisible: false,
      fileList: [],
      total: 0,
      file: {},
      // 查询信息
      query: {
        condition: "",
        moduleId: this.$store.getters.moduleInfo.moduleId,
        pageNum: 0,
        pageSize: 14,
      },
      // 上传文件数据
      formData: {
        // 这个fileName是指页面中看到的标题
        fileName: "",
        // 这个fileUrl是在oss云端中的文件夹+文件名称
        fileUrl: "",
        remark: "",
        moduleId: this.$store.getters.moduleInfo.moduleId,
        moduleName: this.$store.getters.moduleInfo.moduleName,
        realName: this.$store.getters.userInfo.realName,
        userId: this.$store.getters.userInfo.userId,
      },
    };
  },
  computed: { ...mapGetters(["moduleInfo"]) },
  mounted() {
    this.getPageData();
  },
  methods: {
    // 预览文件
    previewFile(file) {
      this.$refs.prevRef.open();
      this.file = file;
    },

    // 上传文件成功后毁掉，进行文件信息赋值
    handleFileUpload(fileData) {
      // 这个fileName是指页面中看到的标题
      this.$set(this.formData, "fileName", fileData.fileName);
      // 这个name是在oss云端中的文件名，其中增加了时间作为同名文件的额外标识
      this.$set(this.formData, "fileUrl", fileData.name);
    },
    // 文件信息保存到后台，并实现刷新页面
    handleComfirmFileUpload() {
      saveModuleFile(this.formData).then((res) => {
        this.getPageData();
        this.dialogVisible = false;
      });
    },

    // 切换页码大小
    handleSizeChange(pageSize) {
      this.$set(this.query, "pageSize", pageSize);
      this.getPageData();
    },
    // 切换页面
    handleCurrentChange(pageNum) {
      this.$set(this.query, "pageNum", pageNum);
      this.getPageData();
    },

    // 搜索/重置/删除后 进行刷新页面
    searchClick() {
      this.getPageData();
    },
    resetClick() {
      this.query.condition = "";
      this.getPageData();
    },
    handleAfterDelete() {
      this.getPageData();
    },

    // 获取页面数据
    getPageData() {
      getFileList(this.query).then((res) => {
        this.fileList = res.fileInfoVOList;
        this.total = res.total;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  display: flex;
  padding: 0 20px;
  justify-content: flex-start;
  align-items: center;
  .form {
    color: #909399;
    flex: 1;
    margin-left: 20px;
  }
}

.page-pagination {
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 20px;
}

::v-deep .el-dialog__body {
  padding: 10px 20px !important;
}
</style>
