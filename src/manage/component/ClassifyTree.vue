<template>
  <div class="classify">
    <div class="classify-header">
      <el-button size="mini" @click="addClassify">新增分类</el-button>
      <el-button size="mini" @click="beginSort">排序</el-button>
    </div>
    <div class="classify-list">
      <div
        class="class-item"
        v-for="(item,index) in classifys"
        :key="index"
        :class="{active:value===item.ClassID}"
        @click="change(item)"
      >
        <img class="item-img" :src="item.ClassImg" alt />
        <span class="item-name">{{item.ClassName}}</span>
        <span class="item-btn" v-if="item.ClassID>0">
          <i class="el-icon-delete" @click="delClassify(item,index)" />
          <i class="el-icon-edit" @click="editClassify(item)" />
        </span>
      </div>
    </div>
    <el-dialog
      :title="form.ClassID?`编辑`:'新增'+'分类'"
      :visible.sync="isCreate"
      :before-close="cancelAdd"
      width="400px"
      :append-to-body="true"
    >
      <el-form :model="form" label-width="80px" size="small">
        <el-form-item label="分类名称">
          <el-input v-model="form.ClassName"></el-input>
        </el-form-item>
        <el-form-item label="分类图片">
          <upload-file :imgs="form.ClassImg" size="50px" limit="1" ref="UpFileRef"></upload-file>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button size="small" @click="cancelAdd">取消</el-button>
        <el-button size="small" type="primary" @click="onSubmit">保存</el-button>
      </div>
    </el-dialog>
    <sort :visible.sync="isSort" :list="sortList" @confirmSort="saveSort" title="分类排序"></sort>
  </div>
</template>

<script>
  import { Data } from "../../service";
  import { MessageBox, Message } from "element-ui";
  import Sort from "../../components/Sort.vue";
  import UploadFile from "../../components/UploadFile";
  export default {
    props: {
      value: Number
    },
    data() {
      return {
        form: { ClassName: "", ClassImg: "" },
        isCreate: false,
        isSort: false,
        sortList: [],
        classifys: []
      };
    },
    components: { Sort, UploadFile },
    created() {
      this.getClassList();
    },
    model: {
      event: "input",
      prop: "value"
    },
    methods: {
      getClassList() {
        Data.get("/getClassify").then(res => {
          this.classifys = res.data;
          this.classifys.unshift({
            ClassID: 0,
            ClassImg: "",
            ClassName: "全部"
          });
        });
      },
      change(item) {
        if (this.value === item.ClassID) return;
        this.$emit("change", item.ClassID);
        this.$emit("input", item.ClassID);
      },
      addClassify() {
        this.form = { ClassName: "" };
        this.isCreate = true;
      },
      async beginSort() {
        this.isSort = true;
        let list = this.classifys.filter(item => item.ClassID !== 0);
        this.sortList = list.map(item => {
          return {
            ID: item.ClassID,
            Name: item.ClassName
          };
        });
      },
      saveSort(list) {
        Data.post("/sortClassify", list).then(res => {
          Message.success("保存成功");
          this.isSort = false;
          this.getClassList();
        });
      },
      cancelSort() {
        this.isSort = false;
      },
      cancelAdd() {
        this.isCreate = false;
        if (!this.form.ClassID) this.form.ClassName = "";
      },
      editClassify(item) {
        Object.assign(this.form, item);
        this.isCreate = true;
      },
      delClassify(item, index) {
        MessageBox.confirm(`确定要删除“${item.ClassName}”么？`).then(res => {
          Data.post("/delClassify", { ClassID: item.ClassID }).then(res => {
            Message.success("删除成功");
            this.classifys.splice(index, 1);
          });
        });
      },
      async onSubmit() {
        let imgs = await this.$refs.UpFileRef.upload();
        this.form.ClassImg = imgs.join();
        Data.post("/saveClassify", this.form).then(res => {
          // 更新数据
          if (this.form.ClassID) {
            let classItem = this.classifys.find(
              item => item.ClassID === this.form.ClassID
            );
            classItem.ClassName = this.form.ClassName;
            classItem.ClassImg = imgs;
          } else {
            Object.assign(this.form, res.data);
            this.classifys.push(this.form);
          }
          this.isCreate = false;
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  @import url("../../assets/style/color.less");
  .classify {
    padding-top: 10px;
  }
  .classify-header {
    padding: 10px;
    border-bottom: 1px solid #e8e8e8;
  }
  .class-item {
    padding: 5px 10px;
    display: flex;
    cursor: pointer;
    font-size: 15px;
    align-items: center;
    border-bottom: 1px solid #e8e8e8;
    .item-btn {
      display: none;
    }
    &:hover {
      background-color: #e8e8e8;
      .item-btn {
        display: inline-block;
      }
    }
    &.active {
      background-color: #f5f5f5;
      color: @active;
    }
    .item-img {
      width: 30px;
      height: 30px;
      vertical-align: middle;
      object-fit: cover;
    }
    .item-name {
      flex: 1;
      margin: 0 6px;
      vertical-align: middle;
      vertical-align: top;
    }

    [class^="el-icon-"] {
      padding: 3px;
      vertical-align: middle;
      font-size: 14px;
      vertical-align: top;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
  .footer {
    text-align: right;
    padding-top: 30px;
  }
</style>