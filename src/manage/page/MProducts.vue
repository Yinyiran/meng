<template>
  <div class="m-products">
    <classify-tree class="prod-tree" @change="getProdList" v-model="curClassId" />
    <div class="prod-wrap">
      <div class="prod-header">
        <el-button size="mini" type="primary" @click="addProd">新增产品</el-button>
      </div>
      <el-table :data="products">
        <el-table-column label="产品名" prop="ProdName"></el-table-column>
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
  import ClassifyTree from "../component/ClassifyTree.vue";
  import { Data } from "../../service";
  export default {
    components: { UploadFile, NewProduct, ClassifyTree },
    data() {
      return {
        classifys: [],
        isloaded: false,
        products: [],
        row: {},
        showAdd: false,
        curClassId: 0,
        form: {}
      };
    },
    created() {
      this.getClassList();
      this.getProdList();
    },
    methods: {
      getProdList(classid) {
        let param = classid ? `?Classify=${classid}` : "";
        Data.get(`/getProdList${param}`).then(res => {
          res.data.forEach(item => {
            item.ProdStar = !!item.ProdStar;
            item.ProdStarText = item.ProdStar ? "是" : "否";
          });
          this.products = res.data;
        });
      },
      getClassList() {
        Data.get("/getClassify").then(res => {
          this.classifys = res.data;
        });
      },
      addProd() {
        this.form = {
          ProdName: "",
          ProdIntro: "",
          Classify: this.curClassId,
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
        this.$messagebox.confirm(`确定要删除产品${row.ProdName}么？`, "提示").then(
          () => {
            let path = Data.post("/delProducts", { ID: row.ProdID }).then(res => {
              this.$message.success("删除成功");
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
    height: 100%;
    margin: -20px -20px 0;
  }
  .prod-tree {
    width: 240px;
    border-right: 1px solid #e8e8e8;
  }
  .prod-wrap {
    padding-top: 10px;
    width: 0;
    flex: 1;
  }
  .prod-header {
    padding: 10px;
    border-bottom: 1px solid #e8e8e8;
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