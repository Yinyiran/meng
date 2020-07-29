<template>
  <editor :api-key="ApiKey" :init="editConfig" v-model="editContent" @onChange="change" />
</template>

<script>
  import Tinymce from "@tinymce/tinymce-vue";
  import { UtilService, Data } from "../service";
  export default {
    props: {
      value: {
        type: String,
        default: "",
      },
      height: {
        type: String,
        default: "480",
      },
    },
    model: {
      prop: "value",
      event: "change",
    },
    components: {
      editor: Tinymce,
    },
    methods: {
      change() {
        this.$emit("change", this.editContent);
      },
    },
    watch: {
      value(val) {
        this.editContent = val || "";
      },
    },
    data() {
      return {
        editContent: this.value,
        ApiKey: "kbv4la3hq4ypkqzsoxoip3y28xqv5ld9ntu099hzgcj0mxrp",
        editConfig: {
          height: Number(this.height),
          language: "zh_CN",
          plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount",
          ],
          images_upload_base_path: UtilService.ServeHost,
          images_upload_credentials: true,
          toolbar: `undo redo | formatselect fontsizeselect | bold italic fontsizes forecolor backcolor underline strikethrough  |
                    formats blockformats fontformats | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |
                    removeformat | link image table | preview`,
          images_upload_handler: async (blobInfo, success, failure) => {
            let file = { file: blobInfo.blob(), filehash: "" };
            await UtilService.getFileHash([file]);
            let { data } = await Data.post("/fileExist", [file.filehash]);
            let existpath = data[file.filehash];
            if (existpath) {
              success(existpath);
            } else {
              let formData = new FormData();
              formData.append(`file_0`, file.file);
              formData.append(`file_0`, `${file.filehash}`);
              UtilService.UpLoadFile(formData).then((res) => {
                res.data.forEach((url) => {
                  success(url);
                });
              });
            }
          },
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
        },
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
    },
  };
</script>

<style>
</style>