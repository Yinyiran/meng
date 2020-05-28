<template>
  <editor :api-key="ApiKey" :init="editConfig" />
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
        ApiKey: "kbv4la3hq4ypkqzsoxoip3y28xqv5ld9ntu099hzgcj0mxrp",
        editConfig: {
          height: 500,
          // menubar: false,
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount"
          ],
  //           menu: {
  //   file: { title: 'File', items: 'newdocument restoredraft | preview | print ' },
  //   edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
  //   view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
  //   insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
  //   format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat' },
  //   tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
  //   table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
  //   help: { title: 'Help', items: 'help' }
  // }
          toolbar:
            "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help | image"
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