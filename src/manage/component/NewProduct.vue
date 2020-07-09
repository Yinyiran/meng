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
            <div class="prop-item">
              <span class="add-prop-btn" @click="addProp">添加属性</span>
            </div>
            <div class="prop-item" v-for="(item,index) in row.Property" :key="index">
              <el-input class="prop-input" v-model="item.key" placeholder></el-input>
              <span class="prop-separator">:</span>
              <el-input class="prop-input" v-model="item.value"></el-input>
              <i class="el-icon-remove-outline dele-prop-btn" @click="deleProp(index)"></i>
            </div>
          </div>
        </el-form-item>
      </div>
      <!-- 添加SKU -->
      <div class="sku-wrap">
        <span class="add-prop-btn" @click="addSku">新增Sku</span>
      </div>
      <div class="sku-item" v-for="(sku,index) in row.SkuList" :key="index">
        <div class="form-wrap">
          <el-form-item label="SKU名称">
            <el-input v-model="sku.SkuName"></el-input>
          </el-form-item>
          <el-form-item label="是否首位">
            <el-radio v-model="skuIndex" :label="index">{{skuIndex === index?"是":"否"}}</el-radio>
          </el-form-item>
        </div>
        <div class="form-wrap">
          <el-form-item label="SKU属性">
            <div class="prop-wrap">
              <div class="prop-item" v-for="(item,i) in sku.SkuProps" :key="i">
                <el-input class="prop-input" v-model="item.key" placeholder></el-input>
                <span class="prop-separator">:</span>
                <el-input class="prop-input" v-model="item.value"></el-input>
                <i class="el-icon-remove-outline dele-prop-btn" @click="deleSkuProp(sku,i)"></i>
              </div>
              <div class="prop-item">
                <span class="add-prop-btn" @click="addSkuProp(sku)">添加sku属性</span>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="SKU图片">
            <upload-file :imgs="sku.SkuImg" size="50px" ref="UpFileRef"></upload-file>
          </el-form-item>
        </div>
        <i class="el-icon-close" v-show="row.SkuList.length>1" @click="deleSku(sku,index)"></i>
      </div>
      <el-form-item label="内容描述">
        <editor v-model="row.ProdContent" height="300"></editor>
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
        defalutRow: {
          Property: [{ key: "", value: "" }],
          SkuList: [
            {
              SkuName: "",
              SkuImg: [],
              SkuProps: [{ key: "", value: "" }]
            }
          ]
        },
        classifys: [],
        skuIndex: 0
      };
    },
    watch: {
      visible(val) {
        if (val && this.product.ProdID) {
          Data.get("/getProduct", { ProdID: this.product.ProdID }).then(res => {
            res.data.Property = this.formatProps(res.data.Property);
            res.data.ProdStar = !!res.data.ProdStar;
            res.data.SkuList.forEach((sku, index) => {
              sku.SkuProps = this.formatProps(sku.SkuProps);
              sku.SkuImg = sku.SkuImg.split(",");
              if (sku.IsMain) this.skuIndex = index;
            });
            this.row = res.data;
          });
        } else {
          // 新建
          let defaultRow = JSON.parse(JSON.stringify(this.defalutRow));
          this.row = Object.assign({}, this.product, defaultRow);
        }
      }
    },
    methods: {
      getClassList() {
        Data.get("/getClassify").then(res => {
          this.classifys = res.data;
          this.classifys.unshift({
            ClassID: 0,
            ClassImg: "",
            ClassName: "全部"
          });
        });
      },
      formatProps(props) {
        let propArr = [];
        let propObj = JSON.parse(props);
        for (const key in propObj) {
          propArr.push({ key, value: propObj[key] });
        }
        return propArr;
      },
      addProp() {
        this.row.Property.push({ key: "", value: "" });
      },
      deleProp(index) {
        this.row.Property.splice(index, 1);
      },
      addSku() {
        this.row.SkuList.push({
          SkuName: "",
          SkuImg: [],
          SkuProps: [{ key: "", value: "" }]
        });
      },
      deleSku(sku, index) {
        this.row.SkuList.splice(index, 1);
        if (this.skuIndex === index) this.skuIndex = 0;
      },
      addSkuProp(sku) {
        sku.SkuProps.push({ key: "", value: "" });
      },
      deleSkuProp(sku, index) {
        sku.SkuProps.splice(index, 1);
      },
      cancel() {
        this.$emit("update:visible", false);
      },
      async saveArticle() {
        let refs = this.$refs.UpFileRef;
        let skuParmas = [];
        for (let i = 0; i < this.row.SkuList.length; i++) {
          const sku = this.row.SkuList[i];
          let skuObj = {};
          let skuImgArr = await refs[i].upload();
          skuObj.SkuImg = skuImgArr.toString();
          skuObj.SkuID = sku.SkuID;
          skuObj.SkuName = sku.SkuName;
          skuObj.IsMain = this.skuIndex === i ? 1 : 0;
          skuObj.SkuProps = this.getStrKeyVal(sku.SkuProps);
          skuParmas.push(skuObj);
        }
        let param = {
          ProdID: this.row.ProdID,
          ProdName: this.row.ProdName,
          ProdIntro: this.row.ProdIntro,
          Classify: this.row.Classify,
          ProdContent: this.row.ProdContent,
          ProdStar: this.row.ProdStar ? 1 : 0,
          Property: this.getStrKeyVal(this.row.Property),
          SkuList: skuParmas
        };
        Data.post("/saveProduct", param).then(res => {
          Message.success("保存成功！");
          if (!param.ProdID) param.ProdID = res.data.insertId; // 新建添加ArtID
          this.$emit("saveSuccess", param);
        });
      },
      getStrKeyVal(list) {
        let property = {};
        list.forEach(item => {
          if (item.key) property[item.key] = item.value;
        });
        return JSON.stringify(property);
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
  .sku-item {
    position: relative;
    padding-top: 20px;
    background-color: #f5f5f5;
    margin-bottom: 10px;
    .el-icon-close {
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
    }
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
  .sku-wrap {
    border-top: 1px solid #e8e8e8;
    padding: 10px 10px;
    font-size: 14px;
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

    .prop-separator {
      vertical-align: middle;
      padding: 0 10px;
    }
  }
  .add-prop-btn {
    cursor: pointer;
    vertical-align: middle;
    color: @active;
  }
  .prop-input {
    width: 120px;
  }
  .footer {
    margin-top: 40px;
    text-align: right;
  }
</style>