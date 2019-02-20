import axios from "axios";
import { message, messageBox } from "element-ui";

let API;

if (process.env.NODE_ENV === "production") {
  API = {
    imgSrc: "https://api.yunyiran.com/upload/",
    serve: "https://api.yunyiran.com/api"
  };
} else {
  API = {
    imgSrc: "http://localhost:8888/upload/",
    serve: "http://localhost:88/api"
  };
}

const Cache = (() => {
  return {
    get(key) {
      let value = window.sessionStorage.getItem(key);
      return value ? window.JSON.parse(value) : "";
    },
    set(key, value) {
      return window.sessionStorage.setItem(key, JSON.stringify(value));
    },
    remove(key) {
      window.sessionStorage.removeItem(key);
    },
    clear() {
      window.sessionStorage.clear();
    }
  };
})();

// banner类型
const BannerType = {
  1: "产品",
  2: "文章",
  3: "外部链接"
};
// 图片上传归属类目
const ClassifyImages = {
  product: "产品",
  article: "文章",
  evaluate: "评论",
  banner: "轮播",
  catalog: "目录",
  others: "其他"
};

// 信息
const Message = (() => {
  function msg(type, option) {
    if (typeof option === "string") {
      message({ type: type, showClose: true, message: option });
    } else {
      message(Object.assign({ type: type, showClose: true }, option));
    }
  }
  function msgBox(type, option) {
    let _option;
    if (typeof option === "string") {
      _option = { title: "提示", message: option };
      if (type === "confirm") {
        _option.showCancelButton = true;
        _option.type = "warning";
      }
    } else {
      _option = Object.assign({ title: "提示" }, option);
    }
    return messageBox(_option);
  }
  return {
    success(option) {
      msg("success", option);
    },
    info(option) {
      msg("info", option);
    },
    warning(option) {
      msg("warning", option);
    },
    error(option) {
      msg("error", option);
    },
    alert(option) {
      return msgBox("alert", option);
    },
    confirm(option) {
      return msgBox("confirm", option);
    },
    prompt(option) {
      let _option;
      if (!option || typeof option === "string") {
        _option = { title: "请输入内容", inputValue: option || "" };
      } else {
        _option = option || {};
      }
      return messageBox.prompt("", _option);
    }
  };
})();

const Status = {
  400: "错误请求",
  401: "未授权，请重新登录",
  403: "拒绝访问",
  404: "请求错误,未找到该资源",
  405: "请求方法未允许",
  408: "请求超时",
  500: "服务器端出错",
  501: "网络未实现",
  502: "网络错误",
  503: "服务不可用",
  504: "网络超时",
  505: "http版本不支持该请求"
};
// http 服务
const Http = (() => {
  let cancel,
    promiseArr = {};
  const CancelToken = axios.CancelToken;
  const Axios = axios.create({
    baseURL: "/api",
    timeout: 100000000000,
    responseType: "json",
    withCredentials: true, // 是否允许带cookie这些
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  });

  //请求拦截器
  Axios.interceptors.request.use(
    config => {
      //发起请求时，取消掉当前正在进行的相同请求
      if (promiseArr[config.url]) {
        promiseArr[config.url]("操作取消");
        promiseArr[config.url] = cancel;
      } else {
        promiseArr[config.url] = cancel;
      }
      // 管理页面才会添加token
      const Reg = /^(web\/get|login)/;
      if (!Reg.test(config.url)) {
        let user = Cache.get("user_info");
        user && (config.headers.Authorization = user.token);
      }
      return config;
    },
    error => {
      Message.error(`请求出错了,错误信息：${error.message}`);
      console.log(error);
      return Promise.reject(error);
    }
  );

  //响应拦截器即异常处理
  Axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error && error.response) {
        error.message =
          Status[error.response.status] ||
          `连接错误，错误码：${error.response.status}`;
      } else {
        error.message = "连接到服务器失败";
      }
      if (error.response.status === 401) {
        Message.error(Status[error.response.status]);
      //   router.replace({
      //     path: "/login"
      //   });
      // } else {
      //   router.push({
      //     path: `/error?status=${error.response.status}&message=${error}`
      //   });
      }
      console.log(error);
      return Promise.reject(error);
    }
  );
  function ajax(type, url, params, conf) {
    return new Promise(resolve => {
      let config = {
        method: type,
        url,
        cancelToken: new CancelToken(c => {
          cancel = c;
        }),
        headers: {}
      };
      conf && Object.assign(config, conf);
      if (type === "get") {
        config.params = params;
      } else {
        config.data = params;
      }
      Axios(config).then(res => {
        resolve(res);
      });
    });
  }

  return {
    //get请求
    get(url, param, config) {
      return ajax("get", url, param, config);
    },
    //post请求
    post(url, data, config) {
      return ajax("post", url, data, config);
    }
  };
  // 介绍页面： https://juejin.im/post/59a22e71518825242c422604
})();

// url search
const Query = key => {
  const params = {};
  document.location.search
    .substr(1)
    .split("&")
    .forEach(_param => {
      const [key, val] = _param.split("=");
      params[key] = decodeURI(val);
    });
  if (key) {
    return params[key];
  } else {
    return params;
  }
};

export { API, BannerType, Message, Http, Query, Cache, ClassifyImages };
