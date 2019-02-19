<template>
  <div class="no-data" v-if="!length">暂无数据</div>
</template>
<script>
export default {
  props: {
    length: {
      type: Number
    }
  }
};
</script>

<style lang="scss" scoped>
.no-data {
  text-align: center;
  padding: 40px 0;
  color: #666;
}
</style>
