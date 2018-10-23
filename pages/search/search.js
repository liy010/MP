// pages/search/search.js

const app = getApp()
const personalityMapKey = "GV5BZ-4JQ3U-A7IV2-2YTQS-BPXMF-TPBHG"
let QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
let qqmapsdk

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchSuggest: '',
    focus: true,
    searchInputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.qqmapsdk = new QQMapWX({
      key: personalityMapKey
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
  searchInput: function(e) {
    let that = this
    let value = e.detail.value
    if (value === '') {
      return 
    } else {
      wx.getLocation({
        success: function (res) {
          that.qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude,
            },
            success: function(event) {
              that.qqmapsdk.getSuggestion({
                keyword: value,
                region: event.result.address_component.city,
                success: function (res) {
                  console.log(res)
                  that.setData({
                    searchSuggest: res.data,
                  })
                }
              })
            }
          })
        }
      })
    }
  },

  SuggestText: function(e) {
    app.globalData.lo = e.currentTarget.dataset
    this.setData({
      searchInputValue: e.currentTarget.dataset.title
    })
    wx.navigateBack({
      delta: 1,
      success: function () {
        console.log('返回map页面')
      }
    })
  },

  searchConfirm: function(e) {
    // console.log(e)
    let that = this
    let keyword = e.detail.value
    app.globalData.title = keyword
    wx.navigateBack({
      delta: 1,
      success: function() {
        console.log('返回map页面')
      }
    })
  }
})