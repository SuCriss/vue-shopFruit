//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    account_items: [],
    isScroll:true,
    windowHeight:0,
    buyer:{
      name:"提莫",
      phone:"17635040145",
      checked:true,
      addr:"山东省济南市高新区舜华路38号"
    },
  },

  addrManagement(){
    let _this= this;
    let data=[];
    data.push(_this.data.buyer);
    let buyer = JSON.stringify(data);
    wx.navigateTo({
      url: "/pages/buyer/buyer?buyer_infos=" + buyer,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  submitOrder(){
    wx.showToast({
      title: '订单提交成功',
      icon:"success",
      duration:5000
    })
  },
  onLoad: function(options) {
    console.log(options.account_items);
    let price = 0;
    let accounts = JSON.parse(options.account_items);
    console.log(accounts);
    for(var i in accounts){
        price +=accounts[i].num*accounts[i].price;
    }
    console.log(price);
    this.setData({
      account_items: accounts,
      count:accounts.length,
      total_price:price
    })
  },
  onShow:function(){
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
  }
})