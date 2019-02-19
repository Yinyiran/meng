<template>
  <div class="edit-catalog">
    <i class="el-icon-close" @click="$emit('close')"></i>
    <form-edit :options="options"></form-edit>
  </div>
</template>

<script>
import FormEdit from "./form-edit.vue";
export default {
  props: {
    curData: Object
  },
  data() {
    let that = this;
    return {
      options: {
        saveUrl: "saveCatalog",
        data: this.curData,
        form: [
          {
            data: "",
            prop: "name",
            col: 24,
            disable: true,
            label: "目录名称"
          },
          {
            data: "一级",
            col: 24,
            disable: true,
            prop: "catalog",
            label: "目录级别"
          },
          {
            data: "",
            prop: "image",
            limit: 1,
            col: 24,
            prefixType: "catalog",
            type: "upload",
            label: "图片修改"
          }
        ],
        btns: [
          {
            label: "取消",
            type: "info",
            fn() {
              that.$emit("close");
            }
          },
          {
            label: "保存",
            type: "primary",
            action: "submit"
          }
        ],
        beforefn() {
          return {
            postData: {
              id: that.curData.id,
              type: "img"
            }
          };
        },
        successfn() {
          that.$emit("reload", "catalog");
          that.$emit("close");
        },
        errorfn() {}
      }
    };
  },
  components: {
    FormEdit
  }
};
</script>

<style lang="scss">
.edit-catalog {
  position: relative;
  background-color: #fff;
  padding: 40px 60px;
  box-sizing: border-box;
  .btns {
    text-align: center;
  }
  .el-icon-close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
