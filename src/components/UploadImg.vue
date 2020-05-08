<template>
  <div>
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :show-file-list="!sigle"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <div v-if="sigle">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </div>
      <i v-else class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt />
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    sigle: Boolean,
    multi: Boolean
  },
  data() {
    return {
      dialogVisible: false,
      imageUrl: "",
      dialogImageUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload() {},
    handlePictureCardPreview() {
      this.dialogVisible = true;
    },
    handleRemove() {}
  }
};
</script>

<style>
</style>