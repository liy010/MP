//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    loading: false,
  },
  tap: function() {
    this.setData({
      loading: true
    })
    setTimeout(() => {
      wx.navigateTo({
        url: '../evaluate/evaluate'
      })
    })
  },
  requestTap: function() {
    wx.navigateTo({
      url: '../request/request',
    })
  },
  mapTap: function() {
    wx.navigateTo({
      url: '../map/map',
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../wxml/index'
    })
  },
  con:function(eve) {
    console.log('con'),
    console.log(eve.touches)
  },
  toLogs: function() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad: function () {   
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,     
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
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
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  onHide: function() {
    console.log("hide")
    this.setData({
      loading: false,
    })
  },
  onShow: function() {
    console.log(this.route)
  },
  onShareAppMessage: app.onShareAppMessage,
})
