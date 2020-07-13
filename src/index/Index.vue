<template>
  <div id="app">
    <div class="menu-wrap">
      <img class="comp-logo" :src="compLogo" width="30px" height="30px" />
      <span
        class="menu-item"
        v-for="item in menu"
        :key="item.route"
        :class="{active:item.route === activeRoute}"
        @click="menuClick(item.route)"
      >{{item.Name}}</span>
    </div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
  import { Data } from "../service";
  export default {
    data() {
      return {
        activeCrumb: 0,
        compLogo: "",
        menu: [
          {
            Name: "首页",
            route: "/"
          },
          {
            Name: "产品",
            route: "/products"
          },
          {
            Name: "客户案例",
            route: "/articles"
          },
          {
            Name: "关于我们",
            route: "/about"
          }
        ]
      };
    },
    created() {
      this.getCompInfo();
    },
    computed: {
      activeRoute() {
        return this.$route.path;
      }
    },
    methods: {
      menuClick(route) {
        if (this.$route.path !== route) {
          if (route === "/about") {
            route += `?id=${this.AboutID}`;
          }
          this.$router.push(route);
        }
      },
      getCompInfo() {
        Data.get("/getCompInfo", { CompID: 10000 }).then(res => {
          this.AboutID = res.data.AboutID;
          this.compLogo = res.data.CompLogo;
        });
        screen;
      },
      openArtPage(artId) {
        this.$router.push(`/article/${artId}`);
      }
    }
  };
</script>

<style lang="less" scoped>
  @import "../assets/style/color.less";
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    position: relative;
  }
  .menu-wrap {
    border-bottom: 1px solid @border;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    padding: 10px 20px;
    .comp-logo {
      margin-right: 30px;
      width: 30px;
      height: 30px;
      vertical-align: middle;
      object-fit: cover;
    }
    .menu-item {
      vertical-align: middle;
      margin: 0 10px;
      cursor: pointer;
      &:hover,
      &.active {
        color: @active;
      }
    }
  }
</style>
