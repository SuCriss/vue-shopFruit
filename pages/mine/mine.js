//logs.js
const util = require('../../utils/util.js')
const app = getApp();

Page({
  data: {
    buyer_infos: []
  },

  //我的订单
  myOrder(){
    wx.navigateTo({
      url: '../myOrder/myOrder',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  //收货地址
  buyer_addr(){
    let data = JSON.stringify(this.data.buyer_infos);
    wx.navigateTo({
      url: '../buyer/buyer?buyer_infos=' + data,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  //联系客服
  contact(){
      wx.showToast({
        title: '客服热线：4006551499',
        icon:'none'
      })
  },

  //获取地址缓存
  getStorage(_this){
    var value = wx.getStorageSync('buyerData');
    if (value) {
      wx.getStorage({
        key: 'buyerData',
        success: (res) => {
          console.log(res.data)
          _this.setData({
            buyer_infos: res.data
          })
        }
      })
    }
  },

  onLoad: function () {
    let _this =this;
    _this.getStorage(_this);
    console.log(app)
  }
})
