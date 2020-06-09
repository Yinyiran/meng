<template>
  <div class="article m-full">
    <div class="header">
      <el-button size="mini" type="primary" @click="addArticle">新增</el-button>
    </div>
    <el-table :data="articles" class="article-table">
      <el-table-column label="文章标题" prop="ArtTitle"></el-table-column>
      <el-table-column label="文章简介" prop="ArtIntro"></el-table-column>
      <el-table-column label="是否星标" prop="ArtStarText"></el-table-column>
      <el-table-column label="操作">
        <span slot-scope="{row,$index}">
          <el-button size="mini" type="text" @click="editArticle(row)">编辑</el-button>
          <el-button size="mini" type="text" @click="delArticle(row,$index)">删除</el-button>
        </span>
      </el-table-column>
    </el-table>
    <new-article :article="row" @saveSuccess="saveSuccess" :show.sync="showAdd"></new-article>
  </div>
</template>

<script>
  import { HTTP } from "../../service";
  import { MessageBox, Message } from "element-ui";
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
      HTTP.get("/getArticle").then(res => {
        let list = res.data.forEach(item => {
          item.ArtStar = !!item.ArtStar;
          item.ArtCover = item.ArtCover ? [item.ArtCover] : [];
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
        if (param.ArtID) {
          let item = this.articles.find(item => item.ArtID === param.ArtID);
          Object.assign(item, param);
          item.ArtCover = [item.ArtCover];
        } else {
          this.articles.unshift(param);
        }
        this.showAdd = false;
      },
      delArticle(row, index) {
        MessageBox.confirm("确定要删除这条新闻么？", { type: "warning" }).then(
          res => {
            HTTP.post("/delArticle", { ArtID: row.ArtID }).then(res => {
              Message.success("删除成功！");
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