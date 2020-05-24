import { request } from "../../request/index";
Page({
  data: {
    // 轮播图 数组
    swiperList: [],
    // 分类 数组
    catesList: [],
    // 楼层 数组
    floorList: [],
  },
  onLoad() {
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  getSwiperList() {
    request({
      url: "/home/swiperdata",
    }).then((res) => {
      // 遍历数组且把navigator_url的url中的main要替换成index
      // 接口的navigator_url的url中的main要替换成index才能正常访问
      res.forEach((v) => {
        v.navigator_url = v.navigator_url.replace(/main/i, "index");
      });
      // console.log(res);

      this.setData({
        swiperList: res,
      });
    });
  },
  getCatesList() {
    request({
      url: "/home/catitems",
    }).then((res) => {
      this.setData({
        catesList: res,
      });
    });
  },
  getFloorList() {
    request({
      url: "/home/floordata",
    }).then((res) => {
      // 遍历数组且把navigator_url的url中的main要替换成index
      // 接口的navigator_url的url中的main要替换成index才能正常访问
      res.forEach((value) => {
        value.product_list.forEach((item) => {
          item.navigator_url = item.navigator_url.replace(
            /list/i,
            "list/index"
          );
        });
      });
      this.setData({
        floorList: res,
      });
    });
  },
});
