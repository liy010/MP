// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude : null,
    longitude : null, 
    markers: [{
      id: 1,
      latitude: null,
      longitude: null,
      name: 'Home'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'map',
      success: function(res) {
        console.log(res)
        that.setData({
          latitude: res.data.latitude,
          longitude: res.data.longitude          
        })
        console.log('读取map成功')
      },
      fail: function() {
        wx.getLocation({
          success: function (res) {
            that.setData({
              latitude: res.latitude,
              longitude: res.longitude,
              markers: [{
                latitude: res.latitude,
                longitude: res.longitude
              }]
            }),
            wx.setStorage({
              key: 'map',
              data: {
                latitude: res.latitude,
                longitude: res.longitude
              },
              success: function() {
                console.log('写入map成功')
              }
            })
          },
          fail: function () {
            wx.showToast({
              title: '位置信息获取失败',
              icon: 'fail',
              duration: 1500
            })
          }
        })
      }
    })
  },
  markertap(e) {
    console.log(e)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})