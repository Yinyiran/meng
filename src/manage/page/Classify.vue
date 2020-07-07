<template>
  <div class="classify">
    <div class="classify-header">
      <i class="el-icon-plus" @click="addClassify"></i>
      <i class="el-icon-sort" @click="beginSort"></i>
    </div>
    <div class="classify-list">
      <div class="class-item" v-for="(item,index) in classifys" :key="index">
        <img :src="item.ClassImg" alt />
        <span class="item-name">{{item.ClassName}}</span>
        <i class="el-icon-delete" @click="delClassify(item,index)" />
        <i class="el-icon-edit" @click="editClassify(item)" />
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
      </el-form>
      <div class="footer">
        <el-button size="small" @click="cancelAdd">取消</el-button>
        <el-button size="small" type="primary" @click="onSubmit">保存</el-button>
      </div>
    </el-dialog>
    <sort :visible.sync="isSort" :list="sortList" @confirmSort="saveSort" title="编辑分类">
      <template v-slot:default="{data}">
        <i class="el-icon-delete" @click="delClassify(data.item,data.index)" />
        <i class="el-icon-edit" @click="editClassify(data.item)" />
      </template>
    </sort>
  </div>
</template>

<script>
  import { Data } from "../../service";
  import { MessageBox, Message } from "element-ui";
  import Sort from "../../components/Sort.vue";
  export default {
    data() {
      return {
        form: { ClassName: "" },
        isCreate: false,
        isSort: false,
        sortList: [],
        classifys: []
      };
    },
    components: { Sort },
    created() {
      this.getClassList();
    },
    methods: {
      getClassList() {
        Data.get("/getClassify").then(res => {
          this.classifys = res.data;
        });
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
        MessageBox.confirm(`确定要删除“${item.Name}”么？`).then(res => {
          Data.post("/delClassify", { ClassID: item.ID }).then(res => {
            Message.success("删除成功");
            this.classifys.splice(index, 1);
          });
        });
      },
      onSubmit() {
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
    margin-top: 20px;
  }
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
    text-align: right;
    padding-top: 20px;
  }
</style>