<template>
  <div class="product">
    <div class="info-wrap">
      <product-img class="product-img" :prod="prod" size="50px" />
      <div class="intro-wrap">
        <div class="product-name">{{prod.ProdName}}</div>
        <p class="prodcut-intro">{{prod.ProdIntro}}</p>
        <div class="prop-item" v-for="(val,key) in prod.Property" :key="key">
          <span class="prop-key">{{key}}</span>
          <span class="prop-value">{{val}}</span>
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
      this.prod = {}; // 清除上次数据
      Data.get("/getProduct", { ProdID: this.$route.params.id }).then(res => {
        let prod = res.data;
        prod.ProdImg = prod.ProdImg.split(",");
        prod.Property = JSON.parse(prod.Property);
        this.prod = prod;
      });
    },
    data() {
      return {
        prod: {}
      };
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
    border: 1px solid #f9f9f9;
  }
  .info-wrap {
    display: flex;
  }
  .intro-wrap {
    padding-top: 40px;
    padding-left: 20px;
  }
  .product-name {
    font-size: 28px;
  }
  .prodcut-intro {
    font-size: 14px;
    color: #999;
    margin-bottom: 30px;
  }

  .product-intro {
    padding-left: 20px;
    flex: 1;
  }
  .prop-item {
    display: flex;
    line-height: 1.5;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  .prop-key {
    width: 100px;
    color: #555;
  }
  .prop-value {
    flex: 1;
    color: #999;
  }
  .product-content img {
    width: 100%;
  }
</style>