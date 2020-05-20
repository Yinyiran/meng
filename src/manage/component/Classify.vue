<template>
  <div class="classify">
    <div class="classify-header">
      <el-button size="mini" type="primary" @click="addClassify">新增</el-button>
      <span class="sort-btns">
        <el-button size="mini" type="primary" @click="beginSort">排序</el-button>
      </span>
    </div>
    <div class="classify-list">
      <div class="class-item" v-for="(item,index) in classifys" :key="index">
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
    <el-dialog
      title="拖拽排序"
      :visible.sync="isSort"
      :before-close="cancelSort"
      width="600px"
      :append-to-body="true"
    >
      <div class="classify-list" ref="classifysRef" v-if="isSort">
        <div class="class-item" v-for="(item,index) in classifys" :key="index">
          <i class="el-icon-rank" />
          <span class="item-name">{{item.ClassName}}</span>
        </div>
      </div>
      <div class="footer">
        <el-button size="mini" @click="cancelSort">取消</el-button>
        <el-button size="mini" type="primary" @click="saveSort">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { HTTP } from "../../service";
  import { MessageBox, Message } from "element-ui";
  import Sortablejs from "sortablejs";
  export default {
    data() {
      return {
        form: { ClassName: "" },
        isCreate: false,
        isSort: false,
        sortIds: [],
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
      addClassify() {
        this.form = { ClassName: "" };
        this.isCreate = true;
      },
      async beginSort() {
        this.isSort = true;
        this.sortIds = this.classifys.map(item => item.ClassID);
        await this.$nextTick();
        new Sortablejs(this.$refs.classifysRef, {
          animation: 100,
          onSort: evt => {
            let item = this.sortIds[evt.oldIndex];
            this.sortIds.splice(evt.newIndex, 0, item);
            this.sortIds.splice(evt.oldIndex + 1, 1);
          }
        });
      },
      saveSort() {
        HTTP.post("/sortClassify", this.sortIds).then(res => {
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
          HTTP.post("/delClassify", { ClassID: item.ClassID }).then(res => {
            Message.success("删除成功");
            this.classifys.splice(index, 1);
          });
        });
      },
      onSubmit() {
        HTTP.post("/saveClassify", this.form).then(res => {
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

<style lang="less">
  .classify-list {
    margin-top: 20px;
  }
  .sort-btns {
    float: right;
  }
  .class-item {
    background-color: #f1f1f1;
    margin: 4px 0;
    padding: 4px 10px;
    display: flex;
    align-items: center;
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