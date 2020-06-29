<template>
  <div class="product">
    <div class="product-info">
      <product-img class="product-img" :prod="prod" size="50px" />
      <div class="product-intro">
        <div>
          产品名称：
          <span>{{prod.ProdName}}</span>
        </div>
        <p v-for="(val,key) in prod.Property" :key="key">{{key}} : {{val}}</p>
        <p>{{prod.ProdIntro}}</p>
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
  .product-info {
    display: flex;
  }
  .product-img {
    flex: 0 0 400px;
  }
  .product-intro {
    padding-left: 20px;
    flex: 1;
  }
</style>