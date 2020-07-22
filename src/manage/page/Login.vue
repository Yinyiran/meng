<template>
  <div class="login-wrap">
    <div class="login">
      <div class="title">登 录</div>
      <el-form ref="formRef" class="art-editor" :model="loginForm" label-width="40px" size="mini">
        <el-form-item label="账号">
          <el-input v-model="loginForm.UserName" @keyup.enter.native="loginWeb" autofocus></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.PassWord" @keyup.enter.native="loginWeb" type="password"></el-input>
        </el-form-item>
      </el-form>
      <el-button type="primary" size="mini" @click="loginWeb">登陆</el-button>
    </div>
  </div>
</template>

<script>
  import { Data } from "../../service";
  import { Message } from "element-ui";
  export default {
    data() {
      return {
        loginForm: {}
      };
    },
    methods: {
      loginWeb() {
        Data.post("/login", this.loginForm)
          .then(res => {
            sessionStorage.setItem("userid","loginSuccess")
            this.$router.push("/compinfo").catch(()=>{});
          })
          .catch(res => {
            Message.error("账号或密码错误，请重新尝试！");
          });
      }
    }
  };
</script>

<style lang="less" scoped>
  .login-wrap {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(#7dddfd, #049acd);
  }
  .title {
    padding: 30px;
    text-align: center;
  }
  .login {
    padding: 0px 50px 30px;
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 4px;
    background-color: #fff;
    transform: translate(-50%, -80%);
  }
</style>