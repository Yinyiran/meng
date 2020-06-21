import HTTP from "./data"

export const ServeHost = "//127.0.0.1:7001"

// 封装获取 cookie 的方法
export function GetCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}
// 上传文件
export function UpLoadFile(formData, type = "img") {
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
  return HTTP.post("/uploadFile", formData, config);
}

// 用户信息
// export user

// 类型判断
export function TypeOf(obj) {
  let typeStr = Object.prototype.toString.call(obj)
  let reg = /^\[object\s(.+)\]$/;
  reg.exec(typeStr)
  return RegExp.$1.toLowerCase();
}