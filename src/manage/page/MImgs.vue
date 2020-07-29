<template>
  <div class="m-imgs">
    <div class="img-header">
      <el-button size="mini" @click="showUpDlg=true" type="primary">上传图片</el-button>
    </div>
    <div class="imgs-wrap">
      <img-item :imgs="imgPaths" @removeImg="deleImg"></img-item>
    </div>
    <el-dialog title="上传图片" :visible.sync="showUpDlg" width="80%" :append-to-body="true">
      <upload-file :imgs="[]" ref="UpFileRef"></upload-file>
      <div class="dialog-footer">
        <el-button size="mini" @click="closeDlg" type="primary">取消</el-button>
        <el-button size="mini" @click="uploadFile" type="primary">开始上传</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import ImgItem from "../../components/ImgItem";
  import UploadFile from "../../components/UploadFile";
  import { Data, UtilService } from "../../service";
  export default {
    components: { ImgItem, UploadFile },
    mounted() {
      UtilService.GetImgs().then((res) => {
        this.imgPaths = res;
      });
    },
    data() {
      return {
        showUpDlg: false,
        imgPaths: [],
      };
    },
    methods: {
      deleImg(src) {
        this.$messagebox.confirm("确定要删除这个图片么？", "提示").then(() => {
          let path = Data.post("/deleteFile", { FilePath: src }).then((res) => {
            this.$message.success("删除成功");
            let index = this.imgPaths.indexOf(src);
            this.imgPaths.splice(index, 1);
          });
        });
      },
      closeDlg() {
        this.showUpDlg = false;
      },
      async uploadFile() {
        let res = await this.$refs.UpFileRef.upload();
        res.forEach((img) => {
          let exist = this.imgPaths.includes(img);
          if (!exist) this.imgPaths.unshift(img);
        });
        this.$message.success("上传成功!");
        this.showUpDlg = false;
      },
    },
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