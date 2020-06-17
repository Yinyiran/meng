<template>
  <div>
    <div class="header">
      <el-button size="mini" type="primary" @click="createBan">新增</el-button>
      <el-button size="mini" type="primary" class="m-right" @click="sortBan">排序</el-button>
    </div>
    <el-table :data="banners">
      <el-table-column label="序号" type="index" width="50px" align="center"></el-table-column>
      <el-table-column label="类型" prop="BanTypeText" width="80px" align="center"></el-table-column>
      <el-table-column label="轮播名称" prop="BanName"></el-table-column>
      <el-table-column label="图片">
        <img class="banner-img" slot-scope="{row}" :src="row.BanImg" />
      </el-table-column>
      <el-table-column label="操作" width="100px" align="center">
        <span slot-scope="{row,$index}">
          <el-button size="mini" type="text" @click="editBan(row)">编辑</el-button>
          <el-button size="mini" type="text" @click="deleBan(row,$index)">删除</el-button>
        </span>
      </el-table-column>
    </el-table>
    <new-banner :visible.sync="isCreate" :form="form" @saveSuccess="saveSuccess"></new-banner>
    <sort :visible.sync="isSort" />
  </div>
</template>

<script>
  import { HTTP, BanType } from "../../service";
  import { ServeHost } from "../../service/util";
  import NewBanner from "../component/NewBanner";
  import Sort from "../../components/Sort";
  import { Message, MessageBox } from "element-ui";
  export default {
    components: { Sort, NewBanner },
    created() {
      HTTP.get("/getBanner").then(res => {
        res.data.forEach(item => {
          item.BanImg = [item.BanImg];
          item.BanTypeText = BanType[item.BanType];
        });
        this.banners = res.data;
      });
    },
    data() {
      return {
        banners: [],
        form: {},
        isCreate: false,
        isSort: false
      };
    },
    methods: {
      sortBan() {
        this.isSort = true;
      },
      editBan(row) {
        this.form = row;
        this.isCreate = true;
      },
      deleBan(row, index) {
        MessageBox.confirm("确定要删除这个轮播图么？", { type: "warning" }).then(
          res => {
            HTTP.post("/delBanner", { id: row.BanID }).then(res => {
              this.banners.splice(index, 1);
              Message.success("删除成功");
            });
          }
        );
      },
      createBan() {
        this.form = {
          BanImg: [],
          BanName: "",
          BanTargID: null,
          BanType: 1
        };
        this.isCreate = true;
      },
      saveSuccess(val) {
        val.BanTypeText = BanType[val.BanType];
        if (val.BanID) {
          Object.assign(this.form, val);
        } else {
          this.banners.push(val);
        }

        this.isCreate = false;
      }
    }
  };
</script>

<style lang="less" scoped>
  .header {
    margin-bottom: 10px;
  }
  .banner-img {
    width: 100%;
    height: 40px;
    object-fit: cover;
  }
</style>