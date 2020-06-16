<template>
  <div class="new-article m-full" v-show="show">
    <div class="art-header">
      {{title}}
      <el-button class="m-right" size="small" @click="cancel">返回</el-button>
    </div>
    <el-form ref="formRef" class="art-editor" :model="article" label-width="80px" size="small">
      <el-form-item label="产品名称">
        <el-input v-model="article.ArtTitle"></el-input>
      </el-form-item>
      <el-form-item label="产品简介">
        <el-input type="textarea" v-model="article.ArtIntro"></el-input>
      </el-form-item>
      <el-form-item label="是否星标">
        <el-checkbox v-model="article.ArtStar"></el-checkbox>
      </el-form-item>
      <el-form-item label="封面图片">
        <upload-file :imgs="article.ArtCover" ref="UpFileRef"></upload-file>
      </el-form-item>
      <el-form-item label="产品属性">
        <div class="prop-wrap">
          <div class="prop-item" v-for="(item,index) in propList" :key="index">
            <el-input class="prop-input" v-model="item.key" placeholder></el-input>：
            <el-input class="prop-input" v-model="item.value"></el-input>
            <i class="el-icon-remove-outline add-prop-btn" @click="deleProp(index)"></i>
          </div>
          <div class="prop-item">
            <el-button size="mini" type="text" @click="addProp">添加属性</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select v-model="article.Classify" placeholder="请选择所属分类" clearable>
          <el-option
            v-for="item in classifys"
            :key="item.ClassID"
            :label="item.ClassName"
            :value="item.ClassID"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="同类产品">选择产品</el-form-item> -->
      <el-form-item label="内容描述">
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
  import { HTTP } from "../../service";
  export default {
    props: { article: Object, show: Boolean },
    components: { Editor, UploadFile },
    computed: {
      title() {
        return this.article.ArtID ? "编辑" : "新建" + "产品";
      }
    },
    created() {
      this.getClassList();
    },
    data() {
      return {
        classifys: [],
        propList: []
      };
    },
    methods: {
      getClassList() {
        HTTP.get("/getClassify").then(res => {
          this.classifys = res.data;
        });
      },
      addProp() {
        this.propList.push({ key: "", value: "" });
      },
      deleProp(index) {
        this.propList.splice(index, 1);
      },
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
          ArtCover: cover.length ? cover[0] : "",
          ArtStar: ArtStar ? 1 : 0,
          ArtContent
        };
        HTTP.post("/saveArticle", param).then(res => {
          Message.success("保存成功！");
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
  .prop-wrap {
    display: inline-block;
    width: 300px;
    .add-prop-btn {
      margin-left: 10px;
      font-size: 18px;
      cursor: pointer;
      vertical-align: middle;
    }
    .prop-item {
      vertical-align: middle;
      margin-top: 5px;
    }
  }
  .prop-input {
    width: 120px;
  }
  .footer {
    margin-top: 40px;
    text-align: right;
  }
</style>