<template>
  <div class="table">
    <el-table :data="data" highlight-current-row style="width: 100%" alin="center">
      <el-table-column align="center" :label="col.label" :width="col.width" v-for="col in options.cols" :key="col.prop" show-overflow-tooltip>
        <template slot-scope="{row}">
          <img class="table-img" v-if="col.type==='img'" :src="row.imgSrc" alt="">
          <span v-else>{{row[col.prop]}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" :width="options.btnaWith || '80px'">
        <template slot-scope="{row,$index}">
          <el-tooltip class="item" v-for="btn in options.btns" :key="btn.icon" effect="dark" :enterable="false" :content="btn.label" placement="top">
            <el-button size="mini" :type="btn.type || 'primary'" :icon="btn.icon" circle plain @click="btn.fn(row,$index)"></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import Vue from "vue";
import { Table, TableColumn, Button, Tooltip } from "element-ui";
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Tooltip);

export default {
  props: {
    data: Array,
    options: Object
  }
};
</script>

<style lang="scss" scoped>
.table-img {
  height: 50px;
  max-width: 100%;
}
</style>
