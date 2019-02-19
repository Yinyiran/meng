<template>
  <div class="article">
    <div class="item" v-for="(item,index) in articles" :key="index">
      <img :src="item.imgSrc" alt="" class="image">
      <div class="infos">
        <div class="title" @click="toArticlePage(item)">{{item.title}}</div>
        <div class="intro">{{item.intro}}</div>
        <div class="time">发布时间：{{item.createtime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { Http, API } from "../../service";
export default {
  data() {
    return {
      articles: []
    };
  },
  created() {
    this.getArticles();
  },
  methods: {
    getArticles() {
      Http.get("web/getArticle").then(res => {
        res.data.forEach(item => {
          item.imgSrc = API.imgSrc + item.image;
        });
        this.articles = res.data;
      });
    },
    toArticlePage(item) {
      this.$router.push(`/articles/page?id=${item.id}`);
    }
  }
};
</script>
<style lang="scss">
@import "../../assets/css/variable.scss";
.article {
  width: 1000px;
  margin: auto;
  padding: 20px 0;
  .item {
    padding: 10px 0;
    // @include no-wrap();
    border-bottom: 1px solid #f2f2f2;
  }
  .image {
    width: 80px;
    height: 80px;
    float: left;
    border-radius: 4px;
  }
  .infos {
    color: #969696;
    font-size: 14px;
    margin-left: 100px;
    .title {
      font-weight: 600;
      font-size: 16px;
      line-height: 1.8;
      color: #333;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
    .intro {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
