//detail.js
const util = require('../../utils/util.js')

Page({
  data: {
    count: 0
  },

  // 第几张轮播
  changeSwiper(e) {
    this.setData({
      currentTab: e.detail.current + 1
    });
  },

  //加入购物车操作
  addCar() {
    let _this = this;
    let addCarData = [];
    let carList = _this.data.detail_item;
    let count = _this.data.count + 1;
    let num = 1;
    var value = wx.getStorageSync('CartData');
    let obj = {
      checked: false,
      num:num
    }
    carList = Object.assign(carList, obj)
    addCarData.push(carList);
    console.log(count);
    _this.setData({
      count: count
    });
    if(value !=0 || value.length>0){
      addCarData = addCarData.concat(value);
    }
    wx.setStorage({
      key: 'CartData',
      data: addCarData
    })
  },

//跳转到购物车
  goToShopCar() {
    wx.switchTab({
      url: '../shopcar/shopcar'
    })
  },

  getProData(options) {
    let detail_item = JSON.parse(options.detail_item);
    console.log(detail_item)
    this.setData({
      imgUrls: [
        '../../images/u188.jpg',
        '../../images/u188.jpg',
        '../../images/u188.jpg'
      ],
      indicatorDots: false,
      autoplay: false,
      interval: 5000,
      detail_item: detail_item,
      duration: 1000,
      currentTab: 1,
      pro_detail: {
        pro_weight: "500g",
        pro_pack: "简装",
        pro_area: "江西赣南",
        pro_img: '../../images/u241.jpg'
      }
    })
  },
  onLoad: function(options) {
    console.log(options)
    this.getProData(options)
  }
})