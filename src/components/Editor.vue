<template>
  <editor :api-key="ApiKey" :init="editConfig" v-model="editContent" @onChange="change" />
</template>

<script>
  import Tinymce from "@tinymce/tinymce-vue";
  import { ServeHost, UpLoadFile } from "../service/util";
  import { Data } from "../service";
  export default {
    props: {
      value: {
        type: String,
        default: ""
      }
    },
    model: {
      prop: "value",
      event: "change"
    },
    components: {
      editor: Tinymce
    },
    methods: {
      change() {
        this.$emit("change", this.editContent);
      }
    },
    watch: {
      value(val) {
        this.editContent = val || "";
      }
    },
    data() {
      return {
        editContent: this.value,
        ApiKey: "kbv4la3hq4ypkqzsoxoip3y28xqv5ld9ntu099hzgcj0mxrp",
        editConfig: {
          height: 500,
          language: "zh_CN",
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount"
          ],
          images_upload_base_path: ServeHost,
          images_upload_credentials: true,
          toolbar: `undo redo | formatselect fontsizeselect | bold italic fontsizes forecolor backcolor underline strikethrough  |
                          formats blockformats fontformats | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |
                          removeformat | link image table | preview`,
          images_upload_handler: (blobInfo, success, failure) => {
            let formData = new FormData();
            formData.append("file", blobInfo.blob(), blobInfo.filename());
            // Data.post("/uploadFile",formData);
            UpLoadFile(formData).then(res=>{
              res.data.forEach(url=>{
                success(url)
              })
            })
            // success("/resource/img/2020-06-03/1591175209134.jpg");
          }
          // setup: editor => {
          //   //设置自定义功能的按钮
          //   editor.ui.registry.addButton("imageUpload", {
          //     //单个按钮，此处的uploading是该按钮的名称
          //     tooltip: "上传图片", //鼠标放上去后现在是内容.
          //     text: "图片",
          //     // icon: "image",
          //     onAction: () => {
          //       console.log("uploadimg");
          //       this.dialogVisible = true;
          //       this.editor = editor;
          //       this.imageList = [];
          //     }
          //   });
          // }
        }
        // menu: {
        //   file: {
        //     title: "File",
        //     items: "newdocument restoredraft | preview | print "
        //   },
        //   edit: {
        //     title: "Edit",
        //     items: "undo redo | cut copy paste | selectall | searchreplace"
        //   },
        //   view: {
        //     title: "View",
        //     items:
        //       "code | visualaid visualchars visualblocks | spellchecker | preview fullscreen"
        //   },
        //   insert: {
        //     title: "Insert",
        //     items:
        //       "image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime"
        //   },
        //   format: {
        //     title: "Format",
        //     items:
        //       "bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat"
        //   },
        //   tools: {
        //     title: "Tools",
        //     items: "spellchecker spellcheckerlanguage | code wordcount"
        //   },
        //   table: {
        //     title: "Table",
        //     items: "inserttable | cell row column | tableprops deletetable"
        //   },
        //   help: { title: "Help", items: "help" }
        // }
      };
    }
  };
</script>

<style>
</style>