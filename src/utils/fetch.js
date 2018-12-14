const baseUrl = process.env.API_BASE_URL;

export const getInfo = () => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${baseUrl}/info`,
      success: res => {
        if(res.data.code === 0){
          resolve(res.data.data);
        } else {
          reject(res.data);
        }
      },
      fail
    })
  }); 
}