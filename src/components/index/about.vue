<template>
  <div class="about" v-html="compInfos"></div>
</template>
<script>
import { Http } from "../../service";
export default {
  data() {
    return {
      compInfos: ""
    };
  },
  created() {
    Http.get("web/getInfos").then(res => {
      this.compInfos = res.data.compInfos;
    });
  }
};
</script>
<style lang="scss">
.about {
  margin: 0 auto;
  padding: 10px;
  width: 1000px;
}
</style>
