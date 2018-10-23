// pages/minigame/minigame.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    top: '235',
    left: '325rpx'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.startCompass({
      success: function(e) {
        console.log(e)
      }
    })
    wx.startGyroscope({
      success: function(e) {
        console.log(e)
      }
    })
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
    wx.onCompassChange(function (res) {
      console.log(res.direction)
    })
    wx.onGyroscopeChange(function(res) {
      let x = res.x,
      y = res.y;
      console.log(res)
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.stopCompass({
      success: function() {
        console.log('停止罗盘信息的获取')
      }
    })
    wx.stopGyroscope({
      success: function() {
        console.log('停止陀螺仪信息的获取')
      }
    })
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