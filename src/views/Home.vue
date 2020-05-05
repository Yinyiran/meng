<template>
  <div id="app">
    <div class="header">
      <div class="crumbs-wrap">
        <span
          class="crumb-item"
          v-for="(item,index) in crumbs"
          :class="{active:activeCrumb===item.ID}"
          :key="index"
        >{{item.Name}}</span>
        <span>联系我们</span>
      </div>
    </div>
    <div class="banner-wrap">
      <el-carousel indicator-position="none" :autoplay="false">
        <el-carousel-item v-for="item in sliders" :key="item.img">
          <img :src="item.img" alt />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="products">
      <div
        class="prod-wrap"
        v-for="(prod,index) in products"
        :key="index"
        @click="openProdDetail(prod)"
      >
        <template v-if="prod.Products">
          <carousel-thumb :product="prod"></carousel-thumb>
          <div class="prod-intro">{{prod.Intro}}</div>
        </template>
        <template v-else>
          <div class="prod-item single-img">
            <img class="prod-img" :src="prod.ProdImg" />
          </div>
          <div class="prod-intro">{{prod.ProdName}}</div>
        </template>
      </div>
    </div>
    <div class="article">
      <div class="article-item" v-for="(item,index) in articles" :key="index">
        <img :src="item.ProdImg" alt="">
        <div class="info">{{item.ProdName}}</div>
      </div>
    </div>
    <div class="footer">电话</div>
    <div class="footer">微信</div>
    <div class="footer">在线客服</div>
  </div>
</template>

<script>
import "../components/element/Carousel";
import CarouselThumb from "../components/common/CarouselThumb";
export default {
  name: "App",
  components: { CarouselThumb },
  data() {
    return {
      sliders: [
        {
          img: require("../assets/img/banner1.png"),
          href: ""
        },
        {
          img: require("../assets/img/banner2.png"),
          href: ""
        }
      ],
      activeCrumb: 122,
      menu: [
        {
          Name: "首页",
          PID: 0,
          ID: 122
        },
        {
          Name: "龙头/酒标",
          PID: 0,
          ID: 123
        },
        {
          Name: "分配器/酒矛",
          PID: 0,
          ID: 124
        },
        {
          Name: "酒柱",
          PID: 0,
          ID: 125
        }
      ],
      crumbs: [
        {
          Name: "全部",
          PID: 0,
          ID: 122
        },
        {
          Name: "龙头/酒标",
          PID: 0,
          ID: 123
        },
        {
          Name: "分配器/酒矛",
          PID: 0,
          ID: 124
        },
        {
          Name: "酒柱",
          PID: 0,
          ID: 125
        }
      ],
      articles: [
        {
          ProdName: "北欧客户认可",
          ProdPrice: "200",
          ProdImg: require("../assets/img/prod3.png")
        },
        {
          ProdName: "南非设备安装",
          ProdPrice: "200",
          ProdImg: require("../assets/img/prod3.png")
        },
        {
          ProdName: "德国酒具",
          ProdPrice: "200",
          ProdImg: require("../assets/img/prod3.png")
        }
      ],
      products: [
        {
          current: 0,
          Intro: "OnePlus 8 Pro",
          Products: [
            {
              ProdName: "一加手机8",
              ProdPrice: "5000",
              ProdImg: require("../assets/img/prod1-1.png")
            },
            {
              ProdName: "一加手机8",
              ProdPrice: "4500",
              ProdImg: require("../assets/img/prod1-2.png")
            }
          ]
        },
        {
          ProdName: "一加旅行套装",
          ProdPrice: "200",
          ProdImg: require("../assets/img/prod3.png")
        },
        {
          current: 0,
          Intro: "OnePlus 8 Pro",
          Products: [
            {
              ProdName: "一加手机8",
              ProdPrice: "4000",
              ProdImg: require("../assets/img/prod2-1.png")
            },
            {
              ProdName: "一加手机8",
              ProdPrice: "3000",
              ProdImg: require("../assets/img/prod2-2.png")
            }
          ]
        },

        {
          ProdName: "一加旅行套装",
          ProdPrice: "200",
          ProdImg: require("../assets/img/prod3.png")
        },
        {
          current: 0,
          Intro: "OnePlus 8 Pro",
          Products: [
            {
              ProdName: "一加手机8",
              ProdPrice: "5000",
              ProdImg: require("../assets/img/prod1-1.png")
            },
            {
              ProdName: "一加手机8",
              ProdPrice: "4500",
              ProdImg: require("../assets/img/prod1-2.png")
            }
          ]
        },
        {
          ProdName: "一加旅行套装",
          ProdPrice: "200",
          ProdImg: require("../assets/img/prod3.png")
        },
        {
          current: 0,
          Intro: "OnePlus 8 Pro",
          Products: [
            {
              ProdName: "一加手机8",
              ProdPrice: "4000",
              ProdImg: require("../assets/img/prod2-1.png")
            },
            {
              ProdName: "一加手机8",
              ProdPrice: "3000",
              ProdImg: require("../assets/img/prod2-2.png")
            }
          ]
        },
        {
          ProdName: "一加旅行套装",
          ProdPrice: "200",
          ProdImg: require("../assets/img/prod3.png")
        }
      ]
    };
  },
  mounted() {
    // console.log(this.$refs.carousel);
  },
  methods: {
    carChange(index, prodIndex) {
      this.products[prodIndex].current = index;
    },
    miniChange(imgIndex, prodIndex) {
      this.$refs.carousel[prodIndex].setActiveItem(imgIndex);
    },
    openProdDetail(prod) {
      console.log(prod);
      window.open();
    }
  }
};
</script>

