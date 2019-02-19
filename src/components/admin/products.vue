<template>
  <div>
    <!-- 产品 -->
    <div class="prod-list" v-if="!isEdit">
      <page-table :tab="tableCofig" :list="prodList"></page-table>
    </div>
    <!-- 产品编辑 -->
    <div class="edit-prod-wrap" v-else>
      <form-edit :options="options"></form-edit>
    </div>
    <!-- 产品评价 弹窗列表 -->
    <div class="model" v-if="isShowEvaluate">
      <div class="model-content">
        <span class="close el-icon-close" @click="isShowEvaluate = false"></span>
        <evaluate :prod="currProd"></evaluate>
      </div>
    </div>
  </div>
</template>

<script>
import { Http, Message } from "../../service";
import evaluate from "./evaluate.vue";
import FormEdit from "../form-edit.vue";
import PageTable from "../page-table.vue";
export default {
  data() {
    const that = this;
    return {
      skuList: [],
      catalog: [],
      isEdit: false,
      isShowEvaluate: false,
      isShowProduct: false,
      prod: null,
      prodList: [],
      evaluateList: [],
      currProd: {},
      tableCofig: {
        add: this.addProd,
        addText: "添加产品",
        cols: [
          { label: "产品名称", prop: "name" },
          { label: "目录", prop: "catalog" },
          { label: "型号", prop: "sku" },
          { label: "推荐", prop: "recommend" }
        ],
        btnaWith: "200px",
        btns: [
          {
            label: "编辑",
            icon: "el-icon-edit",
            fn(row) {
              that.editProd(row);
            }
          },
          {
            label: "评价",
            icon: "el-icon-message",
            type: "info",
            fn(row) {
              that.showEvaluate(row);
            }
          },
          {
            label: "删除",
            icon: "el-icon-delete",
            type: "danger",
            fn(row) {
              that.deleProd(row);
            }
          },
          {
            label: "预览",
            icon: "el-icon-view",
            type: "success",
            fn(row) {
              that.previewProd(row);
            }
          }
        ]
      },
      options: {
        saveUrl: "saveProd",
        data: null,
        labelWidth: "100px",
        form: [
          {
            data: "",
            prop: "name",
            col: 6,
            label: "产品名称"
          },
          {
            data: "",
            prop: "catalogID",
            url: "getCatalog",
            type: "cascader",
            col: 6,
            label: "产品分类"
          },
          {
            data: "",
            prop: "skuID",
            type: "cascader",
            url: "getSkuList",
            col: 6,
            label: "产品类型"
          },
          {
            data: "",
            prop: "recommend",
            type: "checkbox",
            col: 6,
            label: ""
          },
          {
            data: "",
            col: 24,
            prop: "intro",
            type: "textarea",
            label: "产品简介"
          },
          {
            data: "",
            prop: "images",
            limit: 5,
            col: 24,
            prefixType: "product",
            type: "upload",
            label: "图片修改"
          },
          {
            data: "",
            col: 24,
            type: "editor",
            prop: "details",
            label: "产品简介"
          }
        ],
        btns: [
          {
            label: "取消",
            type: "info",
            fn() {
              that.isEdit = false;
            }
          },
          {
            label: "保存",
            type: "primary",
            action: "submit"
          }
        ],
        beforefn() {
          return {
            postData: {
              id: that.prod.id,
              type: "img"
            }
          };
        },
        successfn() {
          that.getProduct();
          that.isEdit = false;
        },
        errorfn() {}
      }
    };
  },
  created() {
    this.getProduct();
    this.getAllTreeData();
  },
  activated() {
    this.isEdit = false;
  },
  methods: {
    getProduct() {
      Http.get("getProduct").then(res => {
        this.prodList = res.data;
      });
    },
    // 编辑
    addProd() {
      this.prod = {
        id: 0,
        name: "",
        intro: "",
        skuID: [],
        catalogID: [],
        images: "",
        details: ""
      };
      this.options.data = this.prod;
      this.isEdit = true;
    },
    editProd(data) {
      this.prod = Object.assign({}, data);
      this.prod.catalogID =
        data.catalogID && this.transformToNum(data.catalogID);
      this.prod.skuID = data.skuID && this.transformToNum(data.skuID);
      this.prod.recommend = data.recommend > 0 ? true : false;
      this.options.data = this.prod;
      this.isEdit = true;
    },
    deleProd(data) {
      Message.confirm("确定要删除当前产品么？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          Http.post("deleProd", {
            id: data.id
          }).then(() => {
            this.getProduct();
            Message.success("保存成功");
          });
        })
        .catch(() => {});
    },
    showEvaluate(data) {
      this.isShowEvaluate = true;
      this.currProd = data;
    },
    cacelEdit() {
      this.isEdit = false;
    },
    getAllTreeData() {
      // 获取两个下拉列表
      Http.get("getCatalog").then(res => {
        this.catalog = this.formateData(res.data);
      });
      Http.get("getSkuList").then(res => {
        this.skuList = this.formateData(res.data);
      });
    },
    formateData(data) {
      let findAllChildren = pid => {
        let catalog = [];
        for (const item of data) {
          if (item.pid === pid) {
            catalog.push({
              value: item.id,
              label: item.name
            });
          }
        }
        return catalog;
      };
      // 转换数据格式
      let formate = parents => {
        for (const item of parents) {
          let children = findAllChildren(item.value);
          if (children.length > 0) {
            item.children = children;
            formate(item.children);
          }
        }
      };
      let newData = findAllChildren(0);
      formate(newData);
      return newData;
    },
    transformToNum(str) {
      let strArr = str.split(",");
      return strArr.map(str => {
        return Number(str);
      });
    },
    previewProd(data) {
      this.$router.push(`/products/page?id=${data.id}`);
    },
    // 选择
    skuChange(val) {
      this.prod.skuID = val;
    },
    catalogChange(val) {
      this.prod.catalogID = val;
    }
  },
  components: {
    FormEdit,
    evaluate,
    PageTable
  }
};
</script>

<style lang="scss">
.upload-img-tip {
  color: #999;
  font-size: 12px;
}

.model {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  min-height: 100%;
  background-color: rgba(0, 0, 0, 0.7);

  .model-content {
    position: relative;
    overflow: auto;
    overflow-y: auto;
    box-sizing: border-box;
    margin: 50px auto;
    padding: 20px;
    max-height: 80%;
    min-height: 400px;
    width: 95%;
    background-color: #fff;

    .close {
      position: absolute;
      top: 14px;
      right: 16px;
      font-size: 22px;
      cursor: pointer;
    }
  }
}
</style>
