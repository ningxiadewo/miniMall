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
  },
});
