import {
  getSetting,
  openSetting,
  chooseAddress,
  showModal,
  showToast,
} from "../../utils/asyncWx";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 购物车商品 数组
    cart: [],
    // 地址信息
    address: "",
    // 全选
    allChecked: true,
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
    const cart = wx.getStorageSync("cart") || [];
    // 更新购物车状态
    this.updateCartStatus(cart);
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
      // 2、如果scope.address为false(用户取消授权)或者undefine(用户还没打开过授权地址)，则打开wx-openSetting诱导用户打开权限
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

  // 更新购物车状态
  updateCartStatus(cart) {
    // 获取地址信息
    const address = wx.getStorageSync("address") || "";

    // 获取购物车全选状态 erery的使用：查找到false 返回false停止循环 返回的类型都是true，最终的才是true
    let allChecked = true;
    let totalNum = 0;

    let totalPrice = 0;

    cart.forEach((v) => {
      if (v.checked) {
        totalNum += v.num;
        totalPrice += v.goods_price * v.num;
      } else {
        // 主要有一个没有被选中,则全选状态为false
        allChecked = false;
      }
    });

    // 如果是空数组 不会执行forEach, 则需要吧allChecked变量设置为false
    allChecked = cart.length > 0 ? allChecked : (allChecked = false);
    this.setData({
      cart,
      address,
      allChecked,
      totalNum,
      totalPrice,
    });
    // 更新购物车缓存状态
    wx.setStorageSync("cart", cart);
  },

  // 选中商品
  checkGood(e) {
    // 获取选中商品索引
    const { index } = e.currentTarget.dataset;
    // 将当前状态取反
    const cart = this.data.cart;
    cart[index].checked = !cart[index].checked;
    // 更新购物车状态
    this.updateCartStatus(cart);
  },

  // 全选商品
  checkAllGood() {
    let cart = this.data.cart;

    // 判断当前购物车是否处于全选
    // 全部商品都没有选中,改为全选
    if (!this.data.allChecked) {
      cart.forEach((v) => {
        v.checked = true;
      });
    } else {
      cart.forEach((v) => {
        v.checked = false;
      });
    }
    this.updateCartStatus(cart);
  },

  // 编辑商品数量
  async editNum(e) {
    // 获取要增减的数量
    const { num } = e.currentTarget.dataset;
    // 获取当前商品的索引
    const { index } = e.currentTarget.dataset;

    const cart = this.data.cart;

    // 判断当前的商品数量是否为1且点击数量见一按钮,则提示用户是否要删除商品
    if (num === -1 && cart[index].num === 1) {
      await showModal({
        title: "是否从购物车中删除商品",
      });
      // 从index开始,删除一个成员
      cart.splice(index, 1);
      console.log(1);

      this.updateCartStatus(cart);
      return;
    }

    // 增减数量

    cart[index].num = cart[index].num + num;
    console.log(cart);

    this.updateCartStatus(cart);
  },

  // 去结算
  toOrder() {
    const cart = this.data.cart;
    // 判断收获地址是否为空
    if (!this.data.address) {
      showToast({ title: "您还未添加地址" });
      return;
    } else if (cart.length <= 0) {
      // 判断购物车是否为空
      showToast({ title: "购物车没有商品" });
    } else {
      // 判断购物车商品是否选中 isChecked为false即有选中商品 为true即没有选中商品
      const isNotChecked = cart.every((v) => !v.checked);
      //  没有选中商品
      if (isNotChecked) {
        showToast({ title: "您还未选中商品" });
      } else {
        // 有选中商品 去结算
        wx.navigateTo({
          url: "/pages/order/index",
        });
      }
    }
  },
});
