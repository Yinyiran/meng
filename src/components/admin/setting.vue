<template>
  <div>
    <h3 class="setting-titile">类目设置</h3>
    <div class="catalog-wrap">
      <tree :tree="catalogTree" class="tree"></tree>
      <tree :tree="skuTree" class="tree"></tree>
    </div>
  </div>
</template>
<script>
import Tree from "../tree.vue";
export default {
  data() {
    return {
      catalogTree: {
        getUrl: "getCatalog",
        saveUrl: "saveCatalog",
        deleUrl: "deleCatalog",
        label: "目录管理",
        editable: true
      },
      skuTree: {
        getUrl: "getSkuList",
        saveUrl: "saveSkuList",
        deleUrl: "deleSkuList",
        label: "型号管理",
        editable: true
      }
    };
  },
  components: {
    Tree
  }
};
</script>

<style lang="scss"  scoped>
.setting-titile {
  margin: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  color: #666;
  font-size: 20px;
}
.catalog-wrap {
  margin: 0 -20px;
  &::after {
    display: block;
    clear: both;
    height: 0;
    content: "";
  }
  .tree {
    width: 40%;
    float: left;
  }
}
</style>
