<template>
  <div>
    <div class="add-wrap">
      <span class="add-btn" v-if="tab.add" @click="tab.add">{{tab.addText}}</span>
    </div>
    <m-table :options="tab" :data="list"></m-table>
  </div>
</template>

<script>
import MTable from "./table.vue";
export default {
  props: {
    tab: Object,
    list: Array
  },
  components: {
    MTable
  }
};
</script>

<style lang="scss" scoped>
.add-wrap {
  margin-bottom: 14px;
  .add-btn {
    display: inline-block;
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 3px;
    font-weight: normal;
    cursor: pointer;
    color: #fff;
    background-color: #409eff;
  }
}
</style>
