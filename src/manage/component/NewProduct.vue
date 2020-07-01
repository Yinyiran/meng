<template>
  <div class="new-product m-full" v-show="visible">
    <div class="art-header">
      {{title}}
      <el-button class="m-right" size="small" @click="cancel">返回</el-button>
    </div>
    <el-form ref="formRef" class="art-editor" :model="row" label-width="80px" size="mini">
      <div class="form-wrap">
        <el-form-item label="产品名称">
          <el-input v-model="row.ProdName"></el-input>
        </el-form-item>
        <el-form-item label="是否星标">
          <el-checkbox v-model="row.ProdStar"></el-checkbox>
        </el-form-item>
      </div>
      <div class="form-wrap">
        <el-form-item label="产品简介">
          <el-input type="textarea" v-model="row.ProdIntro"></el-input>
        </el-form-item>
        <el-form-item label="所属分类">
          <el-select v-model="row.Classify" placeholder="请选择所属分类" clearable>
            <el-option
              v-for="item in classifys"
              :key="item.ClassID"
              :label="item.ClassName"
              :value="item.ClassID"
            ></el-option>
          </el-select>
        </el-form-item>
      </div>
      <div class="form-wrap">
        <el-form-item label="公共属性">
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
      </div>
      <div class="sku-item">
        <div class="form-wrap">
          <el-form-item label="SKU名称">
            <el-input v-model="row.ProdName"></el-input>
          </el-form-item>
        </div>
        <div class="form-wrap">
          <el-form-item label="SKU图片">
            <upload-file :imgs="row.ProdImg" size="50px" ref="UpFileRef"></upload-file>
          </el-form-item>
          <el-form-item label="SKU属性">
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
        </div>
      </div>
      <el-form-item label="内容描述">
        <editor v-model="row.ProdContent"></editor>
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
    props: { product: Object, visible: Boolean },
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
        row: {},
        classifys: [],
        prodProps: [],
        skuList: [
          {
            imgs: [],
            props: []
          }
        ]
      };
    },
    watch: {
      visible(val) {
        if (val && this.product.ProdID) {
          Data.get("/getProduct", { ProdID: this.product.ProdID }).then(res => {
            res.data.ProdImg = res.data.ProdImg.split(",");
            this.row = res.data;
            this.prodProps = [];
            let propObj = JSON.parse(this.row.Property);
            for (const key in propObj) {
              this.prodProps.push({ key, value: propObj[key] });
            }
          });
        } else {
          this.row = {};
          this.prodProps = [];
        }
      }
    },
    methods: {
      getClassList() {
        Data.get("/getClassify").then(res => {
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
        this.$emit("update:visible", false);
      },
      async saveArticle() {
        this.row.ProdImg = await this.$refs.UpFileRef.upload();
        let param = {
          ProdID: this.row.ProdID,
          ProdName: this.row.ProdName,
          ProdIntro: this.row.ProdIntro,
          Classify: this.row.Classify,
          ProdContent: this.row.ProdContent,
          ProdImg: this.row.ProdImg.toString(),
          ProdStar: this.row.ProdStar ? 1 : 0
        };
        let property = {};
        this.prodProps.forEach(item => {
          property[item.key] = item.value;
        });
        param.Property = JSON.stringify(property);
        Data.post("/saveProduct", param).then(res => {
          Message.success("保存成功！");
          if (!param.ProdID) param.ProdID = res.data.insertId; // 新建添加ArtID
          param.ProdImg = this.row.ProdImg;
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
  .form-wrap {
    display: flex;
    .el-form-item {
      width: 50%;
      &:nth-child(2) {
        margin-left: 20px;
      }
    }
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