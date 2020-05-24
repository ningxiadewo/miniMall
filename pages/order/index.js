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
        name: "全部订单",
        isActive: true,
      },
      {
        id: 1,
        name: "未付款",
        isActive: false,
      },
      {
        id: 2,
        name: "待发货",
        isActive: false,
      },
      {
        id: 3,
        name: "退货退款",
        isActive: false,
      },
    ],
    // 假数据订单
    order: [
      {
        id: 0,
        number: 234324234234,
        price: 2342,
      },
      {
        id: 1,
        number: 873879686876,
        price: 786,
      },
      {
        id: 2,
        number: 4758788979878,
        price: 234,
      },
    ],
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // onShow没有options，要获取页面参数需要另辟途径
    // getCurrentPages()获取的是页面栈 数组格式，最多包含十个页面
    // 十个页面是现在的页面信息和进入该页面前的九个页面信息
    // 所以最后的一个数组是可以获取当前的页面参数
    const pages = getCurrentPages();

    // 获取页面参数信息
    const { options } = pages[pages.length - 1];
    // 提取参数
    const { type } = options;
    // 改变选中状态
    this.changeTabStatus(type - 1);
    console.log(this.data.tabs);

    // 把订单时间改为当前时间
    const time = new Date().toLocaleString();

    let order = this.data.order;

    order = order.map((v) => {
      return { ...v, time };
    });

    this.setData({
      order,
    });
    console.log(order);
    
  },
  // 切换按钮
  _handleItemTab(e) {
    const index = e.detail;
    this.changeTabStatus(index);
  },
  // 改变tab样式
  changeTabStatus(index) {
    const tabs = this.data.tabs;
    // 设置当前切换按钮的活动状态
    tabs.forEach((v, i) =>
      i == index ? (v.isActive = true) : (v.isActive = false)
    );
    this.setData({
      tabs,
    });
  },
});
