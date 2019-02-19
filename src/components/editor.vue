<template>
  <div>
    <tinymce :id="ID" v-model="editorContent" :toolbar1="toolbar" :other_options="options" @editorChange="editorChange"></tinymce>
  </div>
</template>
<script>
import tinymce from "vue-tinymce-editor";
export default {
  props: {
    value: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      ID:
        "vue-tinymce-" + +new Date() + ((Math.random() * 1000).toFixed(0) + ""),
      editorContent: this.value,
      options: {
        height: 300,
        content_style: `
            *                         { padding:0; margin:0; }
            html, body                { height:100%; }
            img                       { max-width:100%;height:auto; }
            a                         { text-decoration: none; }
            iframe                    { width: 100%; }
            p                         { line-height:1.6; margin: 0px; }
            table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
            ul,ol                     { list-style-position:inside; }
          `,
        language_url: "/static/zh_CN.js" //This url points to location of persian language file.
      },
      plugins: [
        "paste",
        "importcss",
        "image",
        "code",
        "table",
        "advlist",
        "fullscreen",
        "link",
        "media",
        "lists",
        "textcolor",
        "colorpicker",
        "hr",
        "preview"
      ],
      toolbar: `styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image  media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen `
    };
  },
  methods: {
    editorChange() {
      this.$emit("input", this.editorContent);
    }
  },
  components: {
    tinymce
  }
};
</script>
