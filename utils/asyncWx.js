/**
 * promise形式 封装wx部分api
 */
export const getSetting = () => {
  return new Promise((result, reject) => {
    wx.getSetting({
      success: (res) => {
        result(res);
      },
      fail: (err) => {
        console.log(err);
        reject(err);
      },
    });
  });
};
export const openSetting = () => {
  return new Promise((result, reject) => {
    wx.openSetting({
      success: (res) => {
        result(res);
      },
      fail: (err) => {
        console.log(err);
        reject(err);
      },
    });
  });
};

export const chooseAddress = () => {
  return new Promise((result, reject) => {
    wx.chooseAddress({
      success: (res) => {
        result(res);
      },
      fail: (err) => {
        console.log(err);
        reject(err);
      },
    });
  });
};
export const showModal = (options) => {
  return new Promise((result, reject) => {
    wx.showModal({
      ...options,
      success: (res) => {
        if (res.confirm) {
          result(res);
        }
      },
      fail: (err) => {
        console.log(err);
        reject(err);
      },
    });
  });
};
export const showToast = (options) => {
  return new Promise((result, reject) => {
    wx.showToast({
      ...options,
      success: (res) => {
        result(res);
      },
      fail: (err) => {
        console.log(err);
        reject(err);
      },
      complete: () => {},
    });
  });
};
export const showLoading = (options) => {
  return new Promise((result, reject) => {
    wx.showLoading({
      ...options,
      success: (res) => {
        result(res);
      },
      fail: (err) => {
        result(err);
      },
      complete: () => {},
    });
  });
};
export const login = (options) => {
  return new Promise((result, reject) => {
    wx.login({
      timeout: 10000,
      success: function (res) {
        if (res.code) {
          result(res);
        } else {
          console.log(res.errMsg);
        }
      },
    });
  });
};
export const chooseImage = (options) => {
  return new Promise((result, reject) => {
    wx.chooseImage({
      ...options,
      // 图片的张数
      count: 9,
      // 图片的大小，原始图片、压缩图片
      sizeType: ["original", "compressed"],
      // 从哪里获取 相册中选取、相机拍照
      sourceType: ["album", "camera"],
      success: (res) => {
        result(res);
      },
      fail: (err) => {
        reject(res);
      },
    });
  });
};
