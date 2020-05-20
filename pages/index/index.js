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
      this.setData({
        floorList: res,
      });
    });
  },
});
