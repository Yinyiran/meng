export const ServeHost = "//127.0.0.1:7001"

// 封装获取 cookie 的方法
export function GetCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}

// 用户信息
// export user 