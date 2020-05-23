<template>
  <div>
    <div class="header">
      <el-button size="mini" type="primary">新增</el-button>
    </div>
    <el-table :data="articles" class="article-table">
      <el-table-column label="文章标题" prop="ArtTitle"></el-table-column>
      <el-table-column label="文章简介" prop="ArtIntro"></el-table-column>
      <el-table-column label="是否星标" prop="ArtStar"></el-table-column>
      <el-table-column label="操作">
        <el-button size="mini" type="text">编辑</el-button>
        <el-button size="mini" type="text">删除</el-button>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { HTTP } from "../../service";
  export default {
    data() {
      return {
        articles: []
      };
    },
    created() {
      HTTP.get("/getArticles").then(res => {
        let list = res.data.forEach(item => {
          item.ArtStar = item.ArtStar ? "是" : "否";
        });
        this.articles = res.data;
      });
    }
  };
</script>

<style lang="less">
.article-table{
  margin-top: 20px;
  border: 1px solid #e8e8e8;
}
</style>