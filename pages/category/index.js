import regeneratorRuntime from "../../lib/runtime/runtime";
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 左边数据
    leftList: [],
    // 右边数据
    rightContent: [],
    // 当前点击的索引
    currentIndex: 0,
    scrollTop: 0,
  },
  // 接口数据
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 小程序的缓存与web缓存的不同
    // web：localStorage.setItem("key","value") localStorage.getItem("key")
    // web在缓存过程中无论保存什么类型，都自动调用toString()转换为字符串再进行保存
    // 小程序保存的类型是在传入是什么类型，就是什么类型
    // 小程序：wx.setStorageSync("key", "value"); wx.getStorageSync("key");

    // 使用小程序缓存
    const cates = wx.getStorageSync("cates");
    // 如果程序没有缓存
    if (!cates) {
      this.getCateGoryData();
    } else {
      // 如果缓存时间超过5分钟，则重新获取数据
      console.log(Date.now() - cates.time);

      if (Date.now() - cates.time > 1000 * 60 * 5) {
        this.getCateGoryData();
      } else {
        // 获取缓存在本地的数据
        this.Cates = cates.data;
        // 映射左边数据
        const leftList = this.Cates.map((v) => v.cat_name);
        // 获取右边数据
        const rightContent = this.Cates[0].children;
        this.setData({
          leftList,
          rightContent,
        });
      }
    }
  },
  async getCateGoryData() {
    const result = await request({
      url: "/categories",
    });
    this.Cates = result;

    // 使用本地缓存
    wx.setStorageSync("cates", {
      time: Date.now(),
      data: this.Cates,
    });

    // 映射左边数据
    const leftList = this.Cates.map((v) => v.cat_name);
    // 获取右边数据
    const rightContent = this.Cates[0].children;
    this.setData({
      leftList,
      rightContent,
    });
  },
  switchTab(e) {
    // 获取当前索引
    const { index } = e.currentTarget.dataset;
    // 根据索引获取数据
    // 获取右边数据
    const rightContent = this.Cates[index].children;
    this.setData({
      rightContent,
      currentIndex: index,
      scrollTop: 0,
    });
  },
});
