<template>
  <div class="body">
    <div class="login-wrap">
      <div class="title">登 陆</div>
      <el-form ref="form" :model="form" label-width="60px" label-suffix=" :">
        <el-form-item label="用户">
          <el-input size="small" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" size="small" v-model="form.password"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn-warp">
        <el-button size="small" type="info" @click="cancel" v-if="!isLogin && historyLength">取 消</el-button>
        <el-button size="small" type="success" :loading="isLogin" @click="login">登 陆</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Form, FormItem, Button, Input } from "element-ui";
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Input);
import { Http, Message, Cache } from "../../service";
export default {
  data() {
    return {
      isLogin: false,
      form: {
        name: "",
        password: ""
      },
      historyLength: window.history.length,
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ]
      }
    };
  },
  created() {
    Cache.remove("user_info");
  },
  methods: {
    cancel() {
      this.historyLength && window.history.back();
    },
    login() {
      Http.post("login", this.form).then(res => {
        if (res.data.status) {
          Cache.set("user_info", res.data.data);
          window.location.href = `${location.origin}/admin.html`
          this.form.name = "";
          this.form.password = "";
        } else {
          Message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style lang="scss">
.body {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #32353e;
}
.login-wrap {
  position: absolute;
  border-radius: 4px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 230px;
  padding: 30px 60px;
  background-color: #f1f1f1;
  .title {
    font-weight: 700;
    color: #32353e;
    padding-bottom: 20px;
    text-align: center;
  }
  .btn-warp {
    text-align: center;
    margin-top: 40px;
    .el-button {
      margin: 0 20px;
    }
  }
}
</style>
