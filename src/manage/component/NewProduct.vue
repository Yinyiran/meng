<template>
  <div class="new-product m-full" v-show="show">
    <div class="art-header">
      {{title}}
      <el-button class="m-right" size="small" @click="cancel">返回</el-button>
    </div>
    <el-form ref="formRef" class="art-editor" :model="product" label-width="80px" size="small">
      <el-form-item label="产品名称">
        <el-input v-model="product.ProdName"></el-input>
      </el-form-item>
      <el-form-item label="产品简介">
        <el-input type="textarea" v-model="product.ProdIntro"></el-input>
      </el-form-item>
      <el-form-item label="是否星标">
        <el-checkbox v-model="product.ProdStar"></el-checkbox>
      </el-form-item>
      <el-form-item label="封面图片">
        <upload-file :imgs="product.ProdImg" ref="UpFileRef"></upload-file>
      </el-form-item>
      <el-form-item label="产品属性">
        <div class="prop-wrap">
          <div class="prop-item" v-for="(item,index) in prodProps" :key="index">
            <el-input class="prop-input" v-model="item.key" placeholder></el-input>
            <span class="prop-separator">:</span>
            <el-input class="prop-input" v-model="item.value"></el-input>
            <i class="el-icon-remove-outline dele-prop-btn" @click="deleProp(index)"></i>
          </div>
          <div class="prop-item">
            <span class="add-prop-btn" @click="addProp">添加属性</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="所属分类">
        <el-select v-model="product.Classify" placeholder="请选择所属分类" clearable>
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
        <editor v-model="product.ProdContent"></editor>
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
    props: { product: Object, show: Boolean },
    components: { Editor, UploadFile },
    computed: {
      title() {
        return this.product.ProdID ? "编辑" : "新建" + "产品";
      }
    },
    created() {
      this.getClassList();
    },
    data() {
      return {
        classifys: [],
        prodProps: []
      };
    },
    methods: {
      getClassList() {
        HTTP.get("/getClassify").then(res => {
          this.classifys = res.data;
        });
      },
      addProp() {
        this.prodProps.push({ key: "", value: "" });
      },
      deleProp(index) {
        this.prodProps.splice(index, 1);
      },
      cancel() {
        this.$emit("update:show", false);
      },
      async saveArticle() {
        this.product.ProdImg = await this.$refs.UpFileRef.upload();
        let param = Object.assign({}, this.product);
        param.ProdImg = this.product.ProdImg.toString();
        param.ProdStar = ProdStar ? 1 : 0;
        let property = {};
        this.prodProps.forEach(item => {
          property[item.key] = item.value;
        });
        param.Property = JSON.stringify(property);
        HTTP.post("/saveProduct", param).then(res => {
          Message.success("保存成功！");
          this.$emit("saveSuccess", param);
        });
      }
    }
  };
</script>

<style lang="less">
  @import url("../../assets/style/color.less");
  .new-product {
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
    .prop-item {
      vertical-align: middle;
      margin-bottom: 5px;
    }
    .dele-prop-btn {
      margin-left: 10px;
      font-size: 18px;
      cursor: pointer;
      vertical-align: middle;
    }
    .add-prop-btn {
      cursor: pointer;
      vertical-align: middle;
      color: @active;
    }
    .prop-separator {
      vertical-align: middle;
      padding: 0 10px;
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