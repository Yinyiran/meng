<template>
  <div>
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
    <el-dialog
      :title="addTitle"
      :visible.sync="showAdd"
      width="80%"
      top="5vh"
      :before-close="cancel"
      :close-on-click-modal="false"
    >
      <el-form ref="formRef" :model="form" label-width="100px" size="small">
        <el-form-item label="标题">
          <el-input v-model="form.ArtTitle"></el-input>
        </el-form-item>
        <el-form-item label="产品简介">
          <el-input type="textarea" v-model="form.ArtIntro"></el-input>
        </el-form-item>
        <el-form-item label="是否星标">
          <el-checkbox v-model="form.ArtStar"></el-checkbox>
        </el-form-item>
        <div class="footer">
          <el-button size="small" @click="cancel">取消</el-button>
          <el-button size="small" type="primary" @click="saveArticle">保存</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { HTTP } from "../../service";
  import { MessageBox, Message } from "element-ui";
  export default {
    data() {
      return {
        articles: [],
        form: {
          ArtTitle: "",
          ArtIntro: "",
          ArtStar: false
        },
        addTitle: "新建文章",
        showAdd: false
      };
    },
    created() {
      HTTP.get("/getArticles").then(res => {
        let list = res.data.forEach(item => {
          item.ArtStar = !!item.ArtStar;
          item.ArtStarText = item.ArtStar ? "是" : "否";
        });
        this.articles = res.data;
      });
    },
    methods: {
      addArticle() {
        this.form = {
          ArtTitle: "",
          ArtIntro: "",
          ArtStar: false
        };
        this.showAdd = true;
      },
      editArticle(row) {
        Object.assign(this.form, row);
        this.showAdd = true;
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
      },
      cancel() {
        this.showAdd = false;
        return;
        MessageBox.confirm("关闭后内容将被丢弃，确定关闭窗口么？", "警告", {
          type: "warning",
          confirmButtonText: "关闭窗口"
        }).then(() => {
          this.showAdd = false;
        });
      },
      saveArticle() {
        const { ArtID, ArtTitle, ArtIntro, ArtStar } = this.form;
        let param = { ArtID, ArtTitle, ArtIntro, ArtStar: ArtStar ? 1 : 0 };
        HTTP.post("/saveArticle", param).then(res => {
          Message.success("保存成功！");
          this.showAdd = false;
          param.ArtStarText = param.ArtStar ? "是" : "否";
          if (ArtID) {
            let item = this.articles.find(item => item.ArtID === ArtID);
            Object.assign(item, param);
          } else {
            this.articles.unshift(param);
          }
        });
      }
    }
  };
</script>

<style lang="less">
  .article-table {
    margin-top: 20px;
    border: 1px solid #e8e8e8;
  }
</style>