<template>
  <div class="m-imgs">
    <div class="img-header">
      <el-button size="mini" @click="showUpDlg=true" type="primary">上传图片</el-button>
    </div>
    <div class="imgs-wrap">
      <img-item :imgs="imgs" @removeImg="deleImg"></img-item>
    </div>
    <el-dialog title="上传图片" :visible.sync="showUpDlg" width="80%" :append-to-body="true">
      <upload-file ref="UpFileRef"></upload-file>
      <div class="dialog-footer">
        <el-button size="mini" @click="closeDlg" type="primary">取消</el-button>
        <el-button size="mini" @click="uploadFile" type="primary">开始上传</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { Message, MessageBox } from "element-ui";
  import { ServeHost, HTTP } from "../../service";
  import ImgItem from "../../components/ImgItem";
  import UploadFile from "../../components/UploadFile";
  export default {
    components: { ImgItem, UploadFile },
    mounted() {
      HTTP.get("/getFiles?type=img").then(res => {
        this.imgPaths = res.data.sort(item => {
          let reg = /\\([^\\]+)\..+$/g // "resource\\img\\2020-05-17\\1589680887039.jpg";
          // let name =
        });
      });
    },
    computed: {
      imgs() {
        return this.imgPaths.map(src => `${ServeHost}/${src}`);
      }
    },
    data() {
      return {
        showUpDlg: false,
        imgPaths: []
      };
    },
    methods: {
      deleImg(index) {
        MessageBox.confirm("确定要删除这个图片么？", "提示").then(() => {
          let path = HTTP.post("/deleteFile", {
            data: this.imgPaths[index]
          }).then(res => {
            Message.success("删除成功");
            this.imgPaths.splice(index, 1);
          });
        });
      },
      closeDlg() {
        this.showUpDlg = false;
      },
      async uploadFile() {
        let res = await this.$refs.UpFileRef.upload();
        this.imgPaths.unshift(...res);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "../../assets/style/color.less";
  .img-header {
    padding-bottom: 20px;
  }
  .imgs-wrap {
    display: flex;
  }
  .dialog-footer {
    padding-top: 20px;
    text-align: right;
  }
</style>