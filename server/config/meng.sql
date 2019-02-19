/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : meng

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 11/09/2018 22:25:49
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article`  (
  `article_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `article_title` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `recommend` smallint(1) UNSIGNED NOT NULL DEFAULT 0,
  `article_intro` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `article_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `article_details` longtext CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createtime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatetime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`article_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES (1, '莱德斯网站成立了', 1, '热烈庆祝莱特斯网站城市', 'article1535773043632.jpg', 'ajwejgiarwniaraoijgigrjei', '2018-06-20 11:47:46', '2018-09-01 11:37:25');
INSERT INTO `article` VALUES (6, '我们的网站就要完工了哈哈哈', 0, '热烈vwe莱特斯网站城市', 'article1534061796613.jpg', 'ajwejgiarwniaraoijgigrjei', '2018-08-12 10:53:46', '2018-08-12 17:27:24');
INSERT INTO `article` VALUES (7, '噢啦噢啦噢啦啦', 1, '嘻嘻嘻嘻哈哈哈哈', 'article-1535818739091.gif', '<p>安慰噶然后去没考虑他们会4漫画&nbsp;<img src=\"http://localhost:8888/upload/article-1536670330138.jpg\" alt=\"\" width=\"211\" height=\"239\" /></p>', '2018-08-12 16:13:37', '2018-09-11 20:52:12');
INSERT INTO `article` VALUES (8, '啦啦啦 图片管理完成了 哈哈哈哈', 1, '啦啦啦 图片管理完成了 哈哈哈哈啦啦啦 图片管理完成了 哈哈哈哈啦啦啦 图片管理完成了 哈哈哈哈啦啦啦 图片管理完成了 哈哈哈哈', 'evaluate1534065603988.gif', '<p>爱人合同和哈阿尔泰和而懊悔哈哈暗黑4后 后5和4和和54行情5何文田和</p>', '2018-08-30 23:49:44', '2018-09-02 19:53:14');

-- ----------------------------
-- Table structure for banner
-- ----------------------------
DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner`  (
  `id` smallint(6) UNSIGNED NOT NULL AUTO_INCREMENT,
  `img` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `url` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `description` tinytext CHARACTER SET utf8 COLLATE utf8_general_ci,
  `createtime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatetime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `sort` tinyint(4) NOT NULL DEFAULT 0,
  `type` tinyint(4) NOT NULL,
  `prodid` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `articleid` varchar(5) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of banner
-- ----------------------------
INSERT INTO `banner` VALUES (2, 'default2.jpg', '', '掘金网站', '2018-06-20 11:48:30', '2018-08-12 10:49:13', 2, 2, 'null', '1');
INSERT INTO `banner` VALUES (3, 'article1535526812198.jpg', 'https://cn.vuejs.org', 'vue', '2018-06-20 11:48:30', '2018-09-04 18:12:39', 3, 3, 'null', 'null');
INSERT INTO `banner` VALUES (6, 'default3.jpg', '', '二哥的产品', '2018-08-11 23:22:15', '2018-09-04 18:12:57', 1, 1, '6', 'null');
INSERT INTO `banner` VALUES (7, 'banner-1536669887613.png', '', 'awrgwrg ', '2018-09-11 20:44:49', '2018-09-11 20:44:49', 1, 1, '7', 'null');

