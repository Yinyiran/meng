<template>
  <div>
    <editor api-key="no-api-key" :init="editConfig" />
  </div>
</template>

<script>
  import Tinymce from "@tinymce/tinymce-vue";

  export default {
    components: {
      editor: Tinymce
    },
    data() {
      const Id = Date.now();
      return {
        Id: Id,
        editConfig: {
          height: 500,
          menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount"
          ],
          toolbar:
            "undo redo | formatselect | bold italic backcolor | \
               alignleft aligncenter alignright alignjustify | \
               bullist numlist outdent indent | removeformat | help"
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