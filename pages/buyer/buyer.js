//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    buyer_infos:[]
  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var buyer_infos = this.data.buyer_infos;
    for (var i = 0, len = buyer_infos.length; i < len; ++i) {
      buyer_infos[i].checked = i == e.detail.value;
    }

    this.setData({
      buyer_infos: buyer_infos
    });
  },
  addNewAddr(){
    let _this = this;
    let buyer_infos = this.data.buyer_infos;
    for (var i in buyer_infos){
      buyer_infos[i].checked=false
    }
    let buyer = JSON.stringify(buyer_infos);
    wx.navigateTo({
      url: "/pages/newAddr/newAddr?buyer_infos=" + buyer,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  onLoad: function (options) {
    var value = wx.getStorageSync('AddrData');
    if(value){
      wx.getStorage({
        key: 'AddrData',
        success: (res) => {
          console.log(res.data)
          this.setData({
            buyer_infos: res.data
          })
        }
      })
    }else{
      let buyer = JSON.parse(options.buyer_infos);
      console.log(buyer);
      this.setData({
        buyer_infos: buyer
      })
    }
  }
})
