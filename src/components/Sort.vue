<template>
  <el-dialog
    title="拖拽排序"
    :visible.sync="svisible"
    :before-close="cancelSort"
    width="600px"
    :append-to-body="true"
  >
    <div ref="classifysRef" v-if="svisible">
      <div class="class-item" v-for="(item,index) in sortList" :key="index">
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

    computed: {
      svisible() {
        if (this.visible) {
          this.$nextTick(() => {
            new Sortablejs(this.$refs.classifysRef, {
              animation: 100,
              onSort: evt => {
                let item = this.sortList[evt.oldIndex];
                this.sortList.splice(evt.newIndex, 0, item);
                this.sortList.splice(evt.oldIndex + 1, 1);
              }
            });
          });
        }
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
        console.log(this.sortList)
        let sortIds = this.sortList.map(item => item.ID);
        this.$emit("confirmSort", sortIds);
      }
    }
  };
</script>

<style lang="less" scoped>
  .class-item {
    background-color: #f1f1f1;
    margin-bottom: 6px;
    padding: 6px 10px;
    display: flex;
    align-items: center;
    &:hover {
      background-color: #e8e8e8;
    }
    .item-name {
      flex: 1;
      margin: 0 6px;
      vertical-align: top;
    }
    [class^="el-icon-"] {
      padding: 4px;
      vertical-align: top;
      cursor: pointer;
      margin-right: 4px;
    }
  }
  .footer {
    margin-top: 20px;
    text-align: right;
  }
</style>