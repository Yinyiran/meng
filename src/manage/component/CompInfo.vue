<template>
  <el-form ref="formRef" :model="form" label-width="100px" size="small">
    <el-form-item label="企业名称">
      <el-input v-model="form.CompName"></el-input>
    </el-form-item>
    <el-form-item label="企业Logo">
      <upload-file :limitNum="10" :multi="true" ref="UpFileRef"></upload-file>
    </el-form-item>
    <el-form-item label="手机">
      <el-input v-model="form.Mobile"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="form.Telephone"></el-input>
    </el-form-item>
    <el-form-item label="微信">
      <el-input v-model="form.WeChat"></el-input>
    </el-form-item>
    <el-form-item label="微信二维码">
      <el-input v-model="form.WeChatQR"></el-input>
    </el-form-item>
    <el-form-item label="Facebook">
      <el-input v-model="form.Facebook"></el-input>
    </el-form-item>
    <div class="footer">
      <el-button size="small">取消</el-button>
      <el-button size="small" type="primary" @click="onSubmit">确定修改</el-button>
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
        form: {
          CompName: "",
          CompLogo: "",
          Mobile: "",
          Telephone: "",
          WeChat: "",
          WeChatQR: "",
          Facebook: ""
        }
      };
    },
    created() {
      HTTP.get("/getCompInfo", { CompID: 10000 }).then(res => {
        Object.assign(this.form, res.data);
      });
    },
    methods: {
      async onSubmit() {
        this.form.CompLogo = await this.$refs.UpFileRef.upload();
        let params = Object.assign({CompID:10000},this.form)
        HTTP.post(`/saveCompInfo`, params).then(res => {
          Message.success("保存成功！");
        });
      }
    }
  };
</script>

<style lang="less">
  .el-input.el-input--small {
    width: 450px;
  }
  .footer {
    margin-top: 40px;
    padding-left: 200px;
    text-align: left;
  }
</style>