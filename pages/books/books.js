// pages/books/books.js
const util = require('../../utils/util.js')

const key ="50f7447a0810b4cfca214e302025f913"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: '',
    detailhidden: true,
    itembook: '',
    link: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    let that = this
    let requesturl = util.bookurl()
    console.log(requesturl)
    wx.showLoading({
      title: '正在加载',
    })
    wx.request({
      url: requesturl,
      header: {
        'key': key
      },
      success: function (res) {
        console.log(res);
        if(res.data.resultcode === "202") {
          wx.showLoading({
            title: '正在加载',
          })
          let nextrequesturl = util.bookurl('1')
          console.log(nextrequesturl);
          wx.request({
            url: nextrequesturl,
            header: {
              'key': key
            },
            success: function (res) {
              console.log(res.data)
              that.setData({
                bookList: res.data.result.data
              })
              wx.hideLoading()
            },
          }) 
        } else {
          that.setData({
            bookList: res.data.result.data
          })
          wx.hideLoading()
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      wx.hideLoading()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  // onShow: function () {

  // },

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
  chooseTap: function(e) {
    let that = this
    let rambdaNumber = Math.ceil(Math.random()*30)
    console.log(e.target.dataset.catalogid)
    console.log(e)
    // let paragram = {
    //   catalog_id: e.target.dataset.catalogid,
    //   pn: rambdaNumber,
    //   rn: 6
    // }
    // let a = 'http://apis.juhe.cn/goodbook/query?key=' + key + '&catalog_id=' + paragram['catalog_id'] + '&rn=' + paragram.pn + '&pn=' + paragram.pn
    // console.log(a)
    wx.request({
      url: 'http://apis.juhe.cn/goodbook/query',
      data: {
        catalog_id: e.target.dataset.catalogid + 0,
        pn: rambdaNumber,
        rn: 6,
        dtype: '',
        key: key
      },
      header: {
        'key': key
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          bookList: res.data.result.data,
        })
      },
      fail: function(res) {
        wx.showModal({
          title: '网络错误， 请稍后再试',
          content: res.resultcode,
        })
      }
    })
  },
  itembookTap: function(e) {
    console.log(typeof(e.currentTarget.dataset.itembook.online))
    let result = util.onlineIndex(e.currentTarget.dataset.itembook.online)
    this.setData({
      link: result,
      itembook: e.currentTarget.dataset.itembook,
      detailhidden: false
    })
  },
  linkTap: function(e) {
    let data = e.currentTarget.dataset.link
    wx.setClipboardData({
      data: data,
      success: function() {
        wx.showToast({
          title: '复制成功',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function() {
        wx.showToast({
          title: '复制失败，请稍后再试',
          icon: 'fail',
          duration: 2000
        })
      }
    })
  }
})