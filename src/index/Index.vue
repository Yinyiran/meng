<template>
  <div id="app">
    <div class="menu-wrap">
      <span
        class="menu-item"
        v-for="(item,index) in menu"
        :class="{active:activeCrumb===index}"
        :key="item.key"
        @click="menuClick(item.key)"
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
        menu: [
          {
            Name: "首页",
            key: "home"
          },
          {
            Name: "产品",
            key: "product"
          },
          {
            Name: "客户案例",
            key: "artcle"
          },
          {
            Name: "联系我们",
            key: "contact"
          },
          {
            Name: "关于我们",
            key: "about"
          }
        ]
      };
    },
    created() {
      this.getCompInfo();
    },
    methods: {
      menuClick(key) {
        switch (key) {
          case "about":
            this.openArtPage(this.AboutID);
            break;

          default:
            break;
        }
      },
      getCompInfo() {
        Data.get("/getCompInfo", { CompID: 10000 }).then(res => {
          this.AboutID = res.data.AboutID;
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
    font-size: 14px;
    padding: 20px;
    .menu-item {
      margin: 0 10px;
      cursor: pointer;
      &:hover,
      &.active {
        color: @active;
      }
    }
  }
</style>
