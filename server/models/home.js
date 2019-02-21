const db = require("../config/db");
const fs = require("fs");
const path = require("path");
const querystring = require("querystring");
const ImgInfo = require("image-size");
const jwt = require("jsonwebtoken");
let token;

const routeList = {
  // 登陆
  async login(ctx) {
    let data = ctx.request.body;
    let [rows] = await db.query(`SELECT * FROM user WHERE name='${data.name}'`);
    if (rows.length === 0) {
      ctx.body = { status: 0, message: "用户不存在" };
      return;
    }
    if (rows[0].password !== data.password) {
      ctx.body = { status: 0, message: "密码错误" };
      return;
    }
    token =
      "Bearer " +
      jwt.sign(
        {
          data: data.name,
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 15
        },
        "mengzaidewangzhan"
      );
    const infos = await routeList.getInfos();
    ctx.body = { status: 1, message: "登陆成功", data: infos };
  },
  async getBanner(ctx) {
    const [rows] = await db.query(
      "SELECT id,img,description,url,sort,type,prodid,articleid FROM banner ORDER BY sort ASC,updatetime DESC"
    );
    ctx.body = rows;
  },

  // 用户信息
  async saveInfos(ctx) {
    let data = ctx.request.body;
    let result = await db.query(
      `UPDATE user SET compName='${data.compName}',telephone='${
        data.telephone
      }',name='${data.name}',mobile='${data.mobile}',facebook='${
        data.facebook
      }',facebook_url='${data.facebook_url}',twitter='${
        data.twitter
      }',twitter_url='${data.twitter_url}',email='${data.email}',compIntro='${
        data.compIntro
      }' WHERE id='1'`
    );
    // }
    ctx.body = result[0];
  },

  async webGetInfos(ctx) {
    const [rows] = await db.query(
      `SELECT compInfos ,compIntro, compName, email, facebook, facebook_url, id, logo, mobile, telephone, twitter, twitter_url,name FROM user WHERE id='1'`
    );
    ctx.body = rows[0];
  },
  async getInfos(ctx) {
    console.log(ctx);
    const compInfos = await db.query(
      `SELECT compInfos ,compIntro, compName, email, facebook, facebook_url, id, logo, mobile, telephone, twitter, twitter_url,name FROM user WHERE id='1'`
    );
    const infos = compInfos[0][0];
    infos.token = token;
    if (ctx) {
      ctx.body = infos;
    } else {
      return infos;
    }
  },

  async saveLogo(ctx) {
    const data = ctx.request.body;
    const base64Data = data.img.replace(/^data:image\/(png|jpeg);base64,/, "");
    require("fs").writeFile(
      __dirname + "/../upload/avatar.png",
      base64Data,
      "base64",
      function(err) {
        console.log(err);
      }
    );
    const img = "avatar.png";
    const result = await db.query(`UPDATE user SET logo='${img}' WHERE id='1'`);
    ctx.body = result[0][0];
  },
  // 产品
  async saveProd(ctx) {
    let data = ctx.request.body;
    let result;
    if (data.id > 0) {
      result = await db.query(
        `UPDATE products SET prod_name='${data.name}',catalog_id='${
          data.catalogID
        }',sku_id='${data.skuID}',prod_images='${data.images}',prod_intro='${
          data.intro
        }',prod_details='${data.details}',recommend='${
          data.recommend
        }' WHERE prod_id='${data.id}'`
      );
    } else {
      result = await db.query(
        `INSERT INTO products (prod_name,catalog_id,sku_id,prod_images,prod_intro,prod_details,recommend) VALUES ('${
          data.name
        }','${data.catalogID}','${data.skuID}','${data.images}','${
          data.intro
        }','${data.details}','${data.recommend}')`
      );
    }
    ctx.body = result[0];
  },
  async deleProd(ctx) {
    let data = ctx.request.body;
    const [rows] = await db.query(
      `DELETE FROM products WHERE prod_id = ${data.id}`
    );
    ctx.body = rows;
  },
  async getProduct(ctx) {
    const data = querystring.parse(ctx.request.url.split("?")[1]);
    if (data.id) {
      const [rows] = await db.query(
        `SELECT p.prod_id as id,p.prod_name as name,p.catalog_id as catalogID,p.sku_id as skuID,c.catalog_name as catalog,s.sku_name as sku,p.prod_images as images ,p.prod_intro as intro,prod_details as details ,recommend FROM products p JOIN catalog c ON p.catalog_id = c.catalog_id JOIN sku s on p.sku_id = s.sku_id WHERE p.prod_id = '${
          data.id
        }'`
      );
      ctx.body = rows[0];
      return;
    }
    if (data.simple) {
      const [rows] = await db.query(
        `SELECT prod_id as id,prod_name as name FROM products`
      );
      ctx.body = rows;
      return;
    }
    if (data.path) {
      if (data.path !== "0") {
        const [rows] = await db.query(
          `SELECT p.prod_id as id,p.prod_name as name,c.catalog_name as catalog,p.catalog_id as catalogID,p.sku_id as skuID,s.sku_name as sku,p.prod_images as images ,p.prod_intro as intro,prod_details as details ,recommend FROM products p JOIN catalog c ON p.catalog_id = c.catalog_id JOIN sku s on p.sku_id = s.sku_id WHERE c.catalog_id REGEXP '^${
            data.path
          }' ORDER BY p.prod_id DESC`
        );
        ctx.body = rows;
        return;
      }
    }
    const [rows] = await db.query(
      `SELECT p.prod_id as id,p.prod_name as name,c.catalog_name as catalog,p.catalog_id as catalogID,p.sku_id as skuID,s.sku_name as sku,p.prod_images as images ,p.prod_intro as intro,prod_details as details ,recommend FROM products p JOIN catalog c ON p.catalog_id = c.catalog_id JOIN sku s on p.sku_id = s.sku_id  ORDER BY p.prod_id DESC`
    );
    ctx.body = rows;
  },

  async getArticle(ctx) {
    const data = querystring.parse(ctx.request.url.split("?")[1]);
    if (data.id) {
      const [rows] = await db.query(
        `SELECT article_id as id,article_title as title,article_intro as intro,article_image as image,article_details as detail,recommend,createtime FROM article WHERE article_id = '${
          data.id
        }' ORDER BY article_id DESC`
      );
      ctx.body = rows[0];
    } else if (data.simple) {
      const [rows] = await db.query(
        `SELECT article_id as id,article_title as title FROM article ORDER BY article_id DESC`
      );
      ctx.body = rows;
    } else {
      const [rows] = await db.query(
        `SELECT article_id as id,article_title as title,article_intro as intro,article_image as image,article_details as details,recommend,createtime FROM article ORDER BY article_id DESC`
      );
      ctx.body = rows;
    }
  },
  async saveArticle(ctx) {
    const data = ctx.request.body;
    let result;
    if (data.id > 0) {
      result = await db.query(
        `UPDATE article SET recommend='${data.recommend}',article_title='${
          data.title
        }',article_intro='${data.intro}',article_image='${
          data.image
        }',article_details='${data.details}' WHERE article_id='${data.id}'`
      );
    } else {
      result = await db.query(
        `INSERT INTO article (recommend,article_title,article_intro,article_image,article_details) VALUES ('${
          data.recommend
        }','${data.title}','${data.intro}','${data.image}','${data.details}')`
      );
    }
    ctx.body = result;
  },
  async deleArticle(ctx) {
    let data = ctx.request.body;
    const [rows] = await db.query(
      `DELETE FROM article WHERE article_id = ${data.id}`
    );
    ctx.body = rows;
  },

  // 评价
  async getEvaluate(ctx) {
    const data = querystring.parse(ctx.request.url.split("?")[1]);
    if (data && data.id) {
      const [rows] = await db.query(
        `SELECT evaluate,id,intro,'like',prod_id,recommend,unlike,user_avatar as avatar,user_name as name FROM evaluate WHERE prod_id = '${
          data.id
        }' ORDER BY id DESC`
      );
      ctx.body = rows;
    } else if (data && data.prodID) {
      const [rows] = await db.query(
        `SELECT evaluate,id,intro,'like',prod_id,recommend,unlike,user_avatar as avatar,user_name as name FROM evaluate WHERE prod_id = '${
          data.prodID
        }' ORDER BY id DESC`
      );
      ctx.body = rows;
    } else {
      const [rows] = await db.query(
        `SELECT evaluate,id,intro,'like',prod_id,recommend,unlike,user_avatar as avatar,user_name as name FROM evaluate ORDER BY id DESC`
      );
      ctx.body = rows;
    }
  },
  async deleEvaluate(ctx) {
    let data = ctx.request.body;
    const [rows] = await db.query(`DELETE FROM evaluate WHERE id = ${data.id}`);
    ctx.body = rows;
  },
  async saveEvaluate(ctx) {
    let data = ctx.request.body;
    let result;
    if (data.id > 0) {
      result = await db.query(
        `UPDATE evaluate SET recommend='${data.recommend}',user_name='${
          data.name
        }',user_avatar='${data.avatar}',evaluate='${data.evaluate}',prod_id='${
          data.prod_id
        }',intro='${data.intro}' WHERE id='${data.id}'`
      );
    } else {
      result = await db.query(
        `INSERT INTO evaluate (recommend,user_name,user_avatar,evaluate,intro,prod_id) VALUES ('${
          data.recommend
        }','${data.name}','${data.avatar}','${data.evaluate}','${
          data.intro
        }','${data.prod_id}')`
      );
    }
    ctx.body = result[0];
  },
  async getAllrecommend(ctx) {
    let result;

    result = await db.query(`SELECT * FROM evaluate`);
    ctx.body = result[0];
  },
  async saveBanner(ctx) {
    const data = ctx.request.body;
    if (data.id > 0) {
      const [rows] = await db.query(
        `UPDATE banner SET type='${data.type}',sort='${data.sort}',url='${
          data.url
        }',description='${data.description}',prodid='${
          data.prodid
        }',articleid='${data.articleid}',img='${data.img}' WHERE id='${
          data.id
        }'`
      );
      ctx.body = rows;
    } else {
      // 新增
      const [rows] = await db.query(
        `INSERT INTO banner (type,sort,url,description,id,prodid,articleid,img) VALUES ('${
          data.type
        }','${data.sort}','${data.url}','${data.description}','${data.id}','${
          data.prodid
        }','${data.articleid}','${data.img}')`
      );
      ctx.body = rows;
    }
    ctx.body = "保存banner需要重新制作";
  },
  async deleBanner(ctx) {
    const data = ctx.request.body;
    const [rows] = await db.query(
      `DELETE FROM banner WHERE id IN (${data.id})`
    );
    ctx.body = rows;
  },

  // 图片上传
  async cropUploadImg(ctx) {
    const reqData = ctx.request.body;
    const file = reqData.files.file;
    const buffer = fs.readFileSync(file.path);
    let imgBaseName = new Date().getTime() + path.extname(file.name);
    let fileUrl = path.join(__dirname, `../upload/${imgBaseName}`);
    // 将文件写入
    fs.writeFileSync(fileUrl, buffer);
    ctx.body = { name: imgBaseName };
  },
  // 图片上传
  async uploadImg(ctx) {
    const params = querystring.parse(ctx.request.url.split("?")[1]);
    const file = ctx.request.files.file;
    let filePath = `${__dirname}/../upload/`;
    // if (!fs.existsSync(filePath)) {
    //   fs.mkdirSync(filePath);
    // }
    const buffer = fs.readFileSync(file.path);
    let imgBaseName =
      params.type + "-" + new Date().getTime() + path.extname(file.name);
    let fileUrl = filePath + imgBaseName;
    // 将文件写入
    fs.writeFileSync(fileUrl, buffer);
    ctx.body = { name: imgBaseName };
  },
  async deleImage(ctx) {
    const data = ctx.request.body;
    try {
      fs.unlinkSync(path.join(__dirname, `../upload/${data.fileName}`));
      ctx.body = { status: 1 };
    } catch (error) {
      ctx.body = { status: 0 };
    }
  },

  // 类目 型号
  async getCatalog(ctx) {
    const [rows] = await db.query(
      `SELECT catalog_id as id,catalog_name as name,catalog_pid as pid,id_path as path,image FROM catalog`
    );
    ctx.body = rows;
  },
  async saveCatalog(ctx) {
    const data = ctx.request.body;
    // 添加
    if (data.type === "add") {
      const [rows] = await db.query(
        `INSERT INTO catalog (catalog_pid,catalog_name) VALUES ('${
          data.pid
        }','${data.name}')`
      );
      // 处理path
      let prePath = data.pid > -1 ? data.path + "," : "";
      const result = await db.query(
        `UPDATE catalog SET id_path ='${prePath +
          rows.insertId}' WHERE catalog_id='${rows.insertId}'`
      );
      ctx.body = result;
    }
    if (data.type === "edit") {
      const [rows] = await db.query(
        `UPDATE catalog SET catalog_name ='${data.name}' WHERE catalog_id='${
          data.id
        }'`
      );
      ctx.body = rows;
    }
    if (data.type === "img") {
      const data = ctx.request.body;
      const result = await db.query(
        `UPDATE catalog SET image ='${data.image}' WHERE catalog_id='${
          data.id
        }'`
      );
      ctx.body = result;
    }
  },
  async saveCatologImg(ctx) {
    const data = ctx.request.body;
    const result = await db.query(
      `UPDATE catalog SET image ='${data.image}' WHERE catalog_id='${data.id}'`
    );
    ctx.body = result;
  },
  async deleCatalog(ctx) {
    const data = ctx.request.body;
    const [rows] = await db.query(
      `DELETE FROM catalog WHERE catalog_id IN (${data})`
    );
    ctx.body = rows;
  },
  async getSkuList(ctx) {
    const [rows] = await db.query(
      `SELECT sku_id as id,sku_name as name,sku_pid as pid,id_path as path FROM sku`
    );
    ctx.body = rows;
  },
  async saveSkuList(ctx) {
    const data = ctx.request.body;
    if (data.type === "add") {
      const [rows] = await db.query(
        `INSERT INTO sku (sku_pid,sku_name) VALUES ('${data.pid}','${
          data.name
        }')`
      );
      // 处理path
      let prePath = data.pid > -1 ? data.path + "," : "";
      const result = await db.query(
        `UPDATE sku SET id_path ='${prePath + rows.insertId}' WHERE sku_id='${
          rows.insertId
        }'`
      );
      ctx.body = result;
    }
    if (data.type === "edit") {
      const [rows] = await db.query(
        `UPDATE sku SET sku_name ='${data.name}' WHERE sku_id='${data.id}'`
      );
      ctx.body = rows;
    }
  },
  async deleSkuList(ctx) {
    const data = ctx.request.body;
    const [rows] = await db.query(`DELETE FROM sku WHERE sku_id IN (${data})`);
    ctx.body = rows;
  },
  async getAllImages(ctx) {
    const data = querystring.parse(ctx.request.url.split("?")[1]);
    let src = path.normalize(__dirname + "/../upload/");

    const readFileList = dir => {
      let files = fs.readdirSync(dir);
      let imgList = [];
      for (let i = 0, len = files.length; i < len; i++) {
        const file = files[i];
        let filePath = dir + file;
        let isImg = fs.statSync(filePath).isDirectory()
        if (isImg) continue; // 如果是文件夹 跳过
        // 继续循环子文件夹
        // let stat = fs.statSync(filePath);
        // if (stat.isDirectory()) {
        //   readFileList(`${filePath}/`);
        // } else {
        // if(i==29) continue
        let img = ImgInfo(filePath);
        img.size = Math.ceil(fs.readFileSync(filePath).length / 1024);
        img.name = file;
        img.time = fs.statSync(filePath).ctimeMs;
        imgList.push(img);
      }
      // 按照图片最后修改时间排序
      function compare(property) {
        return function(obj1, obj2) {
          var value1 = obj1[property];
          var value2 = obj2[property];
          return value1 - value2; // 升序
        };
      }
      return imgList.sort(compare("time"))
    };
    const Allfiles = readFileList(src).reverse();
    ctx.body = {
      count: Allfiles.length,
      data: Allfiles.slice((data.page - 1) * data.size, data.page * data.size)
    };
  },
  async getRecommendProduct(ctx) {
    const [rows] = await db.query(
      `SELECT p.prod_id as id,p.prod_name as name, p.prod_intro as intro,p.prod_images as images,s.sku_name as sku FROM products p JOIN sku s on p.sku_id = s.sku_id WHERE recommend=1 ORDER BY prod_id DESC`
    );
    ctx.body = rows;
  },
  async getRecommendEvaluate(ctx) {
    const [rows] = await db.query(
      `SELECT id,user_name as name, evaluate as evaluate, intro ,user_avatar as avatar FROM evaluate WHERE recommend=1 ORDER BY id DESC`
    );
    ctx.body = rows;
  },
  async getRecommendArticle(ctx) {
    const [rows] = await db.query(
      `SELECT article_id as id,article_title as title, article_image as image, article_intro as intro FROM article WHERE recommend=1 ORDER BY article_id DESC`
    );
    ctx.body = rows;
  },
  async cancelProdRecom(ctx) {
    const data = querystring.parse(ctx.request.url.split("?")[1]);
    const [rows] = await db.query(
      `UPDATE products SET recommend=0 WHERE prod_id=${data.id}`
    );
    ctx.body = rows;
  },
  async cancelArticleRecom(ctx) {
    const data = querystring.parse(ctx.request.url.split("?")[1]);
    const [rows] = await db.query(
      `UPDATE article SET recommend=0 WHERE article_id=${data.id}`
    );
    ctx.body = rows;
  },
  async cancelEvalRecom(ctx) {
    const data = querystring.parse(ctx.request.url.split("?")[1]);
    const [rows] = await db.query(
      `UPDATE evaluate SET recommend=0 WHERE id=${data.id}`
    );
    ctx.body = rows;
  }
};

module.exports = routeList;