-- ----------------------------
-- Table structure for catalog
-- ----------------------------
DROP TABLE IF EXISTS `catalog`;
CREATE TABLE `catalog`  (
  `catalog_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `catalog_pid` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `id_path` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `catalog_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `createtime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatetime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`catalog_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 21 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of catalog
-- ----------------------------
INSERT INTO `catalog` VALUES (9, 0, '9', '微风1', '2018-06-20 16:40:02', '2018-09-02 21:27:22', 'article1535526763797.jpg');
INSERT INTO `catalog` VALUES (10, 9, '9,10', '拂晓', '2018-06-20 16:40:06', '2018-08-14 21:31:21', '');
INSERT INTO `catalog` VALUES (11, 10, '9,10,11', '6574567', '2018-06-20 16:40:09', '2018-08-04 11:24:35', '');
INSERT INTO `catalog` VALUES (13, 0, '13', '螺丝', '2018-08-04 10:50:10', '2018-09-04 16:17:26', 'evaluate1534063636310.jpg');
INSERT INTO `catalog` VALUES (14, 0, '14', '水龙头', '2018-08-04 10:50:24', '2018-09-04 16:14:42', 'product1535773310952.jpg');
INSERT INTO `catalog` VALUES (15, 0, '15', '酒桶', '2018-08-04 10:50:38', '2018-08-14 23:55:54', 'catalog1534262153153.gif');
INSERT INTO `catalog` VALUES (16, 0, '16', '的', '2018-08-11 23:24:39', '2018-09-02 21:55:56', 'catalog1534262318552.gif');
INSERT INTO `catalog` VALUES (17, 13, '13,17', '大螺丝', '2018-08-14 22:02:31', '2018-08-14 22:02:31', '');
INSERT INTO `catalog` VALUES (18, 13, '13,18', '小螺丝', '2018-08-14 22:08:04', '2018-08-14 22:08:04', '');
INSERT INTO `catalog` VALUES (19, 14, '14,19', '达隆头', '2018-08-14 22:08:42', '2018-08-14 22:08:42', '');
INSERT INTO `catalog` VALUES (20, 9, '9,20', '春初', '2018-09-02 21:27:34', '2018-09-02 21:27:34', '');

-- ----------------------------
-- Table structure for evaluate
-- ----------------------------
DROP TABLE IF EXISTS `evaluate`;
CREATE TABLE `evaluate`  (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `recommend` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `prod_id` smallint(5) UNSIGNED DEFAULT NULL,
  `user_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `evaluate` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `intro` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `like` int(10) UNSIGNED DEFAULT 0,
  `unlike` int(10) UNSIGNED DEFAULT 0,
  `createtime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatetime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of evaluate
-- ----------------------------
INSERT INTO `evaluate` VALUES (2, 1, 7, '萌2', 'evaluate1534059422857.gif', '这个产品很好这个产品很', '前所未有的东西', 0, 0, '2018-06-21 15:36:01', '2018-08-12 22:55:05');
INSERT INTO `evaluate` VALUES (3, 1, 8, '萌2', 'evaluate1534058553750.jpg', '这个产品很好这个产品很好这个产品很好这个产品很好这个产品很好这个产品很好这个产品很好这个产品很好这个产品很好这个产品很好这个产品很好这个产品很好这个产品很好这个产但是v给WREGWAWRGR ', '前所未有的东西', 0, 0, '2018-08-11 23:36:56', '2018-09-05 14:51:08');
INSERT INTO `evaluate` VALUES (4, 0, 11, '做的分分合合', 'evaluate1534059344764.gif', '我FE', '任何人', 0, 0, '2018-08-12 15:23:34', '2018-08-12 17:24:37');
INSERT INTO `evaluate` VALUES (7, 1, 7, 'beeahe', 'product1534084243901.png', 'erge ', 'rege', 0, 0, '2018-08-12 16:33:07', '2018-09-05 13:59:10');
INSERT INTO `evaluate` VALUES (8, 0, 11, '啊啦啦啦啦啦', 'evaluate-1535792816395.jpg', '', 'regrgreg', 0, 0, '2018-08-12 16:34:08', '2018-09-11 22:02:34');
INSERT INTO `evaluate` VALUES (9, 0, 6, '啊范围', 'evaluate1534063636310.jpg', '', '哇各位', 0, 0, '2018-08-12 16:47:18', '2018-08-12 16:47:42');
INSERT INTO `evaluate` VALUES (10, 1, 6, '啥啥啥', 'product-1535790842479.jpg', '挺好的，产品不错', '我也不知道该写啥', 0, 0, '2018-09-02 15:19:50', '2018-09-02 15:19:50');
INSERT INTO `evaluate` VALUES (11, 1, 8, '聪明', 'product1535790072318.jpg', '二五啊额外服务安慰分我', '爱蜂窝', 0, 0, '2018-09-05 13:59:55', '2018-09-05 13:59:55');

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `products`;
CREATE TABLE `products`  (
  `prod_id` smallint(6) UNSIGNED NOT NULL AUTO_INCREMENT,
  `prod_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `sku_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `catalog_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `prod_images` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `prod_vidos` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '',
  `prod_intro` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `prod_details` longtext CHARACTER SET utf8 COLLATE utf8_general_ci,
  `recommend` smallint(5) UNSIGNED DEFAULT 0,
  `createtime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatetime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`prod_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of products
-- ----------------------------
INSERT INTO `products` VALUES (6, '二哥', '16', '16', 'product1534065782318.jpeg', '', '各色个人', '<p>二个人个人EFEWGRG3RG3R</p>', 1, '2018-06-20 17:45:47', '2018-09-01 11:42:07');
INSERT INTO `products` VALUES (7, '电饭锅', '13,14', '15', 'product1535773320817.jpg', '', '爱德万', '<p>案发符文</p>', 1, '2018-06-20 17:55:32', '2018-09-01 11:56:08');
INSERT INTO `products` VALUES (8, '爱克发', '15,16', '14', 'product1535773310952.jpg', '', 'dfbdfb', '<p>dfbdfbdfbdfbdf</p>', 0, '2018-06-20 23:27:42', '2018-09-01 11:55:57');
INSERT INTO `products` VALUES (9, 'sdvsdv', '15,16', '9,10,11', 'product1535773295763.png,product1535790072318.jpg', '', 'sfbzfdb', '<p>dzdndgngnz</p>', 0, '2018-06-20 23:28:20', '2018-09-04 16:25:15');
INSERT INTO `products` VALUES (10, '嘻嘻', '13,14', '16', 'catalog1534262153153.gif,product-1535790842479.jpg', '', 'agwergweg', '<p>agrgergergaergerg</p>', 0, '2018-06-21 10:00:46', '2018-09-01 16:34:03');
INSERT INTO `products` VALUES (11, '起个啥名？', '13,14', '15', 'article-1535818739091.gif', '', 'asdfwdfwsadfadffaw', '<p>awefwefwef</p>', 1, '2018-06-21 10:06:43', '2018-09-11 22:03:06');
INSERT INTO `products` VALUES (12, '不知道叫什么好的产品v我撒网', '15,16', '14,19', 'product1534084243901.png', '', 'grwgrwgega安徒生人员进入金融研究所研究', '<p>剑煮酒味，饮一杯为谁？</p>', 1, '2018-08-12 22:31:28', '2018-09-10 22:57:22');
INSERT INTO `products` VALUES (13, '割让给', '13', '9,10', 'evaluate1534065603988.gif,catalog1534262318552.gif,evaluate1534059344764.gif', '', '割让给', '<p>RGOPMRGAMGKMAKGMKMGALMRKGAELKGLERKGMAKE RGAERG</p>\n<p>AGERMGKMERKJG</p>\n<p>AGRWGERG</p>\n<p>&nbsp;</p>', 1, '2018-08-30 23:54:41', '2018-09-02 21:58:56');
INSERT INTO `products` VALUES (14, '罗斯', '23', '13', 'product-1536141981093.png', '', '啊发违反', '<h1>afwekmfwmglknqa&nbsp;</h1>\n<p>agwgwe&nbsp;</p>', 0, '2018-09-05 18:06:39', '2018-09-11 22:02:43');

-- ----------------------------
-- Table structure for sku
-- ----------------------------
DROP TABLE IF EXISTS `sku`;
CREATE TABLE `sku`  (
  `sku_id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `sku_pid` smallint(5) UNSIGNED NOT NULL DEFAULT 0,
  `sku_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `id_path` varchar(150) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `createtime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatetime` datetime(0) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`sku_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of sku
-- ----------------------------
INSERT INTO `sku` VALUES (13, 0, '诊治', '13', '2018-06-20 16:33:34', '2018-09-02 21:33:46');
INSERT INTO `sku` VALUES (14, 13, '发诶我访问', '13,14', '2018-06-20 16:33:37', '2018-06-20 16:39:55');
INSERT INTO `sku` VALUES (15, 0, '小儿', '15', '2018-06-20 16:33:40', '2018-09-02 21:34:17');
INSERT INTO `sku` VALUES (16, 15, '分公司为', '15,16', '2018-06-20 16:33:44', '2018-06-20 16:33:44');
INSERT INTO `sku` VALUES (17, 15, '分别是', '15,17', '2018-06-20 16:36:22', '2018-06-20 16:36:22');
INSERT INTO `sku` VALUES (18, 17, '爱疯舞', '15,17,18', '2018-06-20 16:36:37', '2018-06-20 16:36:37');
INSERT INTO `sku` VALUES (19, 0, '放的歌', '19', '2018-06-20 16:36:51', '2018-06-20 16:36:51');
INSERT INTO `sku` VALUES (20, 13, '呵呵呵', 'undefined,20', '2018-09-02 21:12:20', '2018-09-02 21:12:20');
INSERT INTO `sku` VALUES (23, 0, '合同', '23', '2018-09-02 21:42:24', '2018-09-02 21:46:44');
INSERT INTO `sku` VALUES (24, 0, '高斌商店', ',24', '2018-09-02 21:55:16', '2018-09-02 21:55:21');
INSERT INTO `sku` VALUES (25, 24, 'vd', ',24,25', '2018-09-02 21:55:26', '2018-09-02 21:55:26');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `logo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `compName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `telephone` varchar(13) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `mobile` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `facebook_url` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `facebook` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `twitter_url` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `twitter` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '',
  `compIntro` text CHARACTER SET utf8 COLLATE utf8_general_ci,
  `compInfos` longtext CHARACTER SET utf8 COLLATE utf8_general_ci,
  `createtime` datetime(0) DEFAULT CURRENT_TIMESTAMP,
  `updatetime` datetime(0) DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(0),
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`id`, `twitter`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, '赵庆萌', 'avatar.png', '莱蒂斯宇宙最强', '12345', '15566668888', 'dfg', 'dfg', 'sRgwRgw', 'dfg', 'dfg', '阿哥如果呵呵呵男男女女eethateheh hrtn八号 交往一金', '<h1>dfgfbafbeenntn</h1>\n<ol>\n<li>人手一件容易、发、</li>\n<li>发违法</li>\n<li>违法呵呵<img src=\"http://localhost:8888/upload/article-1535818739091.gif\" alt=\"\" width=\"277\" height=\"130\" /></li>\n</ol>', '2018-06-20 11:31:24', '2018-09-06 18:06:20', 'zhaoqingmeng222');

SET FOREIGN_KEY_CHECKS = 1;
