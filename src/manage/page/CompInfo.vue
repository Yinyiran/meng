<template>
  <el-form ref="formRef" :model="form" label-width="100px" size="small">
    <el-form-item label="账号">
      <el-input v-model="form.UserName"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="form.PassWord"></el-input>
    </el-form-item>
    <el-form-item label="企业名称">
      <el-input v-model="form.CompName"></el-input>
    </el-form-item>
    <el-form-item label="企业Logo">
      <upload-file limit="1" :imgs="form.CompLogo" ref="UpFileRef"></upload-file>
    </el-form-item>
    <el-form-item label="手机">
      <el-input v-model="form.Mobile"></el-input>
    </el-form-item>
    <el-form-item label="微信二维码">
      <upload-file limit="1" :imgs="form.WeChatQR" ref="UpFileRef2"></upload-file>
    </el-form-item>
    <el-form-item label="Facebook">
      <el-input v-model="form.Facebook" placeholder="facebook 地址"></el-input>
    </el-form-item>
    <el-form-item label="Twitter">
      <el-input v-model="form.Twitter" placeholder="twitter 地址"></el-input>
    </el-form-item>
    <el-form-item label="Youtube">
      <el-input v-model="form.Youtube" placeholder="Youtube 地址"></el-input>
    </el-form-item>
    <div class="footer">
      <el-button size="small">取消</el-button>
      <el-button size="small" type="primary" @click="onSubmit">确定修改</el-button>
    </div>
  </el-form>
</template>
<script>
  import UploadFile from "../../components/UploadFile.vue";
  import { Data } from "../../service";
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
      Data.get("/getCompInfo", { CompID: 10000 }).then(res => {
        this.form = res.data;
      });
    },
    methods: {
      async onSubmit() {
        console.log(this.$refs);
        let promiseArr = [
          this.$refs.UpFileRef.upload(),
          this.$refs.UpFileRef2.upload()
        ];
        const [logo, wechatQr] = await Promise.all(promiseArr);
        this.form.CompLogo = logo;
        this.form.WeChatQR = wechatQr;
        let Obj = Object.assign({}, this.form);
        let params = Object.assign(Obj, {
          CompID: 10000,
          CompLogo: this.form.CompLogo.toString(),
          WeChatQR: this.form.WeChatQR.toString()
        });
        Data.post(`/saveCompInfo`, params).then(res => {
          console.log(res);
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