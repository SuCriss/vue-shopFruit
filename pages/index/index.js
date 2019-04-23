//index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeIndex: null,
    curIndex: 1,
    num: 0,
    count: 0,
    prod_total: 0
  },

//跳转到详情页
  navigateToDetail(e) {
    let data = JSON.stringify(e.currentTarget.dataset.item);
    console.log(data);
    wx.navigateTo({
      url: "/pages/detail/detail?detail_item="+data,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  //加入购物车
  addtocar(e) {
    console.log(e);
    console.log(e.target.id)
    let _this = this;
    let index = e.target.id
    console.log(_this.data.PRODUCTS[index])
    let num = _this.data.num = 1;
    _this.data.count += _this.data.num;
    let choseChange = "PRODUCTS[" + index + "].num";
    wx.setTabBarBadge({
      index: 1,
      text: _this.data.count.toString(),
    });
    _this.setData({
      [choseChange]: num
    });
    let addCarData = [];
    let carList = _this.data.PRODUCTS
    let obj = { checked: false }
    carList[index] = Object.assign(carList[index], obj)
    addCarData.push(carList[index])
    var value = wx.getStorageSync('CartData');
    console.log(value.concat(addCarData));
    if(value!=0 || value.length){
      wx.setStorage({
        key: 'CartData',
        data: value.concat(addCarData)
      })
    }
    
  },
  //数量+-
  num_count(e) {
    let total;
    let index = e.currentTarget.dataset.id;
    let role = e.currentTarget.dataset.role;
    let choseChange = "PRODUCTS[" + index + "].num"
    let _this = this;
    let count = _this.data.PRODUCTS[index].num;
    total = role === 'add' ? ++count : --count;
    _this.data.count = total == 0 ? _this.data.count - 1 : _this.data.count;
    console.log(total)
    _this.setData({
      [choseChange]: total,
      prod_total: total.toString()
    });
    if (_this.data.count == 0) {
      wx.removeTabBarBadge({
        index: 1,
      })
    } else {
      wx.setTabBarBadge({
        index: 1,
        text: _this.data.count.toString(),
      });
    }
  },
  getStorageData(){
    var value = wx.getStorageSync('CartData');  // 异步存储方法  数据同步存储的方法
    console.log(value)
    // 1. 判断一进页面的时候你的同步存储数据是否有数据
    if (value.length==0 || !value) {  //同步存储数据等于空的话 data=false
      wx.setStorage({
        key: 'CartData',
        data: false
      })
    } else { // 3 。否则 的话 用wx.getStorage拿到你点击加入购物车  这个res.data==false判断时保存的数据  再将数据用wx.setStorage将数据保存
      wx.getStorage({
        key: 'CartData',
        success: (res) => {
          console.log(res.data)
          this.setData({
            count: res.data.length || 0
          })
          wx.setTabBarBadge({
            index: 1,
            text: this.data.count.toString(),
          });
        }
      })
    }
  },

getInitData(){
  this.setData({
    count: 0,
    PRODUCTS: [{
      title1: '江西正宗赣南脐橙 甜橙子当季新鲜水果榨汁农家果园现摘10斤包邮',
      icon60: '../../images/u138.png',
      intro1: '色香味美  皮薄汁多',
      price: 599,
      right: 0,
      car: '../../images/u137.png',
    },
    {
      title1: '江西正宗赣南脐橙 甜橙子当季新鲜水果榨汁农家果园现摘10斤包邮',
      icon60: '../../images/u27.png',
      intro1: '色香味美  皮薄汁多',
      price: 599,
      right: 0,
      car: '../../images/u137.png',
    }
    ]
  });
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getInitData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    console.log('显示')
    this.getStorageData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
   console.log('页面隐藏了！')
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {
    console.log('页面卸载了！')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})