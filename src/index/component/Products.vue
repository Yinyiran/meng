<template>
  <div class="products">
    <div class="classify">
      <a class="classify-item" v-for="cl in classify" :key="cl.ClassID" :href="`#${cl.ClassID}`">
        <img class="classify-img" :src="cl.ClassImg" alt />
        <div class="classify-name">{{cl.ClassName}}</div>
      </a>
    </div>
    <div v-for="cl in classify" :key="`${cl.ClassID}-prod`" :id="cl.ClassID">
      <div class="classify-title">{{cl.ClassName}}</div>
      <product-list :list="cl.Products" />
    </div>
  </div>
</template>

<script>
  import { Data } from "../../service";
  import ProductList from "../component/ProductList";
  export default {
    components: { ProductList },
    data() {
      return {
        classify: [],
        products: [],
      };
    },
    created() {
      this.getProducts();
    },
    methods: {
      getProducts() {
        let classPr = Data.get("/getClassify");
        let prodsPr = Data.get("/getProdList");
        Promise.all([classPr, prodsPr]).then(([classifys, products]) => {
          let classProds = {};
          products.data.forEach((prod) => {
            let pl = classProds[prod.Classify];
            if (pl) pl.push(prod);
            else classProds[prod.Classify] = [prod];
          });
          classifys.data.forEach((item) => {
            item.Products = classProds[item.ClassID] || [];
          });
          this.classify = classifys.data;
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .products {
    max-width: 1000px;
    margin: 0 auto;
  }
  .classify {
    display: flex;
    padding: 20px 0;
  }
  .classify-item {
    margin: 5px;
    text-decoration: none;
    text-align: center;
    padding: 20px;
    cursor: pointer;
    &:hover {
      box-shadow: 0 0 10px 5px #e1e1e1;
    }
  }
  .classify-img {
    width: 200px;
    height: 150px;
    object-fit: cover;
  }
  .classify-name {
    padding: 10px 0;
    color: #000;
  }
  .classify-title {
    font-size: 18px;
    margin: 20px 0;
    font-weight: bold;
  }
  .product-wrap {
    display: flex;
  }
  .product-item {
    width: 100px;
  }
</style>