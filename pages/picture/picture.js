// pages/picture/picture.js
const util = require('../../utils/util.js')

wx.cloud.init({
  traceUser: true
})
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  tap: function(e) {
    wx.chooseImage({
      success(res) {
        console.log(res)
        const tempFilePaths = res.tempFilePaths
        console.log(util.pictureName(tempFilePaths[0]))
        wx.cloud.uploadFile({
          cloudPath: 'picture/' + util.pictureName(tempFilePaths[0]),
          filePath: tempFilePaths[0],
          success: res => {
            console.log(res.fileID)
          },
          fail: console.error
        })
      }
    })
  }
})