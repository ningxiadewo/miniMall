import { showToast } from "../../utils/asyncWx";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 订单商品 数组
    order: [],
    // 地址信息
    address: "",
    // 总数量
    totalNum: 0,
    // 总价格
    totalPrice: 0,
  },

  /**
   * 监听页面显示
   */
  onShow() {
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];

    // 获取地址信息
    const address = wx.getStorageSync("address") || "";

    // 筛选已经选中的购物车订单商品
    const order = cart.filter((v) => v.checked);

    // 商品总数量
    let totalNum = 0;

    // 商品总价格
    let totalPrice = 0;

    order.forEach((v) => {
      totalNum += v.num;
      totalPrice += v.goods_price * v.num;
    });

    this.setData({
      order,
      address,
      totalNum,
      totalPrice,
    });
  },

  // 去支付
  async toPay() {
    try {
      // 判断用户是否授权，没有授权即跳转到授权页面
      // 顾没有token，写下面的代码失败，回家吃饭
      const token = wx.getStorageSync("token") || "";
      if (!token) {
        // 没有token，跳转到授权页面
        wx.navigateTo({
          url: "/pages/auth/index",
        });
      } else {
        // 因tonken是模拟的，所以token值是假的
        // 模拟生成订单放在本地
        wx.setStorageSync("myOrder", this.data.order);
        // 删除购物车中选中的数组
        // 获取缓存中的数组
        let cart = wx.getStorageSync("cart");

        // 定义未选中商品的数组
        let goods = [];

        // 获取未选中的商品的信息
        cart.forEach((v) => {
          if (!v.checked) {
            goods.push(v);
          }
        });

        // 缓存新的购物车数组
        wx.setStorageSync("cart", goods);

        // 提示支付成功
        await showToast({
          title: "支付成功",
        });
        // 跳转到我的个人信息页面
        wx.navigateTo({
          url: "/pages/order/index",
        });
      }
    } catch (err) {
      showToast({
        title: "支付失败",
      });
      console.log(err);
    }
  },
});
