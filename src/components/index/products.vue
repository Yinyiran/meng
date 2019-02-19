<template>
  <div>
    <el-container>
      <el-aside width="300px" class="layout-column scroll-hidden">
        <tree :tree="catalogTree" :catalogId="catalogId" @clickTreeData="clickTree"></tree>
      </el-aside>
      <el-main>
        <prod-list :products="prodList"></prod-list>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Vue from "vue";
import { Container, Aside, Main } from "element-ui";
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
import { Http, API, Query } from "../../service";
import Tree from "../tree.vue";
import ProdList from "../prod-list.vue";

export default {
  data() {
    return {
      prodList: [],
      catalogId: 0,
      catalogTree: {
        getUrl: "web/getCatalog",
        label: "全部",
        editable: false
      }
    };
  },
  activated() {
    this.catalogId = Number(Query("catalog") || 0);
    this.getProduct(this.catalogId);
  },
  deactivated() {
    this.prodList = [];
  },
  methods: {
    getProduct(path) {
      Http.get(`web/getProduct?path=${path}`).then(res => {
        res.data.forEach(item => {
          if (item.images) {
            item.imgSrc = API.imgSrc + item.images.split(",")[0];
          } else {
            item.imgSrc = "#";
          }
        });
        this.prodList = res.data;
      });
    },
    clickTree(data) {
      this.getProduct(data.path);
    }
  },
  components: {
    Tree,
    ProdList
  }
};
</script>
<style lang="scss" scoped>
.tree-wrap {
  width: 400px;
}
</style>
