<template>
  <div>
    <div @click="toProductPage(prod)" v-for="(prod,index) in products" :key="index" class="products">
      <div class="img-wrap">
        <img class="img" :src="prod.imgSrc">
      </div>
      <div class="info">
        <div class="prod-name">{{prod.name}}</div>
        <div class="prod-intro">{{prod.intro}}</div>
      </div>
    </div>
    <no-data :length="products.length"></no-data>
  </div>
</template>
<script>
import NoData from "./no-data";
export default {
  props: {
    products: Array
  },
  methods: {
    toProductPage(prod) {
      this.$router.push(`/products/page?id=${prod.id}`);
    }
  },
  components: {
    NoData
  }
};
</script>
<style lang="scss">
@import "../assets/css/variable.scss";
.products {
  float: left;
  width: 220px;
  margin: 10px;
  color: #666666;
  border-radius: 4px;
  background-color: #fff;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  cursor: pointer;
  &:hover {
    background-color: #fff;
    box-shadow: 0 17px 50px 0 rgba(0, 0, 0, 0.19);
    transform: translate3d(0, -2px, 0);
    transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  }
  .info {
    padding: 4px 16px;
    font-size: 14px;
    line-height: 22px;
  }
  .prod-name {
    @include no-wrap;
    max-height: 46px;
    transition: all 0.3s;
    text-align: justify;
    font-size: 14px;
    color: #32353e;
    margin-top: 6px;
  }
  .prod-intro {
    font-size: 12px;
    color: #a2a2a2;
    padding: 2px 0px 8px;
    line-height: 22px;
    transition: all 0.3s ease 0s;
    @include no-wrap;
    // overflow: hidden;
    // text-overflow: ellipsis;
    // display: -webkit-box;
    // -webkit-box-orient: vertical;
    // -webkit-line-clamp: 3;
  }
  .img-wrap {
    height: 0;
    width: 100%;
    padding-top: 70%;
    overflow: hidden;
    position: relative;
    background-color: #f1f1f1;
  }
  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
