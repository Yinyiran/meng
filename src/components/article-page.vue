<template>
  <div class="article">
    <h1 class="title">{{article.title}}</h1>
    <div class="img-wrap">
      <img class="surface" :src="article.imgSrc" alt="">
    </div>
    <div class="intro">{{article.intro}}</div>
    <div class="content" v-html="article.detail"></div>
  </div>
</template>
<script>
import { Http, Query, API } from "../service";
export default {
  data() {
    return {
      article: {}
    };
  },
  activated() {
    let id = Query("id");
    Http.get(`web/getArticle?id=${id}`).then(res => {
      res.data.imgSrc = API.imgSrc + res.data.image;
      this.article = res.data;
    });
  },
  deactivated() {
    this.article = {};
  }
};
</script>

<style lang="scss" scoped>
.article {
  width: 700px;
  margin: auto;
  .title {
    font-size: 20px;
    font-weight: 600;
    line-height: 60px;
  }
  .img-wrap {
    text-align: center;
    background-color: #fff;
    .surface {
      vertical-align: top;
      max-width: 100%;
    }
  }
  .intro {
    padding: 10px;
    margin-top: 10px;
    background-color: #f8f8f8;
    color: #a1a1a1;
    font-size: 14px;
  }
  .content {
    padding: 10px;
    background-color: #fff;
  }
}
</style>
