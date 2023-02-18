<template>
  <div class="show">
    <div id="wordView" v-html="vHtml" />
  </div>
</template>

<script>
import mammoth from "mammoth";
import { getBlob } from "@/utils/oss-ali";
export default {
  name: "word",
  props: {
    // 当前pdf路径
    pdfUrl: {
      type: String,
      default: "",
    },
    file: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      vHtml: "",
      wordURL: "", //文件地址
    };
  },
  mounted() {
    console.log("mounted", this.pdfUrl, this.file);
    getBlob(this.file.fileUrl).then((res) => {
      console.log(res.content, "res");
      mammoth
        .convertToHtml({ arrayBuffer: new Uint8Array(res.content) })
        .then((resultObject) => {
          this.$nextTick(() => {
            // document.querySelector("#wordView").innerHTML =
            //   resultObject.value;
            this.vHtml = resultObject.value;
          });
        });
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.show {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: auto;
  //   height: 80vh;
  padding: 0 60px;
}
</style>
