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
    <new-banner :visible.sync="isCreate" :banner="form" @saveSuccess="saveSuccess"></new-banner>
    <sort :visible.sync="isSort" :list="sortList" @confirmSort="saveSort" />
  </div>
</template>

<script>
  import { Data, BanType } from "../../service";
  import NewBanner from "../component/NewBanner";
  import Sort from "../../components/Sort";
  export default {
    components: { Sort, NewBanner },
    created() {
      this.getBanner();
    },
    data() {
      return {
        banners: [],
        form: {},
        isCreate: false,
        isSort: false
      };
    },
    computed: {
      sortList() {
        return this.banners.map(item => {
          return {
            ID: item.BanID,
            Name: item.BanName
          };
        });
      }
    },
    methods: {
      getBanner() {
        Data.get("/getBanner").then(res => {
          res.data.forEach(item => {
            item.BanTypeText = BanType[item.BanType];
          });
          this.banners = res.data;
        });
      },
      sortBan() {
        this.isSort = true;
      },
      editBan(row) {
        this.form = row;
        this.isCreate = true;
      },
      deleBan(row, index) {
        this.$messagebox.confirm("确定要删除这个轮播图么？", { type: "warning" }).then(
          res => {
            Data.post("/delBanner", { id: row.BanID }).then(res => {
              this.banners.splice(index, 1);
              this.$message.success("删除成功");
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
        let ban = this.banners.find(bn => bn.BanID === val.BanID);
        if (ban) Object.assign(ban, val);
        else this.banners.push(val);
        this.isCreate = false;
      },
      saveSort(list) {
        Data.post("/sortBanner", list).then(res => {
          this.$message.success("保存成功");
          this.isSort = false;
          this.getBanner();
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .header {
    padding-bottom: 10px;
    border-bottom: 1px solid #e8e8e8;
  }
  .banner-img {
    width: 100%;
    height: 40px;
    object-fit: cover;
  }
</style>