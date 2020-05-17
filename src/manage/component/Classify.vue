<template>
  <div class="classify">
    <div class="classify-header">
      <el-button size="mini" type="primary" @click="createClassify">新增</el-button>
    </div>
    <div class="classify-list">
      <div class="class-item" v-for="(item,index) in classifys" :key="index">
        <i class="el-icon-rank" />
        <span class="item-name">{{item.ClassName}}</span>
        <i class="el-icon-delete" @click="delClassify(item,index)" />
        <i class="el-icon-edit" @click="editClassify(item)" />
      </div>
    </div>
    <el-dialog
      :title="form.ClassID?`编辑`:'新增'+'分类'"
      :visible.sync="showCreate"
      :before-close="cancel"
      width="400px"
      :append-to-body="true"
    >
      <el-form ref="formRef" :model="form" label-width="80px" size="small">
        <el-form-item label="分类名称">
          <el-input v-model="form.ClassName"></el-input>
        </el-form-item>
      </el-form>
      <div class="footer">
        <el-button size="small" @click="cancel">取消</el-button>
        <el-button size="small" type="primary" @click="onSubmit">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { HTTP } from "../../service";
  import { MessageBox, Message } from "element-ui";
  export default {
    data() {
      return {
        form: { ClassName: "" },
        showCreate: false,
        classifys: []
      };
    },
    created() {
      this.getClassList();
    },
    methods: {
      getClassList() {
        HTTP.get("/getClassify").then(res => {
          this.classifys = res.data;
        });
      },
      createClassify() {
        this.form = { ClassName: "" };
        this.showCreate = true;
      },
      cancel() {
        this.showCreate = false;
        if (!this.form.ClassID) this.form.ClassName = "";
      },
      editClassify(item) {
        Object.assign(this.form, item);
        this.showCreate = true;
      },
      delClassify(item, index) {
        MessageBox.confirm(`确定要删除“${item.ClassName}”么？`).then(res => {
          HTTP.post("/delClassify", { ClassID: item.ClassID }).then(res => {
            Message.success("删除成功");
            this.classifys.splice(index, 1);
          });
        });
      },
      onSubmit() {
        HTTP.post("/saveClassify", this.form).then(res => {
          if (this.form.ClassID) {
            let classItem = this.classifys.find(
              item => item.ClassID === this.form.ClassID
            );
            classItem.ClassName = this.form.ClassName;
          }
          this.showCreate = false;
        });
      }
    }
  };
</script>

<style lang="less">
  .classify-list {
    margin-top: 20px;
  }
  .class-item {
    background-color: #f1f1f1;
    margin: 4px 0;
    padding: 4px 10px;
    display: flex;
    justify-content: center;
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