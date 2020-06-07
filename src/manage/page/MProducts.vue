<template>
  <div>
    <div class="header">
      <el-button size="mini" type="primary" @click="addProd">新增</el-button>
    </div>
    <el-table :data="products">
      <el-table-column label="产品名" prop="ProdName"></el-table-column>
      <el-table-column label="所属分类" prop="Classify"></el-table-column>
      <el-table-column label="属性" prop="Property"></el-table-column>
      <el-table-column label="图片" prop="ProdImg"></el-table-column>
      <el-table-column label="操作">
        <span slot-scope="{row,$index}">
          <el-button size="mini" type="text" @click="editProd(row)">编辑</el-button>
          <el-button size="mini" type="text" @click="delProd(row,$index)">删除</el-button>
        </span>
      </el-table-column>
    </el-table>
    <new-product :article="row" @saveSuccess="saveSuccess" :show.sync="showAdd"></new-product>
  </div>
</template>
<script>
  import UploadFile from "../../components/UploadFile.vue";
  import NewProduct from "../component/NewProduct.vue";
  import { HTTP } from "../../service";
  import { Message } from "element-ui";

  export default {
    components: { UploadFile, NewProduct },
    data() {
      return {
        isloaded: false,
        products: [],
        row: {},
        showAdd: false,
        form: {
          CompName: "",
          CompLogo: [],
          Mobile: "",
          Telephone: "",
          WeChat: "",
          WeChatQR: "",
          Facebook: ""
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
        this.showAdd = true;
      },
      saveSuccess() {},
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
      editProd() {},
      delProd() {}
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