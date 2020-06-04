<template>
  <div class="article">
    <div class="header">{{article.ArtTitle}}</div>
    <div class="intro">{{article.ArtIntro}}</div>
    <div class="content" v-html="article.ArtContent"></div>
  </div>
</template>

<script>
  import { HTTP } from "../../service";
  export default {
    created() {
      console.log(this.$route);
      this.getArticle();
    },
    data() {
      return {
        article: {},
        artId: this.$route.params.id
      };
    },
    methods: {
      getArticle() {
        HTTP.get("/getArticle", { id: this.artId }).then(res => {
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
</style>