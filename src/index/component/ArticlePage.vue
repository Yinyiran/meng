<template>
  <div class="article">
    <h1 class="header">{{article.ArtTitle}}</h1>
    <div class="intro">{{article.ArtIntro}}</div>
    <div class="content" v-html="article.ArtContent"></div>
  </div>
</template>

<script>
  import { Data } from "../../service";
  export default {
    data() {
      return {
        article: {},
      };
    },
    activated() {
      this.getArticle();
    },
    methods: {
      getArticle() {
        this.article = {}; // 清除上次数据
        let { params, query } = this.$route;
        Data.get("/getArticle", { ID: params.id || query.id }).then((res) => {
          this.article = res.data[0];
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .article {
    width: 1000px;
    margin: 0 auto;
  }
  .intro {
    color: #888;
    font-size: 12px;
    padding-bottom: 20px;
  }
  .content {
    /deep/ img {
      max-width: 100%;
    }
  }
</style>