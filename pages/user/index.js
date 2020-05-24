import { login } from "../../utils/asyncWx";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 用户信息
    userInfo: {},
    // 登录状态
    loginStatus: false,
    // 收藏商品数量
    collectCount: 0,
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取用户的信息
    const userInfo = wx.getStorageSync("userInfo") || {};
    if (Object.keys(userInfo).length !== 0) {
      this.setData({
        loginStatus: true,
        userInfo,
      });
    }

    // 获取收藏商品数量
    const collect = wx.getStorageSync("collect") || [];
    this.setData({
      collectCount: collect.length,
    });
  },
});
