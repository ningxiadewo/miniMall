import { request } from "../../request/index";
// pages/search/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 搜索的商品信息
    goods: [],
    // 是否关闭取消按钮
    isClose: true,
    // 输入框内容
    inputValue: "",
  },

  // 定时器控制防抖
  timer: -1,

  // 处理输入内容
  handleInput(e) {
    const { value } = e.detail;
    this.setData({
      inputValue: value,
    });
    // 查看输入是否合法（全部是空格或者没有内容）
    if (!value.trim()) {
      // 清空内容
      this.setData({
        goods: [],
        isClose: true,
      });
      return;
    }
    // 清除定时器
    clearTimeout(this.timer);

    // 重新设置定时器 1秒不继续输入内容就发送网络请求
    this.timer = setTimeout(() => {
      this.requestData(value);
    }, 1000);
  },
  // 请求商品数据
  async requestData(value) {
    try {
      const res = await request({
        url: "/goods/qsearch",
        data: {
          query: value,
        },
      });
      // 请求回来之后输入框为空 清空所有内容
      if (!this.data.inputValue.trim()) {
        this.setData({
          goods: [],
          isClose: true,
        });
        return;
      }

      // 输入框不为空 设置请求数据
      this.setData({
        goods: res,
        isClose: false,
      });
    } catch (err) {
      console.log(err);
    }
  },
  // 点击取消按钮清空内容
  handleClose() {
    this.setData({
      goods: [],
      isClose: true,
      inputValue: "",
    });
  },
});
