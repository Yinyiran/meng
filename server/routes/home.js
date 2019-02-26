const api = require("../models/home");
const Router = require("koa-router");
const router = new Router();
// 用户
router.post("/login", api.login);
router.get("/web/getInfos", api.webGetInfos);
router.get("/getInfos", api.getInfos); // admin
router.post("/saveInfos", api.saveInfos); // admin
// 图片
router.get("/web/getAllImages", api.getAllImages);
router.get("/getAllImages", api.getAllImages); // admin
router.post("/cropUploadImg", api.cropUploadImg); // admin
router.post("/uploadImg", api.uploadImg); // admin
router.post("/deleImage", api.deleImage); // admin
router.post("/saveLogo", api.saveLogo); // admin
// 产品
router.get("/web/getProduct", api.getProduct);
router.get("/getProduct", api.getProduct); // admin
router.post("/saveProd", api.saveProd); // admin
router.post("/deleProd", api.deleProd); // admin
// 评论
router.get("/web/getEvaluate", api.getEvaluate);
router.get("/getEvaluate", api.getEvaluate); // admin
router.post("/deleEvaluate", api.deleEvaluate); // admin
router.post("/saveEvaluate", api.saveEvaluate); // admin
// banner
router.get("/web/getBanner", api.getBanner);
router.get("/getBanner", api.getBanner); // admin
router.post("/saveBanner", api.saveBanner); // admin
router.post("/deleBanner", api.deleBanner); // admin
// 文章
router.get("/web/getArticle", api.getArticle);
router.get("/getArticle", api.getArticle); // admin
router.post("/saveArticle", api.saveArticle); // admin
router.post("/deleArticle", api.deleArticle); // admin
// 目录
router.get("/web/getCatalog", api.getCatalog);
router.get("/getCatalog", api.getCatalog); // admin
router.post("/saveCatalog", api.saveCatalog); // admin
router.post("/deleCatalog", api.deleCatalog); // admin
// 型号
router.get("/web/getSkuList", api.getSkuList);
router.get("/getSkuList", api.getSkuList); // admin
router.post("/saveSkuList", api.saveSkuList); // admin
router.post("/deleSkuList", api.deleSkuList); // admin
// 推荐
router.get("/web/getRecommended", api.getRecommended);
router.get("/getRecommended", api.getRecommended);
router.get("/cancelProdRecom", api.cancelProdRecom); // admin
router.get("/cancelEvalRecom", api.cancelEvalRecom); // admin
router.get("/cancelArticleRecom", api.cancelArticleRecom); // admin

module.exports = router;
