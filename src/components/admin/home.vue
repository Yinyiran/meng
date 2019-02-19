<template>
  <div class="home-wrap">
    <el-tabs v-show="!isEdit" v-model="currentTab" @tab-click="getData">
      <el-tab-pane :label="tab.label" :name="tab.name" v-for="tab in tabList" :key="tab.name">
        <page-table :tab="tab.config" :list="list" v-if="tab.render" v-loading="loading"></page-table>
      </el-tab-pane>
    </el-tabs>
    <component :is="curComponent" v-if="isEdit" :curData="curData" @reload="reload" @close="isEdit=false"></component>
  </div>
</template>
<script>
import Vue from "vue";
import { Tabs, TabPane, Button, Loading } from "element-ui";
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Button);
Vue.use(Loading.directive);
import { API, BannerType, Http, Message, Cache } from "../../service";
import { adminHome } from "../../views/mixin";
import UploadImg from "../upload-img.vue";
import EditBanner from "../edit-banner.vue";
import EditCatalog from "../edit-catalog.vue";
import PageTable from "../page-table.vue";

export default {
  data() {
    return {
      list: null,
      isEdit: false,
      curData: {},
      loading: false,
      curComponent: "EditBanner",
      currentTab: "banner"
    };
  },
  created() {
    this.tabList[0].render = true;
    this.getBanner();
    this.getSelectOption();
  },
  activated() {
    this.isEdit = false;
  },
  methods: {
    getData(item) {
      this.loading = true;
      this.tabList[item.index].render = true;
      switch (item.name) {
        case "banner":
          this.getBanner();
          this.curComponent = "EditBanner";
          break;
        case "catalog":
          this.getCatalog();
          this.curComponent = "EditCatalog";
          break;
        case "product":
          Http.get("getRecommendProduct").then(res => {
            this.list = res.data;
            this.loading = false;
          });
          break;
        case "news":
          Http.get("getRecommendArticle").then(res => {
            this.list = res.data;
            this.loading = false;
          });
          break;
        case "evaluate":
          Http.get("getRecommendEvaluate").then(res => {
            this.list = res.data;
            this.loading = false;
          });
          break;
      }
    },
    edit(row) {
      this.isEdit = true;
      this.curData = row;
    },
    deleBanner(row) {
      Message.confirm("确定要删除这个banner么?")
        .then(() => {
          Http.post("deleBanner", { id: row.id }).then(() => {
            Message.success("删除成功");
            console.log(this);
            this.reload("banner");
          });
        })
        .catch(() => {});
    },
    addBanner() {
      this.isEdit = true;
      this.curData = {};
    },
    reload(type) {
      switch (type) {
        case "banner":
          this.getBanner();
          break;
        case "catalog":
          this.getCatalog();
          break;
        default:
          break;
      }
    },
    cancelRecommend({ msg, index, id, url }) {
      Message.confirm(`确定要取消"${msg}"的推荐么？`).then(() => {
        Http.get(`${url}?id=${id}`).then(() => {
          Message.success("成功取消推荐");
          this.list.splice(index, 1);
        });
      });
    },
    getBanner() {
      Http.get("getBanner").then(res => {
        res.data.forEach(img => {
          img.imgSrc = img.img ? API.imgSrc + img.img : "#";
          img.typeName = BannerType[img.type];
          this.loading = false;
        });
        this.list = res.data;
      });
    },
    getCatalog() {
      Http.get("getCatalog").then(res => {
        let data = [];
        res.data.forEach(item => {
          if (item.pid === 0) {
            item.imgSrc = item.image ? API.imgSrc + item.image : "#";
            item.level = "一级";
            data.push(item);
          }
        });
        this.list = data;
        this.loading = false;
      });
    },
    getSelectOption() {
      Http.get("getProduct?simple=true").then(res => {
        let prodList = res.data.map(item => {
          return { value: item.id, label: item.name };
        });
        Cache.set("edit_select_prodList", prodList);
      });
      Http.get("getArticle?simple=true").then(res => {
        let articleList = res.data.map(item => {
          return { value: item.id, label: item.title };
        });
        Cache.set("edit_select_articleList", articleList);
      });
    }
  },
  mixins: [adminHome],
  components: {
    UploadImg,
    EditBanner,
    EditCatalog,
    PageTable
  }
};
</script>

<style lang="scss">
.home-wrap {
  position: relative;
  padding: 1px;
}
.home-title {
  padding-bottom: 14px;
  margin: 0;
}
.table-img {
  height: 50px;
}
</style>
