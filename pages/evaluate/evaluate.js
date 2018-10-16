// pages/evaluate/evaluate.js
const app = getApp()
const util = require('../../utils/util.js')
var hasClick = false

wx.cloud.init({
  traceUser: true
})
const commentListDB = wx.cloud.database()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: '',
    time: '',
    com: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    commentListDB.collection('commentList').orderBy('time', 'desc').limit(15).get({
      success: function(res) {
        // console.log(res.data)
        let datas = res.data
        for(let i=0, len=datas.length; i<len; i++) {
          datas[i].time = util.formatTime(new Date(datas[i].time))
        }
        that.setData({
          commentList: datas
        })
        // console.log(datas)
      },
      fail: function() {
        wx.showToast({
          title: '评价内容获取失败，请稍后再试',
          icon: 'fail',
          duration: 1500
        })
      }
    })
    // console.log(todos)

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

  // tap: function() {
  //   if (hasClick) {
  //     return
  //   }
  //   hasClick = true
  //   wx.showLoading({
  //     title: '正在发送···',
  //   })
  //   setTimeout(() => {
  //     hasClick = false
  //     wx.showToast({
  //       title: '已发送',
  //       icon: 'success',
  //       duration: 1300
  //     })
  //   }, 1500)
  // },
  formSubmit: function(e) {
    // console.log(e)
    let that = this
    let time = new Date().getTime()
    let comment = e.detail.value.input
    let color = 'black'
    commentListDB.collection('commentList').add({
      data: {
        comment: comment,
        color: color,
        time: time
      },
      success: function(res) {
        console.log(res)
        commentListDB.collection('commentList').orderBy('time', 'desc').limit(10).get({
          success: function (res) {
            // console.log(res.data)
            let datas = res.data
            for (let i = 0, len = datas.length; i < len; i++) {
              datas[i].time = util.formatTime(new Date(datas[i].time))
            }
            that.setData({
              commentList: datas,
              com: ''
            })
            wx.showToast({
              title: '已发送',
              icon: 'success',
              duration: 1300
            })
            // console.log(datas)
          },
          fail: function () {
            wx.showToast({
              title: '评价内容获取失败，请稍后再试',
              icon: 'fail',
              duration: 1500
            })
          }
        })
      }
    })
  }
})