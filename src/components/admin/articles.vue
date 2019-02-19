<template>
  <div class="manage-news">
    <div v-if="!isEdit">
      <page-table :tab="tableCofig" :list="articles"></page-table>
    </div>
    <!-- 编辑页面 -->
    <div class="edit-article" v-if="isEdit">
      <h4>新闻编辑
        <i class="el-icon-close" @click="closeEdit"></i>
      </h4>
      <form-edit :options="options"></form-edit>
    </div>
  </div>
</template>
<script>
import FormEdit from "../form-edit.vue";
import PageTable from "../page-table.vue";
import { Http, Message, API } from "../../service";
export default {
  data() {
    const that = this;
    return {
      articles: [],
      curArticle: {},
      isEdit: false,
      tableCofig: {
        add: this.addArticle,
        addText: "添加文章",
        cols: [
          { label: "文章标题", prop: "title" },
          { label: "图片", prop: "imgSrc", width: "150", type: "img" },
          { label: "推荐", prop: "recommend", width: "80px" },
          { label: "简介", prop: "intro" }
        ],
        btnaWith: "200px",
        btns: [
          {
            label: "编辑",
            icon: "el-icon-edit",
            fn(row) {
              that.editArticle(row);
            }
          },
          {
            label: "删除",
            icon: "el-icon-delete",
            type: "danger",
            fn(row) {
              that.deleArticle(row);
            }
          },
          {
            label: "预览",
            icon: "el-icon-view",
            type: "success",
            fn(row) {
              that.preview(row);
            }
          }
        ]
      },
      options: {
        saveUrl: "saveArticle",
        data: null,
        form: [
          {
            data: "",
            prop: "title",
            col: 12,
            label: "标题"
          },
          {
            data: "",
            col: 12,
            prop: "recommend",
            type: "checkbox",
            label: "" // 是否推荐
          },
          {
            data: "",
            col: 24,
            prop: "intro",
            label: "简介"
          },

          {
            data: "",
            prop: "image",
            limit: 1,
            col: 24,
            prefixType: "article",
            type: "upload",
            label: "图片修改"
          },
          {
            data: "",
            col: 24,
            prop: "details",
            type: "editor",
            label: "文章详情"
          }
        ],
        btns: [
          {
            label: "取消",
            type: "info",
            fn() {
              that.closeEdit();
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
              id: that.curArticle.id
            }
          };
        },
        successfn() {
          that.isEdit = false;
          that.getArticles();
        },
        errorfn() {}
      }
    };
  },
  created() {
    this.getArticles();
  },
  activated() {
    this.isEdit = false;
  },
  methods: {
    getArticles() {
      Http.get("getArticle").then(res => {
        res.data.forEach(img => {
          img.imgSrc = img.image ? API.imgSrc + img.image : "#";
        });
        this.articles = res.data;
      });
    },
    editArticle(row) {
      this.curArticle = Object.assign({}, row);
      this.curArticle.recommend = row.recommend > 0 ? true : false;
      this.options.data = this.curArticle;
      this.isEdit = true;
    },
    closeEdit() {
      this.isEdit = false;
    },
    preview(row) {
      this.$router.push(`/articles/page?id=${row.id}`);
    },
    deleArticle(row) {
      Message.confirm(`确定要删除"${row.title}"吗？`)
        .then(() => {
          Http.post(`deleArticle`, { id: row.id }).then(() => {
            Message.success("删除成功");
            this.getArticles();
          });
        })
        .catch(() => {});
    },
    addArticle() {
      this.isEdit = true;
      this.curArticle = {
        id: 0,
        title: "",
        image: "",
        intro: "",
        details: "",
        recommend: false
      };
      this.options.data = this.curArticle;
    }
  },
  computed: {},
  components: {
    FormEdit,
    PageTable
  }
};
</script>

<style lang="scss"  scoped>
.add-wrap {
  padding-bottom: 14px;
  margin: 0;
  .add-btn {
    padding: 7px 15px;
    font-size: 12px;
    border-radius: 3px;
    font-weight: normal;
    cursor: pointer;
    color: #fff;
    background-color: #409eff;
  }
}

.btn-wrap {
  margin-top: 50px;
  text-align: center;
}

.edit-article {
  position: relative;
  padding: 10px 30px;
}
.el-icon-close {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 20px;
  cursor: pointer;
}
.table-img {
  height: 50px;
}
</style>
