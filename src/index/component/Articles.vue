<template>
  <div class="articles">
    <div
      class="article-item"
      v-for="art in articls"
      :key="art.ArtID"
      @click="openArticle(art.ArtID)"
    >
      <img class="article-cover" :src="art.ArtCover" alt />
      <div class="article-info">
        <div class="article-title">{{art.ArtTitle}}</div>
        <div class="article-title">{{art.ModifyDate}}</div>
        <div class="article-intro">{{art.ArtIntro}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Data } from "../../service";
  export default {
    data() {
      return {
        articls: []
      };
    },
    created() {
      this.getArticles();
    },
    methods: {
      getArticles() {
        Data.get("/getArticle").then(res => {
          this.articls = res.data;
        });
      },
      openArticle(artId) {
        this.$router.push(`/article/${artId}`);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import url("../../assets/style/color.less");
  .article-item {
    padding: 20px 0;
    border-bottom: 1px solid #e8e8e8;
    display: flex;
    cursor: pointer;
    &:hover {
      .article-title {
        color: @active;
      }
    }
  }
  .article-cover {
    width: 300px;
    height: 150px;
    object-fit: cover;
    border: 1px solid #e8e8e8;
  }
  .article-info {
    margin-left: 30px;
    .article-title {
      margin-top: 20px;
      font-size: 20px;
      font-weight: bold;
    }
    .article-intro {
      margin-top: 20px;
      font-size: 14px;
      color: #7a7a7a;
    }
  }
  .articles {
    max-width: 1000px;
    margin: 0 auto;
  }
</style>