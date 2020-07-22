<template>
  <div>
    <span>设置关于我们：</span>
    <el-select v-model="targetID" class="select-wrap" :placeholder="`请选择文章`" clearable>
      <el-option
        v-for="item in targOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
    <el-button class="save-btn" size="small" type="primary" @click="saveAbout">保存</el-button>
  </div>
</template>

<script>
  import { Data } from "../../service";
  export default {
    data() {
      return {
        targetID: "",
        targOptions: {}
      };
    },
    created() {
      this.getArtList();
      this.getCompInfo();
    },
    methods: {
      getCompInfo() {
        Data.get("/getCompInfo", { CompID: 10000 }).then(res => {
          this.targetID = res.data.AboutID;
        });
      },
      getArtList() {
        Data.get("/getArticle").then(res => {
          this.targOptions = res.data.map(item => {
            return { label: item.ArtTitle, value: item.ArtID };
          });
        });
      },
      saveAbout() {
        let param = {
          CompID: 10000,
          AboutID: this.targetID || null
        };
        Data.post(`/saveCompInfo`, param).then(res => {
          this.$message.success("保存成功！");
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .select-wrap {
    width: 400px;
  }
  .save-btn {
    margin-left: 50px;
  }
</style>