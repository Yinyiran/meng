<template>
  <div class="m-products">
    <div class="prod-tree">
      <div class="tree-header">
        <i class="el-icon-plus"></i>
        <i class="el-icon-sort"></i>
      </div>
      <div class="tree-item" v-for="item in classifys" :key="item.ClassID">
        <img :src="item.ClassImg" alt />
        <span>{{item.ClassName}}</span>
      </div>
    </div>
    <div class="prod-wrap">
      <div class="header">
        <el-button size="mini" type="primary" @click="addProd">新增</el-button>
      </div>
      <el-table :data="products">
        <el-table-column label="产品名" prop="ProdName"></el-table-column>
        <el-table-column label="所属分类" prop="Classify" width="150px"></el-table-column>
        <el-table-column label="星标" prop="ProdStarText" width="50px" align="center"></el-table-column>
        <el-table-column label="操作" width="100px" align="center">
          <span slot-scope="{row,$index}">
            <el-button size="mini" type="text" @click="editProd(row)">编辑</el-button>
            <el-button size="mini" type="text" @click="delProd(row,$index)">删除</el-button>
          </span>
        </el-table-column>
      </el-table>
    </div>
    <new-product :product="form" @saveSuccess="saveSuccess" :visible.sync="showAdd"></new-product>
  </div>
</template>
<script>
  import UploadFile from "../../components/UploadFile.vue";
  import NewProduct from "../component/NewProduct.vue";
  import { Data } from "../../service";
  import { Message, MessageBox } from "element-ui";
  export default {
    components: { UploadFile, NewProduct },
    data() {
      return {
        classifys: [],
        isloaded: false,
        products: [],
        row: {},
        showAdd: false,
        form: {}
      };
    },
    created() {
      this.getClassList();
      Data.get("/getProdList").then(res => {
        res.data.forEach(item => {
          item.ProdStar = !!item.ProdStar;
          item.ProdStarText = item.ProdStar ? "是" : "否";
        });
        this.products = res.data;
      });
    },
    methods: {
      getClassList() {
        Data.get("/getClassify").then(res => {
          this.classifys = res.data;
        });
      },
      treeClick(data) {
        console.log(data);
      },
      addProd() {
        this.form = {
          ProdName: "",
          ProdIntro: "",
          Classify: "",
          ProdStar: false,
          ProdContent: "",
          ProdImg: "",
          Property: "{}"
        };
        this.showAdd = true;
      },
      saveSuccess(param) {
        param.ProdStarText = param.ProdStar ? "是" : "否";
        let prod = this.products.find(item => item.ProdID === param.ProdID);
        if (prod) Object.assign(prod, param);
        else this.products.unshift(param);
        this.showAdd = false;
      },
      editProd(row) {
        this.form = row;
        this.showAdd = true;
      },
      delProd(row, index) {
        MessageBox.confirm(`确定要删除产品${row.ProdName}么？`, "提示").then(
          () => {
            let path = Data.post("/delProducts", { ID: row.ProdID }).then(res => {
              Message.success("删除成功");
              this.products.splice(index, 1);
            });
          }
        );
      }
    }
  };
</script>

<style lang="less" scoped>
  .m-products {
    display: flex;
  }
  .prod-tree {
    background-color: #f1f1f1;
    width: 200px;
    padding: 20px;
  }
  .prod-wrap {
    flex: 1;
  }
  .el-input.el-input--small {
    width: 450px;
  }
  .footer {
    margin-top: 40px;
    padding-left: 200px;
    text-align: left;
  }
</style>