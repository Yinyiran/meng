<template>
  <div>
    <div class="class-item" v-for="art in articls" :key="art.ArtID">
      <img width="100px" height="100px" :src="art.ArtCover" alt />
      <span>{{art.ArtTitle}}</span>
      <span>{{art.ArtIntro}}</span>
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
      }
    }
  };
</script>

<style>
</style>