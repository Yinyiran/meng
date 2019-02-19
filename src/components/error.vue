<template>
  <div class="error">
    出错了，错误码：{{status}},错误信息：{{errorMsg}}
  </div>
</template>
<script>
import { Query } from "../service";
export default {
  data() {
    return {
      status: Query("status"),
      errorMsg: Query("message")
    };
  }
};
</script>
