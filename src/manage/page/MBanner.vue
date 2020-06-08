<template>
  <div>
    <div class="header">
      <el-button size="mini" type="primary" @click="isCreate = true">新增</el-button>
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
        <el-button size="mini" type="text">编辑</el-button>
        <el-button size="mini" type="text">删除</el-button>
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
        <el-form-item label="描述">
          <el-input v-model="form.ClassName"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="form.ClassName"></el-input>
        </el-form-item>
        <el-form-item label="图片">
          <upload-file :imgs="form.ArtCover" ref="UpFileRef"></upload-file>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button size="small" @click="cancelAdd">取消</el-button>
        <el-button size="small" type="primary" @click="onSubmit">保存</el-button>
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
  export default {
    components: { UploadFile, Sort },
    created() {
      HTTP.get("/getBanner").then(res => {
        this.banners = res.data;
      });
    },
    data() {
      return {
        banners: [],
        form: {},
        isCreate: false,
        isSort: false
      };
    },
    methods: {
      sortBan() {
        this.isSort = true;
      },
      cancelAdd() {
        this.isCreate = false;
      },
      onSubmit() {}
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
</style>