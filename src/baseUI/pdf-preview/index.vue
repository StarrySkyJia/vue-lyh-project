<template>
  <div class="pdf">
    <div class="content">
      <el-button
        type="primary"
        icon="el-icon-arrow-left"
        @click.stop="prePage"
        circle
      />

      <div class="show">
        <pdf
          ref="pdf"
          :src="pdfUrl"
          :page="pageNum"
          :rotate="pageRotate"
          @password="password"
          @progress="progressFn"
          @page-loaded="pageLoaded($event)"
          @num-pages="pageTotalNum = $event"
          @error="pdfError($event)"
          @link-clicked="page = $event"
        >
          <!-- @progress="loadedRatio = $event" -->
        </pdf>
      </div>
      <el-button
        type="primary"
        icon="el-icon-arrow-right"
        @click.stop="nextPage"
        circle
      />
    </div>

    <div class="pdf_footer">
      <div class="info">
        <div>当前页数/总页数：{{ pageNum }}/{{ pageTotalNum }}</div>
        <!-- <div>进度：{{ loadedRatio }}</div>
        <div>页面加载成功: {{ curPageNum }}</div> -->
      </div>
      <div class="operate">
        <el-form size="small">
          <!-- 旋转 -->
          <el-button
            type="primary"
            circle
            icon="el-icon-refresh-right"
            @click.stop="clock"
          />
          <el-button
            type="primary"
            circle
            icon="el-icon-refresh-left"
            @click.stop="counterClock"
          />
          <el-button
            type="primary"
            circle
            icon="el-icon-zoom-in"
            @click.stop="scaleD"
          />
          <el-button
            type="primary"
            circle
            icon="el-icon-zoom-out"
            @click.stop="scaleX"
          />
          <el-button
            type="primary"
            circle
            icon="el-icon-download"
            @click.stop="fileDownload"
          />
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import pdf from "vue-pdf";
import { get, download, getBlob } from "@/utils/oss-ali";

export default {
  name: "vue_pdf_preview",
  props: {
    // 当前pdf路径
    pdfUrl: {
      type: String,
      default:
        "http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf",
    },
    file: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    pdf,
  },
  data() {
    return {
      // 总页数
      pageTotalNum: 1,
      // 当前页数
      pageNum: 1,
      // 加载进度
      loadedRatio: 0,
      // 页面加载完成
      curPageNum: 0,
      // 放大系数 默认百分90
      scale: 90,
      // 旋转角度 ‘90’的倍数才有效
      pageRotate: 0,
      // 单击内部链接时触发 (目前我没有遇到使用场景)
      page: 0,
    };
  },
  methods: {
    //下载PDF
    fileDownload() {
      get(this.file.fileUrl, this.file.fileName);
    },

    progressFn(e) {
      // console.log(e);
    },
    //放大
    scaleD() {
      this.scale += 10;
      this.$refs.pdf.$el.style.width = parseInt(this.scale) + "%";
      this.$message.info(`缩放为${this.scale}%`);
    },

    //缩小
    scaleX() {
      // scale 是百分百展示 不建议缩放
      if (this.scale == 50) {
        this.$message.error(`不能再缩放啦！`);
        return;
      }
      this.scale += -10;
      this.$refs.pdf.$el.style.width = parseInt(this.scale) + "%";

      this.$message.info(`缩放为${this.scale}%`);
    },
    // 切换上一页
    prePage() {
      var p = this.pageNum;
      p = p > 1 ? p - 1 : this.pageTotalNum;
      this.pageNum = p;
    },
    // 切换下一页
    nextPage() {
      var p = this.pageNum;
      p = p < this.pageTotalNum ? p + 1 : 1;
      this.pageNum = p;
    },
    // 顺时针选中角度
    clock() {
      this.pageRotate += 90;
      this.$message.info("顺时针旋转");
    },
    // 逆时针旋转角度
    counterClock() {
      this.pageRotate -= 90;
      this.$message.info("逆时针旋转");
    },
    // pdf 有密码 则需要输入秘密
    password(updatePassword, reason) {
      updatePassword(prompt('password is "test"'));
    },
    // 页面加载成功  当前页数
    pageLoaded(e) {
      this.$emit("current", e);
      this.curPageNum = e;
    },
    // 异常监听
    pdfError(error) {
      console.error(error);
    },
  },
};
</script>

<style lang="scss" scoped>
.pdf {
  .content {
    display: flex;
    justify-content: space-around;
    align-items: center;

    .show {
      display: flex;
      justify-content: center;
      overflow: auto;
      width: 100%;
      max-width: 75%;
      height: 65vh;
    }
  }
  .pdf_footer {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px 0;
    // background-color: rgba(255, 255, 255, 0.5);
    background-color: #fff;
    .info {
      display: flex;
      justify-content: center;
      display: flex;
      flex-wrap: wrap;
      div {
        width: 30%;
        text-align: center;
      }
    }
    .operate {
      display: flex;
      justify-content: center;
      margin: 10px 0 0;
      display: flex;
      flex-wrap: wrap;
      div {
        // width: 80px;
        text-align: center;
        font-size: 15px;
      }
      .btn {
        cursor: pointer;
        margin: 5px 10px;
        width: 120px;
        border-radius: 10px;
        padding: 5px;
        color: #fff;
        background-color: #3dcbbc;
      }
    }
  }
}
</style>
