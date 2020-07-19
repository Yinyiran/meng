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
    <div class="content">
      <keep-alive>
        <router-view />
      </keep-alive>
    </div>
    <div class="footer">
      <span>
        <span
          class="menu-item"
          v-for="item in contacts"
          :key="item.Name"
          @click="contactClick(item)"
        >{{item.Name}}</span>
      </span>
      <span></span>
    </div>
  </div>
</template>

<script>
  import { Data } from "../service";
  export default {
    data() {
      return {
        activeCrumb: 0,
        compLogo: "",
        wechatQR: "",
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
        ],
        contacts: [
          {
            Name: "WeChat",
            icon: "",
            url: ""
          },
          {
            Name: "Facebook",
            icon: "",
            url: ""
          },
          {
            Name: "Twitter",
            icon: "",
            url: ""
          },
          {
            Name: "Youtube",
            icon: "",
            url: ""
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
      contactClick(item) {
        if (item.Name === "WeChat") {
          window.open(this.wechatQR);
        } else {
          window.open(`https://${item.url}`);
        }
      },
      getCompInfo() {
        Data.get("/getCompInfo", { CompID: 10000 }).then(res => {
          this.AboutID = res.data.AboutID;
          this.compLogo = res.data.CompLogo;
          this.wechatQR = res.data.CompLogo;
          this.contacts.forEach(item => {
            item.url = res.data[item.Name];
          });
        });
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
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    height: 100%;
    flex-direction: column;
  }
  .menu-wrap {
    border-bottom: 1px solid @border;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px;
    .comp-logo {
      margin-right: 30px;
      height: 30px;
      vertical-align: middle;
      object-fit: cover;
    }
  }
  .menu-item {
    vertical-align: middle;
    margin: 0 15px;
    cursor: pointer;
    &:hover,
    &.active {
      color: @active;
    }
  }
  .content {
    flex: 1;
  }
  .footer {
    display: flex;
    justify-content: center;
    border-top: 1px solid @border;
    margin-top: 40px;
    padding: 30px 40px;
  }
</style>
