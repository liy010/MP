//index.js
//获取应用实例
const app = getApp()
var bmap = require('../../libs/bmap-wx.js'); 
const util = require('../../utils/util.js');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    weathericon: 'iconfont weather icon-tubiaozhizuomoban',
    weathercolor: '#FFFF00'
  },
  logsTap: function() {
      wx.navigateTo({
        url: '../logs/logs'
      })
  },
  cfunctionTap: () => {
    wx.navigateTo({
      url: '../cfunction/cfunction',
    })
  },
  scancode: () => {
    wx.navigateTo({
      url: '../scancode/index',
    })
  },
  booksQueryTap: ()=> {
    wx.navigateTo({
      url: '../books/books',
    })
  },
  expressTap: () => {
    wx.navigateTo({
      url: '../express/express',
    })
  },
  weatherTap: () => {
    wx.navigateTo({
      url: '../weather/weather',
    })
  },
  onLoad: function () {   
    if (app.globalData.userInfo) {
      console.log(app.globalData)
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,     
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(app.globalData)
        
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    let that = this
    let BMap = new bmap.BMapWX({
      ak: 'iWyYK20txL5AfjtGy0w363xA4DpuiBzo'
    });
    let fail = function(data) {
      console.log(data)
    };
    let success = function(data) {
      let weatherData = data.currentWeather[0]
      let result = util.weather(weatherData.weatherDesc)
      that.setData({
        weathericon: "iconfont" + ' ' + 'weather' + ' ' + result[0],
        weathercolor: result[1]
      })
    }
    BMap.weather({
      fail: fail,
      success: success
    })
  },
  getUserInfo: function(e) {
    //console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onShareAppMessage: app.onShareAppMessage,
  bindViewTap: function(e) {
    wx.navigateTo({
      url: '../userInfo/userInfo',
    })
  }
})
