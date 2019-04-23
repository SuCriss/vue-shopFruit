//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    
  },
  saveAndUse(e) {
    let data=[];
    let obj = {checked:true};
    data.push(Object.assign(e.detail.value,obj));
    let newData = data.concat(this.data.buyer_infos)
    let buyer = JSON.stringify(newData);
    console.log(buyer);
    wx.setStorage({
      key: 'AddrData',
      data: newData
    });
    wx.navigateTo({
      url: "/pages/buyer/buyer?buyer_infos=" + buyer,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  onLoad: function(options) {
    let buyer = JSON.parse(options.buyer_infos);
    this.setData({
      buyer_infos:buyer
    })
  }
})