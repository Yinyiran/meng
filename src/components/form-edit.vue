<template>
  <el-form :label-width="options.labelWidth || '70px'" size="small" class="form-wrap">
    <el-row>
      <el-col :span="field.col || 12" v-for="(field,key) in options.form" :key="key">
        <el-form-item :label="field.label">
          <!-- 多选 -->
          <m-select v-if="field.type==='select'" :options="field"></m-select>
          <!-- 级联 -->
          <cascader v-else-if="field.type==='cascader'" :options="field"></cascader>
          <!-- 勾选 -->
          <el-checkbox v-else-if="field.type==='checkbox'" v-model="field.data">是否推荐</el-checkbox>
          <!-- 图片上传 -->
          <upload-img v-else-if="field.type==='upload'" :imgStr.sync="field.data" :limit="field.limit" :type="field.prefixType" :maxSize="field.maxSize" :size="field.maxSize"></upload-img>
          <!-- 富文本 -->
          <editor v-else-if="field.type==='editor'" v-model="field.data"></editor>
          <!-- input/textarea -->
          <el-input v-else size="small" v-model="field.data" :disabled="field.disable" :type="field.type || 'text'"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <div class="btn-wrap">
      <el-button v-for="(btn,index) in options.btns" :key="index" :type="btn.type" @click="btnClick(btn)" size="small">{{btn.label}}</el-button>
    </div>
  </el-form>
</template>
 
<script>
import Vue from "vue";
import {
  Form,
  FormItem,
  Tooltip,
  Checkbox,
  Option,
  Button,
  Row,
  Col,
  Input
} from "element-ui";
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Tooltip);
Vue.use(Checkbox);
Vue.use(Row);
Vue.use(Col);
Vue.use(Option);
Vue.use(Button);
Vue.use(Input);
import Editor from "./editor";
import Cascader from "./cascader";
import MSelect from "./select";
import UploadImg from "./upload-img.vue";
import { Http, Message } from "../service";
export default {
  props: {
    options: Object
  },
  created() {
    let form = this.options.form;
    let data = this.options.data;
    for (const key in data) {
      for (let i = 0; i < form.length; i++) {
        form[i].prop === key && (form[i].data = data[key]);
      }
    }
  },
  methods: {
    submit() {
      let data = {};
      let form = this.options.form;
      for (let i = 0; i < form.length; i++) {
        const item = form[i];
        if (item.prop === "recommend") {
          data.recommend = item.data ? 1 : 0;
        } else {
          data[item.prop] = item.data;
        }
      }
      if (this.options.beforefn) {
        let { postData } = this.options.beforefn();
        Object.assign(data, postData);
      }
      Http.post(this.options.saveUrl, data).then(res => {
        if (res.status === 200) {
          Message.success("保存成功!");
          this.options.successfn && this.options.successfn(data, res);
        } else {
          Message.error("保存失败! 失败信息：" + JSON.stringify(res.data));
        }
      });
    },
    btnClick(btn) {
      btn.fn ? btn.fn() : this[btn.action]();
    }
  },
  components: {
    Editor,
    Cascader,
    MSelect,
    UploadImg
  }
};
</script>

<style lang="scss" scoped>
.btn-wrap {
  text-align: center;
  margin-top: 30px;
  .el-button {
    margin: 0 20px;
  }
}
</style>
