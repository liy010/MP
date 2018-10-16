//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // console.log(logs)
    let _this = this

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res.code)
        var code = res.code
        if (res.code) {
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data: {
              appid: 'wx4b967672095dd0f3',
              secret: 'b1e2f8d25a1bf129453c4e743895ea4a',
              js_code: code,
              grant_type: 'authorization_code'
            },
            success: function(res) {
              _this.globalData.openid = res.data.openid;
            }
          })
        } else {
          console.log('登录失败!' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShareAppMessage: function (res) {
    if (res.from == 'menu') {
      console.log('menu')
    }
    return {
      title: '极好的小程序，分享给你身边的人吧',
      path: '/page/user?id=123'
    }
  },
  globalData: {
    userInfo: null,
    imageUrl: '',
  },
  // onLoad: function(options) {
  //   wx.cloud.init({
  //     traceUser: true
  //   })
  // }
})