<template>
  <div class="new-article m-full" v-show="show">
    <div class="art-header">
      {{title}}
      <el-button class="m-right" size="small" @click="cancel">返回</el-button>
    </div>
    <el-form ref="formRef" class="art-editor" :model="article" label-width="80px" size="small">
      <el-form-item label="标题">
        <el-input v-model="article.ArtTitle"></el-input>
      </el-form-item>
      <el-form-item label="文章简介">
        <el-input type="textarea" v-model="article.ArtIntro"></el-input>
      </el-form-item>
      <el-form-item label="是否星标">
        <el-checkbox v-model="article.ArtStar"></el-checkbox>
      </el-form-item>
      <el-form-item label="封面图片">
        <upload-file limit="1" :imgs="article.ArtCover" ref="UpFileRef"></upload-file>
      </el-form-item>
      <el-form-item label="文章内容">
        <editor v-model="article.ArtContent"></editor>
      </el-form-item>
      <div class="footer">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button size="small" type="primary" @click="saveArticle">保存</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
  import Editor from "../../components/Editor";
  import UploadFile from "../../components/UploadFile";
  import { Message } from "element-ui";
  import { Data } from "../../service";
  export default {
    props: { article: Object, show: Boolean },
    components: { Editor, UploadFile },
    computed: {
      title() {
        return this.article.ArtID ? "编辑文章" : "新建文章";
      }
    },
    methods: {
      cancel() {
        this.$emit("update:show", false);
      },
      async saveArticle() {
        let cover = await this.$refs.UpFileRef.upload();
        const { ArtID, ArtTitle, ArtIntro, ArtStar, ArtContent } = this.article;
        let param = {
          ArtID,
          ArtTitle,
          ArtIntro,
          ArtCover: cover.toString(),
          ArtStar: ArtStar ? 1 : 0,
          ArtContent
        };
        Data.post("/saveArticle", param).then(res => {
          Message.success("保存成功！");
          if (!param.ArtID) param.ArtID = res.data.insertId; // 新建添加ArtID
          param.ArtCover = cover;
          param.ArtStarText = param.ArtStar ? "是" : "否";
          this.$emit("saveSuccess", param);
        });
      }
    }
  };
</script>

<style lang="less">
  .new-article {
    z-index: 1;
    background-color: #fff;
    overflow: auto;
  }
  .art-header {
    line-height: 32px;
    padding: 10px 80px;
    background-color: #e8e8e8;
  }
  .art-editor {
    padding: 20px;
  }
  .footer {
    margin-top: 40px;
    text-align: right;
  }
</style>