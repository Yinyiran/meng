<template>
  <div>编辑轮播图</div>
</template>

<script>
  export default {
    created() {
      let arr = [1, 2, 3, 2, 3, 1, 4, 5, 6, 7];
      let a = arr.reduce((pre, cur, index, arr) => {
        console.log('pre',pre)
        return Math.max(pre, cur);
        // if (cur > 3) pre.push(cur);
        // if (!pre.includes(cur)) pre.push(cur);
        return pre;
      });
      console.log(a);
    },
    data() {
      return {};
    }
  };
</script>

<style lang="less">
</style>