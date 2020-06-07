<template>
  <el-dialog
    title="拖拽排序"
    :visible.sync="svisible"
    :before-close="cancelSort"
    width="600px"
    :append-to-body="true"
  >
    <div class="classify-list" ref="classifysRef" v-if="svisible">
      <div class="class-item" v-for="(item,index) in list" :key="index">
        <i class="el-icon-rank" />
        <span class="item-name">{{item.Name}}</span>
      </div>
    </div>
    <div class="footer">
      <el-button size="mini" @click="cancelSort">取消</el-button>
      <el-button size="mini" type="primary" @click="saveSort">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import Sortablejs from "sortablejs";

  export default {
    props: {
      visible: Boolean,
      list: Array
    },
    async created() {
      await this.$nextTick();
      new Sortablejs(this.$refs.classifysRef, {
        animation: 100,
        onSort: evt => {
          let item = this.sortList[evt.oldIndex];
          this.sortList.splice(evt.newIndex, 0, item);
          this.sortList.splice(evt.oldIndex + 1, 1);
        }
      });
    },
    computed: {
      svisible() {
        return this.visible;
      },
      sortList() {
        return [].concat(this.list);
      }
    },
    methods: {
      cancelSort() {
        this.$emit("update:visible", false);
      },
      saveSort() {
        this.$emit("update:list", [].concat(this.sortList));
      }
    }
  };
</script>

<style>
</style>