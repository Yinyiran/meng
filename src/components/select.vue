<template>
  <el-select v-model="val" placeholder="请选择" @change="change" filterable clearable>
    <el-option v-for="item in list" :key="item.value" :label="item.label" :value="item.value">
    </el-option>
  </el-select>
</template>
<script>
import Vue from "vue";
import { Select, Option } from "element-ui";
Vue.use(Select);
Vue.use(Option);
import { Http } from "../service";
export default {
  props: {
    options: Object
  },
  data() {
    return {
      list: null,
      val: ""
    };
  },
  created() {
    Http.get(this.options.url).then(res => {
      this.list = res.data.map(item => {
        if (this.options.data === item.id)
          this.val = this.options.data.toString();
        return { value: item.id.toString(), label: item.name };
      });
    });
  },
  methods: {
    change(val) {
      this.options.data = val;
    }
  }
};
</script>
