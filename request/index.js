/**
 * 请求数据函数
 * @param {Object} params
 */
// loadingNum 设置加载数量主要是防止多个请求一起发送，而每一个请求回来的时间不一样，隐藏的图标的时间不一样
// loadingNUM 若同时发送多个请求，则最后一个的请求回来之后才会隐藏按钮
let loadingNum = 0;
export const request = (params) => {
  // 加载数量加一
  loadingNum++;
  // 显示加载图标
  wx.showLoading({
    title: "加载中",
  });
  const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url,
      success: function (res) {
        resolve(res.data.message);
      },
      fail: function (err) {
        reject(err);
      },
      complete: function () {
        // 无论完成还是失败，都会执行该函数
        // 加载数量减一
        loadingNum--;
        // 如果所有请求都响应回来，则隐藏loading
        if (loadingNum === 0) {
          wx.hideLoading({
            title: "加载中",
          });
        }
      },
    });
  });
};
