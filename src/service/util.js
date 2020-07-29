import Data from "./data"
import { MD5 } from "crypto-js";

export default class UtilService {
  // 封装获取 cookie 的方法
  static ServeHost = process.env.NODE_ENV === "production" ? "" : "//127.0.0.1:7001"

  static GetCookie(name) {
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
  }
  // 上传文件
  static UpLoadFile(formData, type = "img") {
    formData.append("type", type);
    const config = {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      // onUploadProgress: progressEvent => {
      //   var complete =
      //     (((progressEvent.loaded / progressEvent.total) * 100) | 0) + "%";
      //   console.log(complete);
      // }
    };
    return Data.post("/uploadFile", formData, config);
  }

  // 用户信息
  // export user

  // 类型判断
  static TypeOf(obj) {
    let typeStr = Object.prototype.toString.call(obj)
    let reg = /^\[object\s(.+)\]$/;
    reg.exec(typeStr)
    return RegExp.$1.toLowerCase();
  }

  static async getFileHash(files) {
    let promisArr = [].map.call(files, (item) => {
      return new Promise((resolve, reject) => {
        var reader = new FileReader();
        reader.onload = (event) => {
          var binary = event.target.result;
          item.filehash = MD5(binary).toString();
          resolve();
        };
        reader.readAsBinaryString(item.file);
      });
    });
    return Promise.all(promisArr);
  }
}