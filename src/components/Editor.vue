<template>
  <editor :api-key="ApiKey" :init="editConfig" />
</template>

<script>
  import Tinymce from "@tinymce/tinymce-vue";
  import { ServeHost } from "../service/util";
  export default {
    components: {
      editor: Tinymce
    },
    data() {
      const Id = Date.now();

      return {
        Id: Id,
        ApiKey: "kbv4la3hq4ypkqzsoxoip3y28xqv5ld9ntu099hzgcj0mxrp",
        editConfig: {
          height: 500,
          language: "zh_CN",
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount"
          ],
          images_upload_url: "/api/uploadFile",
          images_upload_base_path: ServeHost,
          images_upload_credentials: true,
          paste_data_images: true,
          toolbar:
            "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help |paste| image"
        }
      };
    },
    props: {},
    mounted() {},
    methods: {}
  };
</script>

<style>
</style>