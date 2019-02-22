<template>
  <div @click="showlogout = false">
    <div class="menu">
      <p class="menu-title">
        <span class="title-wrap clearfix" @click.stop="showlogout = !showlogout">
          <img class="logo" :src="logoSrc" alt="">
          <span class="name">{{user.name}}</span>
        </span>
        <span class="setting" v-show="showlogout">
          <span class="setting-item" @click="logoEdit">logo</span>
          <span class="setting-item" @click="loginOut">退出</span>
        </span>
      </p>
      <div class="menu-list">
        <li class="menu-item" @click="menuSwitch(item.component)" :class="{active:item.component == componentId}" v-for="(item,index) in menus" :key="index">
          <i class="icon" :class="'el-icon-'+item.icon"></i>
          {{item.name}}
        </li>
      </div>
      <a class="to-home" target="_blank" :href="indexHref"></a>
    </div>
    <div class="content">
      <component :is="componentId"></component>
    </div>
    <!-- logo 裁切  // https://github.com/xyxiao001/vue-cropper-->
    <div class="logo-edit-content" v-if="showLogoEdit">
      <img-crop v-bind="crop" @click.stop @close="showLogoEdit=false"></img-crop>
    </div>
  </div>
</template>
<script>
import { API, Cache } from "../../service";
import { IsLogin } from "../../service";

export default {
  created() {
    IsLogin();
  },
  data() {
    return {
      componentId: "home",
      logoSrc: API.imgSrc + "avatar.png",
      user: Cache.get("user_info") || "",
      indexHref: `${location.origin}/index.html`,
      menus: [
        { name: "首页管理", icon: "goods", component: "home" },
        { name: "行业新闻", icon: "news", component: "articles" },
        { name: "产品管理", icon: "star-off", component: "products" },
        { name: "评价管理", icon: "edit-outline", component: "evaluate" },
        { name: "图片管理", icon: "picture", component: "images" },
        { name: "用户信息", icon: "view", component: "editInfo" },
        { name: "其他设置", icon: "setting", component: "setting" }
      ],
      showlogout: false,
      showLogoEdit: false,
      crop: {
        height: "100px",
        width: "100px",
        circle: true
      }
    };
  },
  methods: {
    menuSwitch(component) {
      this.componentId = component;
    },
    logoEdit() {
      this.showLogoEdit = true;
    },
    toHome() {
      window.location.href = ``;
    },
    loginOut() {
      Cache.clear();
      window.location.href = `${location.origin}/login.html`;
    }
  },
  components: {
    imgCrop: () => import("../../components/img-crop.vue"),
    home: () => import("../../components/admin/home.vue"),
    articles: () => import("../../components/admin/articles.vue"),
    products: () => import("../../components/admin/products.vue"),
    setting: () => import("../../components/admin/setting.vue"),
    evaluate: () => import("../../components/admin/evaluate.vue"),
    editInfo: () => import("../../components/admin/editInfo.vue"),
    images: () => import("../../components/admin/images.vue")
  }
};
</script>


<style lang="scss" scoped>
@import "../../assets/css/variable.scss";
@font-face {
  font-family: "iconfont"; /* project id 802637 */
  src: url("//at.alicdn.com/t/font_802637_2rx54x3hlnp.eot");
  src: url("//at.alicdn.com/t/font_802637_2rx54x3hlnp.eot?#iefix")
      format("embedded-opentype"),
    url("//at.alicdn.com/t/font_802637_2rx54x3hlnp.woff") format("woff"),
    url("//at.alicdn.com/t/font_802637_2rx54x3hlnp.ttf") format("truetype"),
    url("//at.alicdn.com/t/font_802637_2rx54x3hlnp.svg#iconfont") format("svg");
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
}

.menu {
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  height: 100%;
  background-color: $gray-d;

  .menu-title {
    margin: 0 16px;
    padding: 20px 10px 10px;
    border-bottom: 1px solid #555;
    position: relative;
    .title-wrap {
      cursor: pointer;
    }
    .logo {
      float: left;
      margin-right: 16px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
    }
    .name {
      float: left;
      height: 30px;
      color: #fff;
      font-size: 14px;
      line-height: 34px;
    }
    .setting {
      position: absolute;
      width: 100px;
      z-index: 10;
      top: 60px;
      left: 10px;
      font-size: 14px;
      background-color: #fff;
      border-radius: 2px;
      .setting-item {
        cursor: pointer;
        padding: 6px 14px;
        display: inline-block;
        width: 100%;
        box-sizing: border-box;
        &:hover {
          background-color: #e8e8e8;
        }
      }
    }
  }

  .to-home {
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 20px;
    height: 20px;
    background: url("../../assets/images/index-icon.png") center center
      no-repeat;
    background-size: contain;
    cursor: pointer;
  }
}
.menu-list {
  width: 180px;
  padding-top: 10px;
  .menu-item {
    list-style: none;
    height: 56px;
    line-height: 56px;
    font-size: 14px;
    color: #fff;
    padding: 0 24px;
    list-style: none;
    cursor: pointer;
    position: relative;
    transition: background-color 0.3s, color 0.3s;
    box-sizing: border-box;
    white-space: nowrap;
    letter-spacing: 1px;
    &:hover {
      background-color: #222429;
    }
    &.active {
      color: $comColor;
    }
    .icon {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
      vertical-align: middle;
    }
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}

.el-menu {
  border: none;
}

.content {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 180px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 20px;
  background-color: #f4f4f4;
}

.logo-edit-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
}
</style>
