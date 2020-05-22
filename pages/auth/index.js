import regeneratorRuntime from "../../lib/runtime/runtime";
import { request } from "../../request/index";
import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showToast,
  login,
} from "../../utils/asyncWx";

Page({
  /**
   * 页面的初始数据
   */
  data: {},

  // 处理获取到的用户信息
  async handleGetUserINfo(e) {
    console.log(e);

    // 如果用户授权执行
    if (e.detail.encryptedData) {
      const { encryptedData, rawData, iv, signature } = e.detail;

      // 用户登录获取code
      const res = await login();
      const { code } = res;
      // 发送请求获取token，因没有授权appid，所以获取不到用户的token
      const result = await request({
        url: "/users/wxlogin",
        method: "post",
        data: {
          encryptedData,
          rawData,
          iv,
          signature,
          code,
        },
      });

      // 随便写的一个token值
      wx.setStorageSync("token", "askfdj234k23j4lkjkl");

      wx.navigateBack({
        delta: 1,
      });
    }
  },
});
