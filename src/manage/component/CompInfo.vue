<template>
  <el-form ref="formRef" :model="form" label-width="100px" size="small">
    <el-form-item label="企业名称">
      <el-input v-model="form.CompName"></el-input>
    </el-form-item>
    <el-form-item label="企业Logo">
      <upload-img :sigle="true"></upload-img>
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
      <el-form-item>
        <el-button>取消</el-button>
        <el-button type="primary" @click="onSubmit">确定修改</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>
<script>
import UploadImg from "../../components/UploadImg";
export default {
  components: { UploadImg },
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
  methods: {
    onSubmit() {
      console.log("submit!");
    }
  }
};
</script>

<style lang="less">
.el-form-item {
  width: 450px;
}
.footer {
  margin-top: 40px;
  text-align: center;
}
</style>