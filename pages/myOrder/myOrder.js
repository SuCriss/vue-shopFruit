Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderData:[],
    count:0,
    windowHeight:0
  },

  //查看物流
  checkLogistic(){ 
      wx.showToast({
        title: '查看物流',
      })
  },

  //确认收货
  confirmRecipt(){
    wx.showToast({
      title: '确认收货',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var value = wx.getStorageSync('orderData');
    if (value) {
      wx.getStorage({
        key: 'orderData',
        success: (res) => {
          console.log(res.data);
          let price=0;
          for (var i in res.data) {
            price += res.data[i].num * res.data[i].price;
          }
          this.setData({
            orderData: res.data,
            count: res.data.length,
            total_price: price
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this;
    wx.getSystemInfo({
      success(res) {
        let winHeight = res.windowHeight;
        _this.setData({
          windowHeight: winHeight,
        });
        console.log(res.windowHeight)
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})