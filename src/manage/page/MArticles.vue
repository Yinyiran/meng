<template>
  <div class="article m-full">
    <div class="header">
      <el-button size="mini" type="primary" @click="addArticle">新增</el-button>
    </div>
    <el-table :data="articles" class="article-table">
      <el-table-column label="文章标题" prop="ArtTitle"></el-table-column>
      <el-table-column label="文章简介" prop="ArtIntro"></el-table-column>
      <el-table-column label="星标" prop="ArtStarText" width="50px" align="center"></el-table-column>
      <el-table-column label="操作" width="100px" align="center">
        <span slot-scope="{row,$index}">
          <el-button size="mini" type="text" @click="editArticle(row)">编辑</el-button>
          <el-button size="mini" type="text" @click="delArticle(row,$index)">删除</el-button>
        </span>
      </el-table-column>
    </el-table>
    <new-article :article="row" @saveSuccess="saveSuccess" :visible.sync="showAdd"></new-article>
  </div>
</template>

<script>
  import { Data } from "../../service";
  import NewArticle from "../component/NewArticle.vue";
  export default {
    components: { NewArticle },
    data() {
      return {
        articles: [],
        row: {},
        addTitle: "新建文章",
        showAdd: false
      };
    },
    created() {
      Data.get("/getArticle").then(res => {
        let list = res.data.forEach(item => {
          item.ArtStar = !!item.ArtStar;
          item.ArtCover = item.ArtCover.split(",");
          item.ArtStarText = item.ArtStar ? "是" : "否";
        });
        this.articles = res.data;
      });
    },
    methods: {
      addArticle() {
        this.row = {
          ArtTitle: "",
          ArtIntro: "",
          ArtContent: "",
          ArtStar: false
        };
        this.showAdd = true;
      },
      editArticle(row) {
        this.row = row;
        this.showAdd = true;
      },
      saveSuccess(param) {
        let item = this.articles.find(item => item.ArtID === param.ArtID);
        if (item) Object.assign(item, param);
        else this.articles.unshift(param);
        this.showAdd = false;
      },
      delArticle(row, index) {
        this.$messagebox.confirm("确定要删除这条新闻么？", { type: "warning" }).then(
          res => {
            Data.post("/delArticle", { ArtID: row.ArtID }).then(res => {
              this.$message.success("删除成功！");
              this.articles.splice(index, 1);
            });
          }
        );
      }
    }
  };
</script>

<style  lang="less" scoped>
  .article {
    padding: 20px;
  }
  .article-table {
    margin-top: 20px;
    border: 1px solid #e8e8e8;
  }
</style>