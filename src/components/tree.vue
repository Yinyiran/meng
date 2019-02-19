<template>
  <el-tree class="tree" :class="{'font-style':!tree.editable}" ref="tree" :data="treeData" highlight-current node-key="id" :default-expanded-keys="[0]" :expand-on-click-node="tree.editable" @node-click="nodeClick">
    <div class="tree-node" slot-scope="{ node, data }">
      <i :class="iconClass(node)"></i>
      <span>{{ node.label }}</span>
      <span class="option" v-if="tree.editable">
        <span class="el-icon-delete option-btn" v-if="data.pid!==-1" @click="dele(node, data)"></span>
        <span class="el-icon-edit-outline option-btn" v-if="data.pid!==-1" @click="edit(data,node)"></span>
        <span class="el-icon-circle-plus-outline option-btn" @click="add(data,node)"></span>
      </span>
    </div>
  </el-tree>
</template>

<script>
import Vue from "vue";
import { Tree } from "element-ui";
Vue.use(Tree);
import { Message, Http } from "../service";
export default {
  props: {
    tree: Object,
    default() {
      return {
        getUrl: "",
        saveUrl: "",
        deleUrl: "",
        label: "",
        editable: true
      };
    },
    catalogId: { type: Number, default: 0 }
  },
  data() {
    return {
      treeData: [],
      refTree: "",
      rootDir: {
        id: 0,
        pid: -1,
        path: "",
        label: this.tree.label
      }
    };
  },
  created() {
    this.getTree();
  },
  methods: {
    formateData(data) {
      let findAllChildren = pid => {
        let catalog = [];
        for (const item of data) {
          if (item.pid === pid) {
            catalog.push({
              id: item.id,
              label: item.name,
              path: item.path,
              pid: item.pid
            });
          }
        }
        return catalog;
      };
      // 转换数据格式
      let formate = parents => {
        for (const item of parents) {
          let children = findAllChildren(item.id);
          if (children.length > 0) {
            item.children = children;
            formate(item.children);
          }
        }
      };
      let newData = findAllChildren(0);
      formate(newData);
      return newData;
    },
    dele(node, data) {
      event.stopPropagation();
      Message.confirm("当前目录及子目录都将被删除, 是否继续?")
        .then(() => {
          let idArrs = this.getAllId(data);
          Http.post(this.tree.deleUrl, idArrs).then(() => {
            this.getTree();
            Message.success("删除成功");
          });
        })
        .catch(() => {});
    },
    getAllId(data) {
      let idArrs = [];
      let getIDs = item => {
        idArrs.push(item.id);
        if (item.children && item.children.length > 0) {
          for (const child of item.children) {
            getIDs(child);
          }
        }
      };
      getIDs(data);
      return idArrs;
    },
    // 编辑和修改
    add(data) {
      event.stopPropagation();
      // 弹窗
      Message.prompt({ title: "创建目录" }).then(({ value }) => {
        let postData = {
          pid: data.id,
          name: value,
          path: data.path,
          type: "add" // 0 为修改 1为添加
        };
        Http.post(this.tree.saveUrl, postData).then(() => {
          this.getTree();
          Message.success("保存成功");
        });
      });
    },
    // 编辑和修改
    edit(data) {
      event.stopPropagation();
      // 弹窗
      Message.prompt({
        title: "更改目录",
        inputValue: data.label
      }).then(({ value }) => {
        let postData = {
          id: data.id,
          name: value,
          type: "edit" // 0 为修改 1为添加
        };
        Http.post(this.tree.saveUrl, postData).then(() => {
          this.getTree();
          Message.success("保存成功");
        });
      });
    },
    getTree() {
      Http.get(this.tree.getUrl).then(res => {
        this.treeData = [];
        this.rootDir.children = this.formateData(res.data);
        this.treeData.push(this.rootDir);
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(this.catalogId);
        });
      });
    },
    nodeClick(data) {
      if (!this.tree.editable) {
        this.$emit("clickTreeData", data);
      }
    },
    iconClass(node) {
      if (node.isLeaf) {
        return "el-icon-document";
      } else {
        return node.expanded ? "el-icon-tickets" : "el-icon-message";
      }
    }
  },
  watch: {
    catalogId(newVal) {
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(newVal);
      });
    }
  }
};
</script>
<style lang="scss"  scoped>
.tree {
  margin: 20px;
  padding: 10px;
}
.font-style {
  /deep/ .el-tree-node__content {
    font-size: 14px;
    height: 34px;
    line-height: 34px;
  }
}

.tree-node {
  position: relative;
  flex: 0 1 100%;
  overflow: hidden;
  box-sizing: border-box;
  padding-right: 80px;
  text-overflow: ellipsis;
  white-space: nowrap;

  .option {
    position: absolute;
    top: 0;
    right: 0;

    .option-btn {
      padding: 4px;
    }
  }
}
</style>
