<template>
  <div class="company-info">
    <div class="page-title">用户信息</div>
    <!-- 编辑状态 -->
    <form-edit :options="options"></form-edit>
  </div>
</template>
<script>
import FormEdit from "../form-edit.vue";
import { Cache } from "../../service";
export default {
  data() {
    return {
      options: {
        labelWidth: "130px",
        saveUrl: "saveInfos",
        data: Cache.get("user_info"),
        form: [
          {
            data: "",
            prop: "compName",
            col: 8,
            label: "公司名称"
          },
          {
            data: "",
            prop: "name",
            col: 8,
            label: "用户名"
          },
          {
            data: "",
            prop: "mobile",
            col: 8,
            label: "手机号码"
          },
          {
            data: "",
            prop: "telephone",
            col: 8,
            label: "座机号码"
          },
          {
            data: "",
            prop: "facebook",
            col: 8,
            label: "facebook"
          },
          {
            data: "",
            prop: "facebook_url",
            col: 8,
            label: "facebook地址"
          },
          {
            data: "",
            prop: "twitter",
            col: 8,
            label: "twitter"
          },
          {
            data: "",
            prop: "twitter_url",
            col: 8,
            label: "twitter地址"
          },
          {
            data: "",
            prop: "email",
            col: 8,
            label: "邮箱"
          },
          {
            data: "",
            prop: "compIntro",
            label: "公司简介",
            type: "textarea",
            col: 24
          },
          {
            data: "",
            prop: "compInfos",
            label: "公司主页",
            type: "editor",
            col: 24
          }
        ],
        btns: [
          {
            label: "保存",
            type: "primary",
            action: "submit"
          }
        ],
        successfn(data) {
          Cache.set("user_info", data);
        }
      }
    };
  },
  components: {
    FormEdit
  }
};
</script>

<style lang="scss" scoped>
.company-info {
  padding: 20px;
}

.page-title {
  overflow: hidden;
  margin-bottom: 20px;
  font-weight: 700;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  color: #666;
  font-size: 20px;
}

.btn-wrap {
  text-align: center;
  margin-top: 30px;
  .el-button {
    margin: 0 20px;
  }
}
</style>
