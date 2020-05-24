import regeneratorRuntime from "../../lib/runtime/runtime";
import { request } from "../../request/index";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 商品信息
    goodsInfo: {},
    // 是否收藏
    isCollect: false,
  },

  // 全局变量 商品数据
  GoodsInfo: {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { goods_id } = options;
    this.getGoodsInfo(goods_id);
  },

  // 获取商品信息
  async getGoodsInfo(goods_id) {
    const res = await request({
      url: "/goods/detail",
      data: {
        goods_id,
      },
    });
    this.GoodsInfo = res;

    // 查看商品是否收藏
    // 获取缓存中的收藏商品
    let collect = wx.getStorageSync("collect") || [];

    // 查看缓存中是否已收藏该商品
    if (collect.length !== 0) {
      // 缓存中有收藏商品
      collect.some((v, i) => {
        // 已收藏
        if (v.goods_id === this.GoodsInfo.goods_id) {
          this.setData({
            isCollect: true,
          });
          return true;
        }
      });
    }

    this.setData({
      goodsInfo: {
        goods_id: res.goods_id,
        goods_name: res.goods_name,
        goods_price: res.goods_price,
        // 解决一个ios系统部分手机无法识别webp，叫后端改图片，或者自己先改一下，
        // 前提是后台有jpg等格式的图片替换
        goods_introduce: res.goods_introduce.replace(/\.webp/, ".jpg"),
        pics: res.pics,
      },
    });
  },

  // 预览图片
  previewImage(e) {
    // 获取显示的url
    const urls = this.data.goodsInfo.pics.map((v) => v.pics_mid);
    // 获取现在接受的url
    const { current } = e.currentTarget.dataset;
    wx.previewImage({
      current,
      urls,
    });
  },
  addCart() {
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];

    // 查看当前的购物车是否已经有该商品，有该商品，则数量加一，没有即把当前商品加入数组
    // findIndex的用法，函数需要return true 或者 false 找到则返回索引，没有找到返回-1
    const index = cart.findIndex((v) => v.goods_id === this.GoodsInfo.goods_id);

    if (index === -1) {
      // 没有找到 把商品信息添加到cart中
      // 第一次添加 num = 1
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo);
    } else {
      // 找到了,该商品的数量加一
      cart[index].num++;
    }

    // 更新数据缓存
    wx.setStorageSync("cart", cart);

    // 提示添加成功
    wx.showToast({
      title: "加入购物车成功",
      mask: true, // 开启遮罩，防止用户频繁点击按钮
    });
  },
  // 收藏商品
  handleCollectGoods() {
    // 获取缓存中的收藏商品
    let collect = wx.getStorageSync("collect") || [];

    let isCollect = this.data.isCollect;

    if (isCollect) {
      // 已收藏就取消收藏
      collect.some((v, i) => {
        // 已收藏
        if (v.goods_id === this.GoodsInfo.goods_id) {
          collect.splice(i, 1);
          this.setData({
            isCollect: false,
          });
          return true;
        }
      });
    } else {
      // 没有收藏该商品，就收藏
      collect.push(this.GoodsInfo);
      this.setData({
        isCollect: true,
      });
    }
    // 更新缓存中的收藏商品数组
    wx.setStorageSync("collect", collect);
  },

  // 立即购物
  toPay() {
    // 设置商品数量
    this.GoodsInfo.num = 1;

    // 添加到立即购买商品的缓存中
    wx.setStorageSync("nowGoods", this.GoodsInfo);

    // 跳转到支付页面 type = 1表示从商品详情页跳转过来
    wx.navigateTo({
      url: "/pages/pay/index?type=1",
    });
  },
});
