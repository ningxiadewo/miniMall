// pages/feedback/index.js
import { chooseImage, showLoading, showToast } from "../../utils/asyncWx";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        name: "体验问题",
        isActive: true,
      },
      {
        id: 1,
        name: "商品、商家投诉",
        isActive: false,
      },
    ],
    cates: [
      {
        id: 0,
        name: "功能建议",
        isActive: true,
      },
      {
        id: 1,
        name: "购买遇到问题",
        isActive: false,
      },
      {
        id: 2,
        name: "性能问题",
        isActive: false,
      },
      {
        id: 4,
        name: "其他",
        isActive: false,
      },
    ],
    chooseImgArr: [],
    textearValue: "",
  },

  // 定义上传到后台的图片数组
  uploadImgArr: [],

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  // 切换按钮
  _handleItemTab(e) {
    // 根据不同的content判断是哪一个切换容器
    const { content } = e.currentTarget.dataset;

    // 根据不同的content获取索引 index = e.detail是tabs组价子组件传递过来的
    let index;
    if (content === "cates") {
      index = e.currentTarget.dataset.index;
    } else {
      index = e.detail;
    }

    // 获取当前的tabs数组内容
    let tabs = this.data[content];
    // // 设置当前切换按钮的活动状态
    tabs.forEach((v, i) =>
      i == index ? (v.isActive = true) : (v.isActive = false)
    );

    // 根据不同的content 设置data
    if (content === "cates") {
      this.setData({
        cates: tabs,
      });
    } else {
      this.setData({
        tabs,
      });
    }
  },

  // 选择图片
  async chooseImg() {
    try {
      const res = await chooseImage();
      this.setData({
        chooseImgArr: [
          // 再次添加时把原本有的图片加上去
          ...this.data.chooseImgArr,
          ...res.tempFilePaths,
        ],
      });
    } catch (err) {
      console.log(err);
    }
  },

  // 删除图片
  delImg(e) {
    // 获取图片所在数组中的索引
    const { index } = e.currentTarget.dataset;
    // 删除图片
    const chooseImgArr = this.data.chooseImgArr;
    chooseImgArr.splice(index, 1);
    this.setData({
      chooseImgArr,
    });
  },

  // 获取文本域的内容
  getInputTextearValue(e) {
    const { value } = e.detail;
    this.setData({
      textearValue: value,
    });
  },

  // 把文字和图片提交给后台
  async submitContent(e) {
    // 获取文本内容
    const value = this.data.textearValue;
    // console.log(value);

    // 判断文本合法性
    if (!value.trim()) {
      await showToast({
        title: "输入不合法",
        icon: "none",
      });
      return;
    }

    // 获取图片数组
    const chooseImgArr = this.data.chooseImgArr;
    showLoading({
      title: "上传中",
      mask: true,
    });

    // 判断提交内容是否有图片
    // if (chooseImgArr.length !== 0) {
    //   // console.log(chooseImgArr);

    //   chooseImgArr.forEach((v, i) => {
    //     wx.uploadFile({
    //       // 上传到外网的url地址 这里先上传到新浪 https//images.ac.cn/Home/Index/UploadAction
    //       url: "https://images.ac.cn/Home/Index/UploadAction/",
    //       // 上传的文件路径
    //       filePath: v,
    //       // 文件的名字，后台要来有用,与后台沟通
    //       name: "file",
    //       // 额外的表单数据
    //       formData: {},
    //       success: (result) => {
    //         // 图片上传成功后购物后台
    //         // 多张图片，所以在最后一张图片上传完才提交给后台
    //         console.log(result);

    //         if (i === chooseImgArr.length - 1) {
    //           wx.hideLoading();
    //           showToast({
    //             title: "上传成功",
    //             mask: true,
    //           });
    //           // 跳回我的页面
    //           setTimeout(() => {
    //             wx.switchTab({
    //               url: "/pages/user/index",
    //             });
    //           }, 800);

    //           // console.log("提交成功");
    //           // 返回到我的页面
    //           // wx.navigateTo({
    //           //   url: "/pages/user/index",
    //           // });
    //         }
    //       },
    //       fail(err) {
    //         console.log(err);
    //       },
    //     });
    //   });
    // } else {
    setTimeout(() => {
      wx.hideLoading();
      showToast({
        title: "上传成功",
        mask: true,
      });
      // 跳回我的页面
      setTimeout(() => {
        wx.switchTab({
          url: "/pages/user/index",
        });
      }, 800);
    }, 800);
    // }

    // 判断有无图片
  },
});
