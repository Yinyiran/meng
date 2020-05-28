<template>
  <div class="product-img">
    <template v-if="prod.Products">
      <div class="carousel-item">
        <el-carousel ref="carousel" @change="carChange" indicator-position="none" :autoplay="false">
          <el-carousel-item v-for="item in prod.Products" :key="item.ProdImg">
            <img width="100%" :src="item.ProdImg" alt />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="img-wrap" @click.stop>
        <img
          class="img-mini"
          :style="{width:size,height:size}"
          v-for="(item,mindex) in prod.Products"
          :key="mindex"
          :src="item.ProdImg"
          :class="{active:prod.current === mindex}"
          @click="miniChange(mindex)"
        />
      </div>
      <div class="prod-intro" v-if="info">{{prod.Intro}}</div>
    </template>
    <template v-else>
      <div class="prod-item">
        <img class="prod-img" :src="prod.ProdImg" />
      </div>
      <div class="prod-intro" v-if="info">{{prod.ProdName}}</div>
    </template>
  </div>
</template>

<script>
  export default {
    props: {
      prod: Object,
      info: Boolean,
      size: String,
      parmas: {
        ID: 0,
        ProdName: "vrd",
        SearchKeys: "啥的",
        SID: 0,
        ProdClasses: [{ ID: 0, CID: 96, IsDelete: 0 }],
        Intro:
          '按复位发我<img src="//img.maidiyun.com/images/2020/05/cf378c2d7f1346b6b878c37a7e854114.jpg" style="max-width: 100%;" class="" title="imgNum_7401303"><span></span><p><span></span></p>',
        ProdBrief: "",
        ProdJsonParams: '[{"ProName":"是少说","ProValue":"是 "}]',
        SkuJsonParams:
          '{"Columns":[{"ItemID":1,"ItemName":"规格参数","ItemType":3},{"ItemID":2,"ItemName":"规格参数","ItemType":3},{"ItemID":3,"ItemName":"规格参数","ItemType":3},{"ItemID":4,"ItemName":"规格参数","ItemType":3},{"ItemID":5,"ItemName":"规格参数","ItemType":3},{"ItemID":6,"ItemName":"规格参数","ItemType":3},{"ItemID":7,"ItemName":"规格参数","ItemType":3}],"Rows":[["的","2","和 发","","","",""]]}',
        SkuRuleName: "[]",
        ProdImages: [
          {
            LifeToken: null,
            LifeVersion: null,
            ServerId: null,
            FileHash: "7196d6473624182ac555793c55c3fc2d",
            Name: "c518c5a3ly1gf5mmxu3asj20u00urn2p.jpg",
            Path:
              "C:\\Users\\Chris\\Desktop\\我的\\c518c5a3ly1gf5mmxu3asj20u00urn2p.jpg",
            FileExt: ".jpg",
            FileSize: 215293,
            FileModifyDate: "2020-05-26 13:30:29",
            IsDir: false,
            FileThumbPath: null,
            FileThumbHash: null,
            OverSized: false,
            Title: "",
            Size: "211 K",
            Checked: false,
            Percent: 100,
            ErrorMsg: "",
            IsError: false,
            FileType: 3,
            thumbnail:
              "http://192.168.44.163:9000/workflow/71/96d647/362418/2ac555/793c55/c3fc2d?x-oss-process=image/resize,w_200",
            source:
              "http://192.168.44.163:9000/workflow/71/96d647/362418/2ac555/793c55/c3fc2d",
            ID: 0,
            Saved: true,
            FileName: "c518c5a3ly1gf5mmxu3asj20u00urn2p",
            show: false,
            UploadKey: "5bb2c506ac6744a28965fde996eb1520",
            timer: null,
            OldFileHash: null,
            FileServerPath: "71/96d647/362418/2ac555/793c55/c3fc2d",
            FileBucket: "todaymic"
          }
        ],
        SkuRuleValue: "",
        RelatedFiles: [],
        ProdModelFiles: [],
        SortIndex: 0
      }
    },
    methods: {
      carChange(index) {
        this.prod.current = index;
      },
      miniChange(imgIndex) {
        this.$refs.carousel.setActiveItem(imgIndex);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "../assets/style/color.less";

  .product-img {
    text-align: center;
    margin-top: 15px;
    width: 100%;
  }

  .carousel-item {
    cursor: pointer;
    padding-bottom: 100%;
    height: 0;
    position: relative;
  }
  .img-wrap {
    margin-top: 15px;
  }
  .img-mini {
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 1px solid #e8e8e8;
    margin: 0 2px;
    cursor: pointer;
    &.active {
      border: 1px solid @active;
    }
  }

  .prod-intro {
    text-align: center;
    cursor: pointer;
    padding: 10px 0 20px;
  }
  .prod-item {
    cursor: pointer;
    padding-bottom: 100%;
    height: 0;
    position: relative;
  }
  .prod-img {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
  }
</style>