<template>
  <el-cascader :options="list" clearable placeholder="此处可搜索" filterable change-on-select @change="change" v-model="options.data">
  </el-cascader>
</template>
<script>
import Vue from "vue";
import { Cascader } from "element-ui";
Vue.use(Cascader);
import { Http } from "../service";
export default {
  props: {
    options: Object
  },
  data() {
    return {
      list: []
    };
  },
  created() {
    Http.get(this.options.url).then(res => {
      this.list = this.formateData(res.data);
    });
  },
  methods: {
    // 选择
    change(val) {
      this.options.data = val;
    },
    formateData(data) {
      let findAllChildren = pid => {
        let list = [];
        for (const item of data) {
          if (item.pid === pid) {
            list.push({
              value: item.id,
              label: item.name
            });
          }
        }
        return list;
      };
      // 转换数据格式
      let formate = parents => {
        for (const item of parents) {
          let children = findAllChildren(item.value);
          if (children.length > 0) {
            item.children = children;
            formate(item.children);
          }
        }
      };
      let newData = findAllChildren(0);
      formate(newData);
      return newData;
    }
  }
};
</script>
