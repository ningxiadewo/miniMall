import {
  getSetting,
  openSetting,
  chooseAddress,
  showLoading,
  showToast,
} from "../../utils/asyncWx";

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
  // type=0默认从购物车页面跳转过来 type=1为商品详情页跳转过来
  type: 0,
  /**
   * 监听页面显示
   */
  onShow() {
    // 获取当前页面
    const pages = getCurrentPages();
    const currentPages = pages[pages.length - 1];

    // 定义订单
    let order = this.data.order;

    // 判读从商品详情页点击的立即购买还是从购物车页面进入
    console.log(currentPages);

    if (currentPages.options.type) {
      // 获取商品信息
      const goodsInfo = wx.getStorageSync("nowGoods");
      // order.push(goodsInfo);
      order[0] = goodsInfo;
      this.type = 1;
    } else {
      // 获取缓存中的购物车数据
      let cart = wx.getStorageSync("cart") || [];
      // 筛选已经选中的购物车订单商品
      order = cart.filter((v) => v.checked);
    }

    // 获取地址信息
    const address = wx.getStorageSync("address") || "";

    // 商品总数量
    let totalNum = 0;

    // 商品总价格
    let totalPrice = 0;

    // 遍历数组获取商品总价格和数量
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
  // 获取用户的收货地址
  async handleAddress() {
    // 如果直接 wx.chooseAddress获取地址，第一次如果用户不小心取消了获取通讯权限，
    // 第二次进入点击获取地址是不会有响应的
    // 解决方案：
    // 1、先用wx.getSetting的authSetting的scope.address属性查看下用户当前授予的权限
    // 2、如果scope.address为false(用户取消授权)或者undefineundefine(用户还没打开过授权地址)，
    // 则打开wx-openSetting诱导用户打开权限
    // 3、scope.address如果为ture则直接使用wx.chooseAddress打开用户选择地址界面

    // 1、先用wx.getSetting的authSetting的scope.address属性查看下用户当前授予的权限
    try {
      const getRes = await getSetting();
      // 2、如果scope.address为false(用户取消授权)或者undefine(用户还没打开过授权地址)，
      // 则打开wx-openSetting诱导用户打开权限
      const isChoosed = getRes.authSetting["scope.address"];
      if (!isChoosed || isChoosed === undefined) {
        // 打开用户权限
        await openSetting();
        // 选择地址
        this.handleChooseAddress();
      } else {
        // 3、scope.address如果为ture则直接使用wx.chooseAddress打开用户选择地址界面
        // 选择地址
        this.handleChooseAddress();
      }
    } catch (err) {
      console.log(err);
    }
  },
  // 选择地址
  async handleChooseAddress() {
    try {
      const chooseRes = await chooseAddress();
      let address = chooseRes;
      // 详细地址拼接
      address["detailAddress"] =
        address.provinceName +
        address.cityName +
        address.countyName +
        address.detailInfo;
      this.setData({
        address,
      });
      wx.setStorageSync("address", address);
    } catch (err) {
      console.log(err);
    }
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
        // wx.setStorageSync("myOrder", this.data.order);

        showLoading({
          title: "支付中",
        });
        if (this.type !== 1) {
          // 删除购物车中选中的数组
          // 获取缓存中的数组
          let cart = wx.getStorageSync("cart");

          // // 定义未选中商品的数组
          let goods = [];

          // 获取未选中的商品的信息
          cart.forEach((v) => {
            if (!v.checked) {
              goods.push(v);
            }
          });

          // 缓存新的购物车数组
          wx.setStorageSync("cart", goods);
        }
        setTimeout(() => {
          wx.hideLoading();
          // 提示支付成功
          showToast({
            title: "支付成功",
            mask: true,
          });
          // 跳转到我的页面
          setTimeout(() => {
            wx.switchTab({
              url: "/pages/user/index",
            });
          }, 800);
        }, 1000);

        setTimeout(() => {}, 1000);
      }
    } catch (err) {
      wx.hideLoading();
      showToast({
        title: "支付失败",
      });
      console.log(err);
    }
  },
});
