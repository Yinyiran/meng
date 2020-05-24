<template>
  <el-form ref="formRef" :model="form" label-width="100px" size="small">
    <el-form-item label="产品名称">
      <el-input v-model="form.CompName"></el-input>
    </el-form-item>
    <el-form-item label="产品图片">
      <upload-file v-if="isloaded" :imgs="form.CompLogo" ref="UpFileRef"></upload-file>
    </el-form-item>
    <el-form-item label="产品简介">
      <el-input v-model="form.Mobile"></el-input>
    </el-form-item>
    <el-form-item label="所属分类">
      分类选择
    </el-form-item>
    <el-form-item label="同类产品">
      选择产品
    </el-form-item>
    <div class="footer">
      <el-button size="small">取消</el-button>
      <el-button size="small" type="primary" @click="onSubmit">保存</el-button>
    </div>
  </el-form>
</template>
<script>
  import UploadFile from "../../components/UploadFile.vue";
  import { HTTP } from "../../service";
  import { Message } from "element-ui";

  export default {
    components: { UploadFile },
    data() {
      return {
        isloaded: false,
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
        let logo = res.data.CompLogo;
        try {
          res.data.CompLogo = logo ? JSON.parse(logo) : [];
        } catch (error) {
          res.data.CompLogo = [];
        }
        this.form = res.data;
        this.isloaded = true;
      });
    },
    methods: {
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