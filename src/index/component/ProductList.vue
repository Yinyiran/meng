<template>
  <div class="products">
    <div
      class="prod-wrap"
      v-for="(prod,index) in products"
      :key="index"
      @click="openProdPage(prod.ProdID,prod.imgData.curIndex)"
    >
      <product-img :imgData="prod.imgData" :info="true" />
    </div>
  </div>
</template>

<script>
  import ProductImg from "../../components/ProductImg";
  export default {
    components: { ProductImg },
    props: {
      list: Array
    },
    computed: {
      products() {
        this.list.forEach(prod => {
          prod.SkuList.forEach(sku => {
            sku.SkuImg = sku.SkuImg.split(",");
          });
          let imgs = prod.SkuList.map(item => item.SkuImg[0]);
          let imgData = {
            imgs: imgs,
            title: prod.ProdName,
            curIndex: 0
          };
          this.$set(prod, "imgData", imgData);
        });
        return this.list;
      }
    },
    methods: {
      openProdPage(prodId, index) {
        this.$router.push(`/product/${prodId}-${index}`);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import url("../../assets/style/color.less");
  .products {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid @border;
    background-color: #f9f9f9;
    position: relative;
    &::after {
      position: absolute;
      content: "";
      height: 0;
      bottom: 0;
      width: 100%;
      border-top: 1px solid #dfdfdf;
    }
    .prod-wrap {
      position: relative;
      width: 25%;
      border-right: 1px solid @border;
      border-bottom: 1px solid @border;
      background-color: #f9f9f9;
      transition: 0.25s;
      box-sizing: border-box;
      &:hover {
        background-color: #fff;
      }
    }
  }
</style>