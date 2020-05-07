<template>
  <div id="manage">
    <ul class="menu">
      <li
        class="menu-item"
        v-for="menu in menus"
        :class="{active:menu.router===active}"
        :key="menu.router"
      >{{menu.name}}</li>
    </ul>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: "banner",
      menus: [
        {
          name: "首页轮播图",
          router: "banner"
        },
        {
          name: "产品列表",
          router: "product"
        },
        {
          name: "新闻列表",
          router: "news"
        },
        {
          name: "企业信息",
          router: "compInfo"
        },
        {
          name: "产品类型",
          router: "prodType"
        }
      ]
    };
  }
};
</script>
<style lang="less">
@import "../assets/style/color.less";
body {
  margin: 0;
}
#manage {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
}
ul {
  padding: 0;
  margin: 0;
}
li {
  list-style: none;
}
.menu {
  height: 100%;
  width: 200px;
  background-color: @active;
  color: #ffffff;
  .menu-item {
    padding: 20px;
    &.active,
    &:hover {
      background-color: #000;
      cursor: pointer;
    }
  }
}
</style>
