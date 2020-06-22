<template>
  <div>
    <div class="header">
      <el-button size="mini" type="primary" @click="addProd">新增</el-button>
    </div>
    <el-table :data="products">
      <el-table-column label="产品名" prop="ProdName"></el-table-column>
      <el-table-column label="所属分类" prop="Classify"></el-table-column>
      <el-table-column label="所属分类" prop="Classify"></el-table-column>
      <el-table-column label="操作">
        <span slot-scope="{row,$index}">
          <el-button size="mini" type="text" @click="editProd(row)">编辑</el-button>
          <el-button size="mini" type="text" @click="delProd(row,$index)">删除</el-button>
        </span>
      </el-table-column>
    </el-table>
    <new-product :product="form" @saveSuccess="saveSuccess" :show.sync="showAdd"></new-product>
  </div>
</template>
<script>
  import UploadFile from "../../components/UploadFile.vue";
  import NewProduct from "../component/NewProduct.vue";
  import { HTTP } from "../../service";
  import { Message, MessageBox } from "element-ui";
  export default {
    components: { UploadFile, NewProduct },
    data() {
      return {
        isloaded: false,
        products: [],
        row: {},
        showAdd: false,
        form: {
          ProdName: "",
          ProdIntro: "",
          Classify: "",
          ProdStar: 0,
          ProdContent: "",
          ProdImg: "",
          Property: ""
        }
      };
    },
    created() {
      HTTP.get("/getProducts").then(res => {
        this.products = res.data;
      });
    },
    methods: {
      addProd() {
        this.form = {
          ProdName: "",
          ProdIntro: "",
          Classify: "",
          ProdStar: 0,
          ProdContent: "",
          ProdImg: "",
          Property: ""
        };
        this.showAdd = true;
      },
      saveSuccess(param) {
        param.ProdStarText = param.ProdStar ? "是" : "否";
        // param.BanTypeText = BanType[param.BanType];
        if (param.ProdID) {
          Object.assign(this.form, param);
        } else {
          this.products.push(param);
        }
        this.showAdd = false;
      },

      async onSubmit() {
        this.form.CompLogo = await this.$refs.UpFileRef.upload();
        let Obj = Object.assign({}, this.form);
        let params = Object.assign(Obj, {
          CompID: 10000,
          CompLogo: this.form.CompLogo.length
            ? JSON.stringify(this.form.CompLogo)
            : null
        });
        HTTP.post(`/saveProduct`, params).then(res => {
          Message.success("保存成功！");
        });
      },
      editProd(row) {
        this.form = row;
        this.showAdd = true;
      },
      delProd(row, index) {
        MessageBox.confirm(`确定要删除产品${row.ProdName}么？`, "提示").then(
          () => {
            let path = HTTP.post("/delProducts", { ID: row.ProdID }).then(res => {
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
  .el-input.el-input--small {
    width: 450px;
  }
  .footer {
    margin-top: 40px;
    padding-left: 200px;
    text-align: left;
  }
</style>