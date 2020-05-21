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
