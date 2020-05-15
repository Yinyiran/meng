<template>
  <div class="m-imgs">
    <img-item :imgs="imgs" @removeImg="deleImg"></img-item>
  </div>
</template>

<script>
  import { ServeHost, HTTP } from "../../service";
  import ImgItem from "../../components/ImgItem";
  import { Message, MessageBox } from "element-ui";
  export default {
    components: { ImgItem },
    mounted() {
      HTTP.get("/getFiles?type=img").then(res => {
        this.imgPaths = res.data;
      });
    },
    computed: {
      imgs() {
        return this.imgPaths.map(src => `${ServeHost}/${src}`);
      }
    },
    data() {
      return {
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
      }
    }
  };
</script>

<style lang="less">
  @import "../../assets/style/color.less";
  .m-imgs {
    display: flex;
  }
</style>