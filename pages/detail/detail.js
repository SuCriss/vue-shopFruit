//detail.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: [],
    imgUrls: [
      '../../images/u188.jpg',
      '../../images/u188.jpg',
      '../../images/u188.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    currentTab:1
  },

  changeSwiper(e){
    this.setData({ currentTab: e.detail.current + 1});
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  }
})
