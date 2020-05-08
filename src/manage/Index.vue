<template>
  <div id="manage">
    <ul class="menu">
      <li
        class="menu-item"
        v-for="menu in menus"
        @click="changeMenu(menu)"
        :class="{active:menu.router===active}"
        :key="menu.router"
      >{{menu.name}}</li>
    </ul>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: this.$route.name || "banner",
      menus: [
        {
          name: "企业信息",
          router: "compinfo"
        },
        {
          name: "首页轮播",
          router: "banner"
        },
        {
          name: "产品管理",
          router: "products"
        },
        {
          name: "新闻管理",
          router: "article"
        },
        {
          name: "图片中心",
          router: "imgs"
        },
        {
          name: "产品类型",
          router: "prodtype"
        }
      ]
    };
  },
  methods: {
    changeMenu(item) {
      this.$router.push(item.router);
    }
  },
  watch: {
    $route(val) {
      this.active = val.name;
    }
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
  flex: 0 0 140px;
  cursor: pointer;
  color: #bfcbd9;
  background-color: #304156;
  .menu-item {
    font-size: 15px;
    padding: 14px 24px;
    border-bottom: 1px solid #475c77;
    transition: 0.1s;
    &.active {
      color: @active;
      background: #263445;
    }
    &:hover {
      background-color: #263445;
    }
  }
}
.content {
  flex: 1;
  padding: 20px 20px 0;
  position: relative;
}
</style>
