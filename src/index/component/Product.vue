<template>
  <div class="products">
    <template v-if="product.Products">
      <carousel-thumb :product="product"></carousel-thumb>
      <div class="prod-intro">{{product.Intro}}</div>
    </template>
    <template v-else>
      <div class="prod-item single-img">
        <img class="prod-img" :src="product.ProdImg" />
      </div>
      <div class="prod-intro">{{product.ProdName}}</div>
    </template>
  </div>
</template>

<script>
import CarouselThumb from "../../components/CarouselThumb.vue";
export default {
  components: { CarouselThumb },
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

<style>
</style>