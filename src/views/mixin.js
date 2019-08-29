const adminHome = {
  data() {
    const that = this;
    return {
      tabList: [
        {
          label: "轮播图",
          name: "banner",
          data: this.banner,
          render: true,
          config: {
            add: this.addBanner,
            addText: "添加轮播图",
            cols: [
              { label: "位置", prop: "sort", width: "80" },
              { label: "图片", prop: "imgSrc", width: "150", type: "img" },
              { label: "类型", prop: "description" },
              { label: "类型", prop: "typeName" },
              { label: "链接", prop: "url" }
            ],
            btnaWith: "200px",
            btns: [
              {
                label: "删除",
                icon: "el-icon-delete",
                type: "danger",
                fn(row) {
                  that.deleBanner(row);
                }
              },
              {
                label: "编辑",
                icon: "el-icon-edit",
                fn(row) {
                  that.edit(row);
                }
              }
            ]
          }
        },
        {
          label: "一级类目",
          name: "catalog",
          render: false,
          config: {
            cols: [
              { label: "名称", prop: "name", width: "100" },
              { label: "图片", prop: "imgSrc", width: "200", type: "img" },
              { label: "级别", prop: "level" }
            ],
            btns: [
              {
                label: "编辑",
                icon: "el-icon-edit",
                fn(row) {
                  that.edit(row);
                }
              }
            ]
          }
        },
        {
          label: "推荐商品",
          name: "products",
          render: false,
          config: {
            cols: [
              { label: "产品名称", prop: "name", width: "180" },
              { label: "产品型号", prop: "sku", width: "100" },
              { label: "产品简介", prop: "intro" }
            ],
            btns: [
              {
                label: "取消推荐",
                type: "danger",
                icon: "el-icon-star-off",
                fn(row, index) {
                  let params = {
                    msg: row.name,
                    index,
                    id: row.id,
                    url: "cancelProdRecom"
                  };
                  that.cancelRecommend(params);
                }
              }
            ]
          }
        },
      ]
    };
  }
};
const adminArticle = {};
export { adminHome, adminArticle };
