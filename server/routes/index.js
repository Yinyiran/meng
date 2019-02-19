const api = require("./home.js");
const Router = require("koa-router");
const router = new Router();
router.use("/api", api.routes(), api.allowedMethods());
module.exports = router;
