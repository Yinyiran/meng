<template>
  <div class="home">
    <carousel :images="images" :type="type"></carousel>
    <!-- 推荐商品 -->
    <div class="content">
      <div class="wrap">
        <h1 class="title">推荐商品</h1>
        <prod-list :products="products"></prod-list>
      </div>
    </div>
    <!-- 产品分类 -->
    <div class="content">
      <div class="wrap">
        <h1 class="title">产品分类</h1>
        <div @click="toProduts(catalog)" v-for="(catalog,index) in catalogs" :key="index" class="catalog-item">
          <div class="img-wrap">
            <img class="img" :src="catalog.image">
          </div>
          <div class="info">
            <div catalog-name>{{catalog.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 行业新闻 -->
    <div class="content">
      <div class="wrap">
        <h1 class="title">行业新闻</h1>
        <a @click="toArticlePage(article)" v-for="(article,index) in articles" :key="index" class="news">
          <div class="img-wrap">
            <img class="img" :src="article.image">
          </div>
          <div class="info">
            <div class="news-title">{{article.title}}</div>
            <div class="news-intro">{{article.intro}}</div>
          </div>
        </a>
      </div>
    </div>
    <!-- 用户评价 -->
    <div class="content">
      <div class="wrap evaluate-wrap">
        <h1 class="title">用户评价</h1>
        <el-carousel :interval="40000" height="300px" trigger="click">
          <el-carousel-item v-for="(item,index) in evaluateList" :key="index">
            <div v-for="(eva,index) in item" :key="index" class="evaluate-item">
              <img class="img" :src="eva.avatar">
              <div class="user">{{eva.name}}</div>
              <div class="intro">"{{eva.intro}}"</div>
              <div class="detail">{{eva.evaluate}}</div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!-- 公司联系方式 -->
    <div class="content comp-infos">
      <div class="wrap">
        <a :href="compInfos.facebook_url" target="_blank" class="contact">
          <i class="iconfont facebook">&#xe600;</i>
          <div class="icon-text">{{compInfos.facebook}}</div>
        </a>
        <a :href="compInfos.twitter_url" target="_blank" class="contact">
          <i class="iconfont twitter">&#xea3f;</i>
          <div class="icon-text">{{compInfos.twitter}}</div>
        </a>
        <a target="_blank" class="contact">
          <i class="iconfont">&#xe616;</i>
          <div class="icon-text">{{compInfos.mobile}}</div>
        </a>
        <a target="_blank" class="contact">
          <i class="iconfont">&#xe683;</i>
          <div class="icon-text">{{compInfos.telephone}}</div>
        </a>
        <a target="_blank" class="contact">
          <i class="iconfont">&#xe6e4;</i>
          <div class="icon-text">{{compInfos.email}}</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Carousel from "../carousel.vue";
import ProdList from "../prod-list.vue";
import { API, Http, History } from "../../service";

export default {
  name: "home",
  data() {
    return {
      images: [],
      products: [],
      evaluates: [],
      articles: [],
      catalogs: [],
      compInfos: {},
      spliceNum: 5,
      evaluateList: [],
      type: "banner"
    };
  },
  created() {
    Http.get("web/getBanner").then(res => {
      this.images = res.data;
    });
    Http.get("web/getRecommended").then(res => {
      res.data.products.forEach(prod => {
        prod.imgSrc = API.imgSrc + prod.images.split(",")[0];
        this.products.push(prod);
      });
      res.data.articles.forEach(art => {
        art.image = API.imgSrc + art.image;
        this.articles.push(art);
      });
      res.data.evaluates.forEach(eva => {
        eva.avatar = API.imgSrc + eva.avatar;
      });
      this.spliceEvaluate(res.data.evaluates);
    });
    Http.get("web/getInfos").then(res => {
      this.compInfos = res.data;
    });
    Http.get("web/getCatalog").then(res => {
      let list = [];
      res.data.forEach(item => {
        if (item.pid === 0) {
          item.image = API.imgSrc + item.image;
          list.push(item);
        }
      });
      this.catalogs = list;
    });
  },
  methods: {
    toProduts(catalog) {
      History(`products?catalog=${catalog.id}`);
    },
    toArticlePage(catalog) {
      History(`articles?catalog=${catalog.id}`);
    },
    spliceEvaluate(arr) {
      if (arr.length < this.spliceNum) {
        this.evaluateList.push(arr);
      } else {
        this.evaluateList.push(arr.splice(0, this.spliceNum));
        this.spliceEvaluate(arr);
      }
    }
  },
  components: {
    Carousel,
    ProdList
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/variable.scss";
.content {
  padding: 30px 0;
  &:nth-child(2n-1) {
    background-color: #fff;
  }
  &:nth-child(2n) {
    // background-color: $bgColor;
    background-color: #ff8181;
  }
}
.wrap {
  max-width: 1200px;
  margin: auto;
  &::after {
    content: "";
    height: 0;
    display: block;
    clear: both;
  }
}
.title {
  text-align: center;
  letter-spacing: 6px;
  line-height: 50px;
  font-size: 20px;
  font-weight: 600;
  color: #4d555d;
  margin: 0 3px;
}

.catalog-item {
  float: left;
  width: 147px;
  margin: 12px;
  color: #666666;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background-color: $bgColor;
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  &:hover {
    background-color: #fff;
    box-shadow: 0 17px 50px 0 rgba(0, 0, 0, 0.19);
    transform: translate3d(0, -2px, 0);
  }
  .prod-name {
    font-size: 16px;
    color: #07111b;
    line-height: 24px;
    @include no-wrap;
    max-height: 46px;
    transition: all 0.3s;
    text-align: justify;
  }
  .prod-sku {
    @include no-wrap;
    margin-top: 4px;
  }
  .img-wrap {
    height: 0;
    width: 100%;
    padding-top: 70%;
    overflow: hidden;
    position: relative;
    background-color: #f1f1f1;
  }
  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
  .info {
    padding: 10px 12px;
    font-size: 14px;
    line-height: 22px;
    @include no-wrap;
  }
}

.news {
  float: left;
  width: 23%;
  margin: 1%;
  color: #666666;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  background-color: #fff;
  .img-wrap {
    height: 0;
    width: 100%;
    padding-top: 70%;
    overflow: hidden;
    position: relative;
    background-color: #f1f1f1;
    .img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
    }
  }
  .info {
    padding: 10px 12px;
    font-size: 14px;
    line-height: 22px;
    @include no-wrap;
    .news-title {
      font-size: 16px;
      color: #07111b;
      line-height: 24px;
      @include no-wrap;
      max-height: 46px;
      transition: all 0.3s;
      text-align: justify;
    }
    .news-intro {
      @include no-wrap;
      margin-top: 4px;
    }
  }
}

.evaluate-wrap {
  width: 1218px;
}
.el-carousel__item {
  cursor: default;
}
.evaluate-item {
  width: 208px;
  float: left;
  position: relative;
  margin: 50px 18px 0;
  height: 240px;
  margin-right: 14px;
  box-sizing: border-box;
  background: #fafafa;
  box-shadow: 0 0 8px rgba(102, 102, 102, 0.05);
  border-radius: 12px;
  transition: all 0.3s;
  &:hover {
    background-color: #fff;
    box-shadow: 0 0 16px rgba(7, 17, 27, 0.2);
    .img {
      width: 60px;
      height: 60px;
      margin-left: -30px;
    }
    .user {
      margin-top: 0px;
      visibility: hidden;
      opacity: 0;
    }
    .intro {
      visibility: hidden;
      opacity: 0;
    }
  }
  .img {
    position: absolute;
    top: -24px;
    left: 50%;
    margin-left: -40px;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    transition: all 0.3s;
    border: 1px solid #999;
  }
  .user {
    font-size: 16px;
    text-align: center;
    line-height: 24px;
    white-space: nowrap;
    transition: all 0.3s;
    color: #07111b;
    font-weight: 700;
    -webkit-line-clamp: 1;
    margin-top: 64px;
  }
  .intro,
  .detail {
    visibility: visible;
    opacity: 1;
    transition: all 0.4s;
    padding: 0 20px;
    font-size: 12px;
    line-height: 24px;
    color: #4d555d;
    text-align: justify;
    -webkit-line-clamp: 3;
    font-weight: 400;
  }
  .intro {
    -webkit-line-clamp: 1;
    text-align: center;
    margin-bottom: 10px;
  }
}

.comp-infos {
  padding: 36px 0;
  .contact {
    display: inline-block;
    font-size: 12px;
    width: 130px;
    text-align: center;
    .iconfont {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .facebook {
      color: #3b5a9b;
    }
    .twitter {
      color: #3fa6da;
      font-size: 26px;
    }
    .icon-text {
      margin-top: 10px;
    }
  }
}
</style>
