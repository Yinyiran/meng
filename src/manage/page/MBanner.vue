<template>
  <div>
    <div class="header">
      <el-button size="mini" type="primary" @click="createBan">新增</el-button>
      <el-button size="mini" type="primary" class="m-right" @click="sortBan">排序</el-button>
    </div>
    <el-table :data="banners">
      <el-table-column label="序号" type="index" width="50px" align="center"></el-table-column>
      <el-table-column label="图片">
        <img class="banner-img" slot-scope="{row}" :src="row.BanImg" />
      </el-table-column>
      <el-table-column label="备注" prop="BanIntro"></el-table-column>
      <el-table-column label="类型" prop="BanType" width="50px" align="center"></el-table-column>
      <el-table-column label="操作" width="100px" align="center">
        <span slot-scope="{row,$index}">
          <el-button size="mini" type="text" @click="editBan(row)">编辑</el-button>
          <el-button size="mini" type="text" @click="deleBan(row,$index)">删除</el-button>
        </span>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="form.ClassID?`编辑`:'新增'"
      :visible.sync="isCreate"
      :before-close="cancelAdd"
      width="800px"
      :append-to-body="true"
    >
      <el-form :model="form" label-width="80px" size="small">
        <el-form-item label="名称">
          <el-input v-model="form.BanName"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.BanType" placeholder="请选择类型" @change="changeType">
            <el-option
              v-for="item in typeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select
            v-model="form.BanTargID"
            placeholder="请选择产品"
            filterable
            remote
            :remote-method="getTargList"
          >
            <el-option
              v-for="item in targOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="图片">
          <upload-file :imgs="form.BanImg" ref="UpFileRef"></upload-file>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button size="small" @click="cancelAdd">取消</el-button>
        <el-button size="small" type="primary" @click="saveBan">保存</el-button>
      </div>
    </el-dialog>
    <sort :visible.sync="isSort" />
  </div>
</template>

<script>
  import { HTTP } from "../../service";
  import { ServeHost } from "../../service/util";
  import UploadFile from "../../components/UploadFile";
  import Sort from "../../components/Sort";
  import { Message, MessageBox } from "element-ui";
  export default {
    components: { UploadFile, Sort },
    created() {
      HTTP.get("/getBanner").then(res => {
        res.data.forEach(item => {
          item.BanImg = [item.BanImg];
        });
        this.banners = res.data;
      });
    },
    data() {
      return {
        banners: [],
        form: {},
        typeOptions: [
          { label: "产品", value: 1 },
          { label: "新闻", value: 2 }
        ],
        targOptions: [],
        isCreate: false,
        isSort: false
      };
    },
    methods: {
      sortBan() {
        this.isSort = true;
      },
      editBan(row) {
        this.form = row;
        this.isCreate = true;
      },
      deleBan(row, index) {
        MessageBox.confirm("确定要删除这个轮播图么？", { type: "warning" }).then(
          res => {
            HTTP.post("/delBanner", { id: row.BanID }).then(res => {
              this.banners.splice(index, 1);
              Message.success("删除成功");
            });
          }
        );
      },
      changeType() {
        this.targOptions = [];
      },
      getTargList() {
        let url = this.form.BanType == 1 ? "/getProducts" : "/getArticle";
        HTTP.get(url).then(res => {
          this.targOptions = res.data.map(item => {
            let label = this.form.BanType === 1 ? item.ProdName : item.ArtTitle;
            let value = this.form.BanType === 1 ? item.ProdID : item.ArtID;
            return { label, value };
          });
        });
      },
      createBan() {
        this.form = {
          BanImg: [],
          BanName: "",
          BanTargID: null,
          BanType: 1
        };
        this.isCreate = true;
      },
      cancelAdd() {
        this.isCreate = false;
      },
      async saveBan() {
        let img = await this.$refs.UpFileRef.upload();
        let { BanName, BanTargID, BanType } = this.form;
        let params = { BanImg: img, BanName, BanTargID, BanType };
        HTTP.post("/saveBanner", params).then(res => {
          Message.success("保存成功");
          this.isCreate = false;
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .header {
    margin-bottom: 10px;
  }
  .banner-img {
    width: 100%;
    height: 40px;
    object-fit: cover;
  }
  .footer {
    text-align: right;
  }
</style>