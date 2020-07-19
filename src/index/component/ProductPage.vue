<template>
  <div class="product">
    <div class="info-wrap">
      <product-img class="product-img" :imgData="prod.imgData" size="50px" v-if="prod.imgData" />
      <div class="intro-wrap">
        <div class="product-name">{{prod.ProdName}}-{{curSku.SkuName}}</div>
        <p class="prodcut-intro">{{prod.ProdIntro}}</p>
        <div class="prop-item" v-for="(val,key) in prod.Property" :key="key">
          <span class="prop-key">{{key}}</span>
          <span class="prop-value">{{val}}</span>
        </div>
        <div class="prop-item" v-for="(val,key) in curSku.SkuProps" :key="key">
          <span class="prop-key">{{key}}</span>
          <span class="prop-value">{{val}}</span>
        </div>
        <div class="sku-list">
          <div
            class="sku-item"
            v-for="(sku,index) in prod.SkuList"
            :class="{active:curSku.SkuID === sku.SkuID}"
            :key="sku.SkuID"
          >
            <img :src="sku.SkuImg[0]" width="40px" height="40px" @click="changeSku(index)" />
          </div>
        </div>
      </div>
    </div>
    <div class="product-content" v-html="prod.ProdContent"></div>
  </div>
</template>

<script>
  import ProductImg from "../../components/ProductImg.vue";
  import { Data } from "../../service";
  export default {
    components: { ProductImg },
    activated() {
      this.prod = {};
      let [prodId, curSku] = this.$route.params.id.split("-");
      Data.get("/getProduct", { ProdID: prodId }).then(res => {
        let prod = res.data;
        prod.Property = JSON.parse(prod.Property);
        prod.SkuList.forEach(sku => {
          sku.SkuImg = sku.SkuImg.split(",");
          sku.SkuProps = JSON.parse(sku.SkuProps);
        });
        this.curSku = prod.SkuList[curSku];
        prod.imgData = {
          imgs: this.curSku.SkuImg,
          title: prod.ProdName,
          curIndex: 0
        };
        this.prod = prod;
      });
    },
    data() {
      return {
        loading: true,
        curSku: {},
        prod: {}
      };
    },
    methods: {
      changeSku(index) {
        this.curSku = this.prod.SkuList[index];
        this.prod.imgData = {
          imgs: this.curSku.SkuImg,
          title: this.prod.ProdName,
          curIndex: 0
        };
      }
    }
  };
</script>

<style lang="less" scoped>
  .product {
    margin: 0 auto;
    width: 900px;
  }
  .product-img {
    flex: 0 0 400px;
    border: 1px solid #f1f1f1;
  }
  .info-wrap {
    display: flex;
    padding-top: 30px;
  }
  .intro-wrap {
    padding-top: 10px;
    padding-left: 50px;
  }
  .product-name {
    font-size: 28px;
  }
  .prodcut-intro {
    font-size: 14px;
    color: #999;
    margin-bottom: 20px;
  }

  .product-intro {
    padding-left: 20px;
    flex: 1;
  }
  .prop-item {
    display: flex;
    line-height: 1.5;
    padding: 5px 0;
    border-bottom: 1px solid #eee;
    font-size: 15px;
  }
  .prop-key {
    width: 100px;
    color: #555;
  }
  .prop-value {
    flex: 1;
    color: #999;
  }
  .sku-list {
    display: flex;
    margin-top: 20px;
    padding: 10px;
    .sku-item {
      margin: 0 10px;
      border: 1px solid #e8e8e8;
      cursor: pointer;
      &.active {
        border: 1px solid red;
      }
    }
  }
  .product-content {
    padding-top: 30px;
  }
  .product-content img {
    width: 100%;
  }
</style>