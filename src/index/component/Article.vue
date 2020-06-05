<template>
  <div class="article">
    <h1 class="header">{{article.ArtTitle}}</h1>
    <div class="intro">{{article.ArtIntro}}</div>
    <div class="content" v-html="article.ArtContent"></div>
  </div>
</template>

<script>
  import { HTTP } from "../../service";
  export default {
    data() {
      return {
        article: {}
      };
    },
    activated() {
      this.getArticle();
    },
    methods: {
      getArticle() {
        HTTP.get("/getArticle", { id: this.$route.params.id }).then(res => {
          this.article = res.data[0];
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .article {
    width: 1000px;
    margin: 0 auto;
  }
  .intro{
    color: #888;
    font-size: 12px;
  }
</style>