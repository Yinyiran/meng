<template>
  <div class="classify">
    <div class="classify-header">
      <el-button size="mini" @click="addClassify">新增分类</el-button>
      <!-- <el-button size="mini" type="primary" @click="beginSort">编辑</el-button> -->
    </div>
    <div class="classify-list">
      <div
        class="class-item"
        v-for="(item,index) in classifys"
        :key="index"
        :class="{active:curIndex===index}"
        @click="change(item,index)"
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
          <upload-file :imgs="form.ClassImg" size="50px" ref="UpFileRef"></upload-file>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button size="small" @click="cancelAdd">取消</el-button>
        <el-button size="small" type="primary" @click="onSubmit">保存</el-button>
      </div>
    </el-dialog>
    <!-- <sort :visible.sync="isSort" :list="sortList" @confirmSort="saveSort" title="编辑分类">
      <template v-slot:default="{data}">
        <i class="el-icon-delete" @click="delClassify(data.item,data.index)" />
      </template>
    </sort>-->
  </div>
</template>

<script>
  import { Data } from "../../service";
  import { MessageBox, Message } from "element-ui";
  import Sort from "../../components/Sort.vue";
  import UploadFile from "../../components/UploadFile";
  export default {
    data() {
      return {
        form: { ClassName: "", ClassImg: "" },
        isCreate: false,
        isSort: false,
        sortList: [],
        curIndex: 0,
        classifys: []
      };
    },
    components: { Sort, UploadFile },
    created() {
      this.getClassList();
    },
    methods: {
      getClassList() {
        Data.get("/getClassify").then(res => {
          this.classifys = res.data;
          this.classifys.unshift({
            ClassID: 0,
            ClassName: "全部"
          });
        });
      },
      change(item, index) {
        if (this.curIndex === index) return;
        this.$emit("change", item.ClassID);
        this.curIndex = index;
      },
      addClassify() {
        this.form = { ClassName: "" };
        this.isCreate = true;
      },
      async beginSort() {
        this.isSort = true;
        this.sortList = this.classifys.map(item => {
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
        this.form.ClassImg = await this.$refs.UpFileRef.upload();
        Data.post("/saveClassify", this.form).then(res => {
          // 更新数据
          if (this.form.ClassID) {
            let classItem = this.classifys.find(
              item => item.ClassID === this.form.ClassID
            );
            classItem.ClassName = this.form.ClassName;
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
  .classify-list {
    margin-top: 15px;
  }
  .class-item {
    margin-bottom: 6px;
    padding: 6px 5px;
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
      background-color: #e8e8e8;
    }
    .item-img {
      width: 20px;
      height: 20px;
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
      padding: 4px;
      vertical-align: middle;
      font-size: 12px;
      vertical-align: top;
      cursor: pointer;
      &:hover {
        color: red;
      }
    }
  }
  .footer {
    text-align: right;
    padding-top: 20px;
  }
</style>