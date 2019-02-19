<template>
  <div>
    <!-- 产品 -->
    <div class="prod-list" v-if="!isEdit">
      <page-table :tab="tableCofig" :list="evaluateList"></page-table>
    </div>
    <div class="edit-prod-wrap" v-else>
      <form-edit :options="options"></form-edit>
    </div>
  </div>
</template>

<script>
import { Http, Message } from "../../service";
import FormEdit from "../form-edit.vue";
import PageTable from "../page-table.vue";
export default {
  props: {
    prod: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    const that = this;
    return {
      isEdit: false,
      evaluateList: [],
      curEval: {
        id: 0,
        recommend: false,
        prod_id: null,
        user_name: "",
        user_avatar: "",
        evaluate: "",
        intro: ""
      },
      prodList: [],
      tableCofig: {
        add: this.add,
        addText: "添加评价",
        cols: [
          { label: "姓名", prop: "name" },
          { label: "一句", prop: "intro" },
          { label: "推荐", prop: "recommend" }
        ],
        btnaWith: "200px",
        btns: [
          {
            label: "编辑",
            icon: "el-icon-edit",
            fn(index, row) {
              that.edit(index, row);
            }
          },
          {
            label: "删除",
            icon: "el-icon-delete",
            type: "danger",
            fn(index, row) {
              that.dele(index, row);
            }
          }
        ]
      },
      options: {
        saveUrl: "saveEvaluate",
        data: null,
        labelWidth: "100px",
        form: [
          {
            data: "",
            prop: "name",
            col: 6,
            label: "用户姓名"
          },
          {
            data: "",
            prop: "recommend",
            type: "checkbox",
            col: 6,
            label: ""
          },
          {
            data: "",
            prop: "prod_id",
            url: "getProduct?simple=true",
            type: "select",
            col: 6,
            label: "选择商品"
          },
          {
            data: "",
            col: 24,
            prop: "intro",
            label: "一句话"
          },
          {
            data: "",
            prop: "avatar",
            limit: 1,
            col: 24,
            prefixType: "product",
            type: "upload",
            label: "头像"
          },
          {
            data: "",
            col: 24,
            type: "editor",
            prop: "evaluate",
            label: "评价"
          }
        ],
        btns: [
          {
            label: "取消",
            type: "info",
            fn() {
              that.isEdit = false;
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
              id: that.curEval.id || 0
            }
          };
        },
        successfn() {
          that.getEvaluate();
          that.isEdit = false;
        },
        errorfn() {}
      }
    };
  },
  created() {
    this.getEvaluate();
  },
  activated() {
    this.isEdit = false;
  },
  methods: {
    getEvaluate() {
      if (this.prod.id) {
        this.$set(this.curEval, "prod_id", this.prod.id);
        Http.get(`getEvaluate?prodID=${this.prod.id}`).then(res => {
          this.evaluateList = res.data;
        });
      } else {
        Http.get(`getEvaluate`).then(res => {
          this.evaluateList = res.data;
        });
      }
    },
    add() {
      this.isEdit = true;
      this.curEval = {
        id: 0,
        evaluate: "",
        intro: "",
        recommend: false,
        avatar: "",
        prod_id: this.prod.id || null,
        name: ""
      };
      this.options.data = this.curEval;
    },
    dele(row) {
      Message.confirm("确定要删除这条评论么？")
        .then(() => {
          Http.post("deleEvaluate", { id: row.id }).then(() => {
            Message.success("删除成功");
            this.getEvaluate();
          });
        })
        .catch(() => {});
    },
    cancel() {
      this.isEdit = false;
      this.curEval = null;
    },
    edit(data) {
      this.isEdit = true;
      this.curEval = Object.assign({}, data);
      this.curEval.recommend = data.recommend > 0 ? true : false;
      this.options.data = this.curEval;
    }
  },
  components: {
    FormEdit,
    PageTable
  }
};
</script>
<style lang="scss">
.btn-wrap {
  margin-top: 50px;
  text-align: center;
}
.add-btn {
  padding-bottom: 14px;
}
.evaluate-edit .title {
  padding: 20px;
}
.prod_info {
  margin-left: 30px;
  font-size: 15px;
}
</style>
