<template>
  <div>
    <div class="class-item" v-for="cl in classify" :key="cl.ClassID">
      <img width="30px" height="30px" :src="cl.ClassImg" alt />
      <span>{{cl.ClassName}}</span>
    </div>
    <div v-for="cl in classify" :key="`${cl.ClassID}-prod`">
      <span>{{cl.ClassName}}</span>
      <div>
        <span v-for="(prod,index) in cl.Products" :key="index">{{prod.ProdName}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  import { Data } from "../../service";
  export default {
    data() {
      return {
        classify: []
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
          products.data.forEach(prod => {
            let pl = classProds[prod.Classify];
            if (pl) pl.push(prod);
            else classProds[prod.Classify] = [prod];
          });
          classifys.data.forEach(item => {
            item.Products = classProds[item.ClassID] || [];
          });
          this.classify = classifys.data;
        });
      }
    }
  };
</script>

<style>
</style>