<template>
  <el-dialog
    :title="form.BanID?`编辑轮播图`:'新增轮播图'"
    :visible.sync="visible"
    :before-close="cancelAdd"
    width="800px"
    :append-to-body="true"
  >
    <el-form :model="form" label-width="100px" size="mini" @submit.native.prevent>
      <el-form-item label="轮播名称">
        <el-input v-model="form.BanName" ref="banNameRef" clearable></el-input>
      </el-form-item>
      <el-form-item label="轮播类型">
        <el-select v-model="form.BanType" placeholder="请选择类型" @change="changeType">
          <el-option
            v-for="(label,value) in typeOptions"
            :key="value"
            :label="label"
            :value="Number(value)"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="typeText">
        <el-select v-model="form.BanTargID" :placeholder="`请选择${typeText}`">
          <el-option
            v-for="item in targOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片">
        <upload-file limit="1" :imgs="form.BanImg" ref="UpFileRef"></upload-file>
      </el-form-item>
    </el-form>
    <div class="footer">
      <el-button size="small" @click="cancelAdd">取消</el-button>
      <el-button size="small" type="primary" @click="saveBan">保存</el-button>
    </div>
  </el-dialog>
</template>

<script>
  import UploadFile from "../../components/UploadFile";
  import { Data, BanType } from "../../service/";
  export default {
    props: {
      banner: Object,
      visible: Boolean,
    },
    components: { UploadFile },
    computed: {
      typeText() {
        return this.form.BanType == 1 ? "链接的产品" : "链接的新闻";
      },
    },
    data() {
      return {
        typeOptions: BanType,
        targOptions: [],
        form: {},
        cacheOptions: {},
      };
    },
    watch: {
      visible(val) {
        this.form = Object.assign({}, this.banner);
        if (val) this.getTargList();
        this.$nextTick(() => {
          this.$refs.banNameRef.focus();
        });
      },
    },
    methods: {
      changeType() {
        this.form.BanTargID = null;
        this.getTargList();
      },
      getTargList() {
        let typeNum = this.form.BanType;
        if (this.cacheOptions[typeNum]) {
          this.targOptions = this.cacheOptions[typeNum];
        } else {
          let url = typeNum == 1 ? "/getProdList" : "/getArticle";
          Data.get(url).then((res) => {
            this.targOptions = res.data.map((item) => {
              if (typeNum === 1) {
                return { label: item.ProdName, value: item.ProdID };
              } else {
                return { label: item.ArtTitle, value: item.ArtID };
              }
            });
            this.cacheOptions[typeNum] = this.targOptions;
          });
        }
      },
      cancelAdd() {
        this.$emit("update:visible", false);
      },
      async saveBan() {
        let img = await this.$refs.UpFileRef.upload();
        // let { BanName, BanTargID, BanType, BanID } = this.form;
        // let params = {
        //   BanImg: img[0],
        //   BanName,
        //   BanID,
        //   BanTargID,
        //   BanType: Number(BanType)
        // };
        let params = Object.assign({}, this.form);
        params.BanImg = img.toString();
        params.BanType = Number(this.form.BanType);
        delete params.BanTypeText;
        Data.post("/saveBanner", params).then((res) => {
          this.$message.success("保存成功");
          let Obj = Object.assign(params, {
            BanID: this.form.BanID || res.data.insertId,
            BanImg: img,
          });
          this.$emit("saveSuccess", Obj);
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .footer {
    text-align: right;
  }
</style>