<template>
  <el-form ref="formRef" :model="form" label-width="100px" size="small">
    <el-form-item label="企业名称">
      <el-input v-model="form.CompName"></el-input>
    </el-form-item>
    <el-form-item label="企业Logo">
      <upload-file v-if="isloaded" :limit="3" :imgs="form.CompLogo" ref="UpFileRef"></upload-file>
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
      HTTP.get("/getCompInfo", { CompID: 10000 }).then(res => {
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
        console.log(params);
        return;
        HTTP.post(`/saveCompInfo`, params).then(res => {
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