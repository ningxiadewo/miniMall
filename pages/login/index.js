// pages/login/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {},

  handleGetUserInfo(e) {
    // 获取用户信息
    const { userInfo } = e.detail;
    // 把信息存入缓存中
    wx.setStorageSync("userInfo", userInfo);

    // 跳转到我的页面
    wx.navigateBack({
      delta: 1,
    });
  },
});
