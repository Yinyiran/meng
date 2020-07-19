<template>
  <div class="login">
    <div class="title">登 录</div>
    <el-form ref="formRef" class="art-editor" :model="login" label-width="40px" size="mini">
      <el-form-item label="账号">
        <el-input v-model="login.UserName" :autofocus="true"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="login.PassWord"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        login: {}
      };
    }
  };
</script>

<style>
  html {
    height: 100%;
  }
  body {
    height: 100%;
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
    transform: translate(-50%, -50%);
  }
</style>