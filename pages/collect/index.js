// pages/collect/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 切换按钮
    tabs: [
      {
        id: 0,
        name: "商品收藏",
        isActive: true,
      },
      {
        id: 1,
        name: "品牌收藏",
        isActive: false,
      },
      {
        id: 2,
        name: "店铺收藏",
        isActive: false,
      },
      {
        id: 3,
        name: "浏览足迹",
        isActive: false,
      },
    ],
    // 收藏分类
    collectCate: [
      {
        id: 0,
        name: "全部",
        isActive: true,
      },
      {
        id: 1,
        name: "正在热卖",
        isActive: false,
      },
      {
        id: 2,
        name: "即将上线",
        isActive: false,
      },
    ],
    // 收藏的商品信息
    collectGoods: [],
  },
  /**
   * onShow 页面显示时加载
   */
  onShow() {
    // 获取缓存中的收藏商品信息
    const collectGoods = wx.getStorageSync("collect");
    this.setData({
      collectGoods,
    });
  },
});
