/**
 * 请求数据函数
 * @param {Object} params
 */
export const request = (params) => {
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
    });
  });
};
