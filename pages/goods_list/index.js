// pages/goods_list/index.js
import regeneratorRuntime from "../../lib/runtime/runtime";
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 商品列表信息
    goodsList: [],
    // 切换按钮
    tabs: [
      {
        id: 0,
        name: "综合",
        isActive: true,
      },
      {
        id: 1,
        name: "销量",
        isActive: false,
      },
      {
        id: 2,
        name: "价格",
        isActive: false,
      },
    ],
    // 参数
    pageParams: {
      query: "", // 关键字
      cid: "", // 分类id
      pagenum: 1, // 当前页数
      pagesize: 10, // 页容量
    },
  },

  // 总页数
  totalPage: 1,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取参数
    const { cat_id } = options;
    // 设置属性
    this.setData({
      pageParams: {
        ...this.data.pageParams,
        cid: cat_id,
      },
    });
    this.getGoodsList();
  },
  // 获取商品数据
  async getGoodsList() {
    const res = await request({
      url: "/goods/search",
      data: {
        ...this.data.pageParams,
      },
    });
    // 获取商品总数量
    const total = res.total;
    // 获取总页数 商品数量/当前的页容量 ceil网上取整
    this.totalPage = Math.ceil(total / this.data.pageParams.pagesize);
    // 保存数据到本地
    this.setData({
      // 如有下一页，把当前已有的商品信息加入到数组中
      goodsList: [...this.data.goodsList, ...res.goods],
    });
  },
  // 切换按钮
  _handleItemTab(e) {
    const index = e.detail;
    const tabs = this.data.tabs;
    // 设置当前切换按钮的活动状态
    tabs.forEach((v, i) =>
      i === index ? (v.isActive = true) : (v.isActive = false)
    );
    this.setData({
      tabs,
    });
  },
  /**
   * 上拉加载
   */
  onReachBottom() {
    // 查看是否有下一页
    if (this.data.pageParams.pagenum >= this.totalPage) {
      // 没有下一页
      wx.showToast({
        title: "这是最后一页了",
      });
    } else {
      // 有下一页
      // 页数加一
      this.data.pageParams.pagenum++;
      // 发送网络请求
      this.getGoodsList();
    }
  },
});
