// 服务端入口
const Koa = require("koa");
const json = require("koa-json");
const koaBody = require("koa-body");
const historyApiFallback = require("koa2-history-api-fallback");
const koaStatic = require("koa-static");
const jwtKoa = require("koa-jwt"); // 用于路由权限控制
const path = require("path");
const router = require("./routes/index");
const app = new Koa();

const secret = "mengzaidewangzhan";
// 文件图片上传
app.use(
  koaBody({
    multipart: true
  })
);
app.use(json());

// app.use(async (ctx, next) => {
//   let start = new Date();
//   await next();
//   let ms = new Date() - start;
//   console.log("%s %s - %sms", ctx.method, ctx.url, ms);
// });

/* 当token验证异常时候的处理，如token过期、token错误 */
app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = err.originalError ? err.originalError.message : err.message;
    } else {
      throw err;
    }
  });
});
/* 路由权限控制 */
app.use(
  jwtKoa({ secret: secret }).unless({
    // 设置get开头/login接口，可以不需要认证访问
    path: [
      /^\/api(\/web\/get|\/login)/,
      /^((?!\/api).)*$/ // 设置除了私有接口外的其它资源，可以不需要认证访问
    ]
  })
);

app.on("error", err => {
  console.log("server error", err);
});

app.use(historyApiFallback()); // 在这个地方加入。一定要加在静态文件的koaStatic的serve之前，否则会失效。

app.use(koaStatic(path.join(__dirname))); // 静态文件

app.use(router.routes()).use(router.allowedMethods());

app.listen(8888, () => {
  console.log("Koa is listening in 8888");
});