<style lang="less">
@import "../assets/style/color.less";
body {
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  position: relative;
}
.crumbs-wrap {
  border-bottom: 1px solid @border;
  display: flex;
  justify-content: center;
  padding: 20px;
  .crumb-item {
    margin: 0 10px;
    cursor: pointer;
    &:hover,
    &.active {
      color: @active;
    }
  }
}
.banner-wrap {
  position: relative;
  height: 360px;
}
.products {
  display: flex;
  flex-wrap: wrap;
  border-top: 1px solid @border;
  .prod-wrap {
    position: relative;
    width: 25%;
    border-right: 1px solid @border;
    border-bottom: 1px solid @border;
    background-color: #f9f9f9;
    transition: 0.25s;
    box-sizing: border-box;
    &:hover {
      background-color: #fff;
    }
  }
  .prod-item {
    cursor: pointer;
    padding-bottom: 100%;
    height: 0;
    position: relative;
  }
  .prod-img {
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
  }
  .img-wrap {
    text-align: center;
    height: 30px;
    line-height: 30px;
    margin-top: 15px;
  }
  .img-mini {
    display: inline-block;
    width: 24px;
    height: 24px;
    border: 1px solid #e8e8e8;
    margin: 0 2px;
    &.active {
      border: 1px solid @active;
    }
  }
  .prod-intro {
    text-align: center;
    cursor: pointer;
    padding: 10px 0 20px;
  }
}

.article{
  display: flex;
  margin-top: 20px;
  justify-content: center;
  .article-item{
    width: 200px;
    margin: 0 10px;
    border: 1px solid @border;
    text-align: center;
    padding-bottom: 10px;
    img{
      width: 100%;
    }
  }
}

.el-carousel {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.el-carousel__container {
  height: 100%;
}
@media screen and (max-width: 900px) {
  .products {
    .prod-wrap {
      width: 33.33333%;
    }
  }
}

@media screen and (min-width: 1400px) {
  .products {
    .prod-wrap {
      width: 20%;
    }
  }
}
@media screen and (min-width: 2000px) {
  .products {
    .prod-wrap {
      width: 16.66666%;
    }
  }
}
</style>
