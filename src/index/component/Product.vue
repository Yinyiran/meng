<template>
  <div class="product">
    <product-img class="product-img" :prod="product" size="50px" />
    <h3>{{product.Intro}}</h3>
    <div class="product-info"></div>
  </div>
</template>

<script>
  import ProductImg from "../../components/ProductImg.vue";
  export default {
    components: { ProductImg },
    data() {
      return {
        product: {
          current: 0,
          Intro: "OnePlus 8 Pro",
          Products: [
            {
              ProdName: "一加手机8",
              ProdPrice: "5000",
              ProdImg: require("../../assets/img/prod1-1.png")
            },
            {
              ProdName: "一加手机8",
              ProdPrice: "4500",
              ProdImg: require("../../assets/img/prod1-2.png")
            }
          ]
        }
      };
    }
  };
</script>

<style lang="less" scoped>
  .product {
    display: flex;
  }
  .product-img {
    flex: 0 0 400px;
  }
  .product-info {
    flex: 1;
  }
</style>