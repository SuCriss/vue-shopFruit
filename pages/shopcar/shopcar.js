//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    carList: [],
    count: 0,
    delBtnWidth: 160,
    isScroll: true,
    startX: 0,
    selected: false,
    windowHeight: 0,
    totalMoney: 0,
    checked: true,
    checkboxItems: [{
      value: '0',
      checked: true
    }],
  },

  //获取购物车数据
  getCarData(_this) {
    var value = wx.getStorageSync('CartData'); // 异步存储方法  数据同步存储的方法
    console.log(value)
    // 1. 判断一进页面的时候你的同步存储数据是否有数据
    if (!value) { //同步存储数据等于空的话 data=false
      wx.setStorage({
        key: 'CartData',
        data: false
      })
    } else { // 3 。否则 的话 用wx.getStorage拿到你点击加入购物车  这个res.data==false判断时保存的数据  再将数据用wx.setStorage将数据保存
      wx.getStorage({
        key: 'CartData',
        success: (res) => {
          console.log(res.data);
          let data = res.data;
          let payMoney = 0;
          for (var i in data) {
            payMoney += (data[i].num * data[i].price);
          }
          console.log('合计' + payMoney)
          _this.setData({
            carList: data,
            count: data.length,
            totalMoney: payMoney
          })
          console.log(_this.data.carList);
        }
      })
    }
  },

  //数量+-
  num_count(e) {
    let total;
    let index = e.currentTarget.dataset.id;
    let role = e.currentTarget.dataset.role;
    let choseChange = "carList[" + index + "].num"
    let _this = this;
    let count = _this.data.carList[index].num;
    total = role === 'add' ? ++count : --count == 0 ? 1 : count;
    _this.data.count = total == 0 ? _this.data.count - 1 : _this.data.count;
    console.log(total)
    _this.setData({
      [choseChange]: total,
      prod_total: total.toString()
    });
    let payMoney = 0;
    let data = _this.data.carList;
    for (var i in data) {
      payMoney += (data[i].num * data[i].price);
    }
    _this.setData({
      totalMoney: payMoney
    })
    console.log('合计' + payMoney)
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

  //复选框勾选
  checkboxChange: function(e) {
    console.log('checkbox发生change事件，携带value值为：', e);
    let index = e.currentTarget.dataset.id;
    let checked = !this.data.checked;
    let choseChange = "carList[" + index + "].checked";
    this.setData({
      [choseChange]: checked,
      checked: checked
    })
  },

  drawStart: function(e) {
    let _this = this;
    console.log("drawStart");
    var touch = e.touches[0]
    console.log(touch);
    for (var index in _this.data.carList) {
      var item = _this.data.carList[index]
      item.right = 0
    }
    this.setData({
      carList: _this.data.carList,
      startX: touch.clientX,
    })

  },
  drawMove: function(e) {
    console.log("drawMove");
    let _this = this;
    var touch = e.touches[0]
    var item = _this.data.carList[e.currentTarget.dataset.index]
    var disX = _this.data.startX - touch.clientX

    if (disX >= 20) {
      if (disX > _this.data.delBtnWidth) {
        disX = _this.data.delBtnWidth
      }
      item.right = disX
      this.setData({
        isScroll: false,
        carList: _this.data.carList
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        carList: _this.data.carList
      })
    }
  },
  drawEnd: function(e) {
    console.log("drawEnd");
    let _this = this;
    var item = _this.data.carList[e.currentTarget.dataset.index]
    if (item.right >= _this.data.delBtnWidth / 2) {
      item.right = _this.data.delBtnWidth
      _this.setData({
        isScroll: true,
        carList: _this.data.carList,
      })
    } else {
      item.right = 0
      this.setData({
        isScroll: true,
        carList: _this.data.carList,
      })
    }
  },
  //删除
  delItem: function(e) {
    let _this = this;
    console.log(_this.data.carList);
    console.log('删除按钮');
    console.log(e);
    let index = e.currentTarget.dataset.index;
    _this.data.carList.splice(index, 1);
    console.log(_this.data.carList);
    let len = _this.data.carList.length.toString();
    _this.setData({
      carList: _this.data.carList
    });
    wx.setStorage({
      key: 'CartData',
      data: _this.data.carList
    })
    if (len) {
      wx.setTabBarBadge({
        index: 1,
        text: len,
      });
    } else {
      wx.removeTabBarBadge({
        index: 1,
      })
    }

  },

  //全选
  selectAll(e) {
    let _this = this;
    _this.data.selected = !_this.data.selected;
    var data = _this.data.carList;
    for (var i in data) {
      if (_this.data.selected) {
        data[i].checked = true;
      } else {
        data[i].checked = false;
      }
    }
    _this.setData({
      selected: _this.data.selected,
      carList: _this.data.carList
    })
  },
  onLoad: function() {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let _this = this;
    wx.getSystemInfo({
      success(res) {
        let winHeight = res.windowHeight;
        _this.setData({
          windowHeight: winHeight
        });
        console.log(res.windowHeight)
      }
    })
    _this.getCarData(_this)
  },
})