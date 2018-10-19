// pages/request/request.js

const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    access_token: '',
    date: ''
  },
  
  formSubmit: function(e) {
    // console.log(e.detail.value);
    var _this=this;
    // console.log(_this.data.access_token, 'access_token')
    // console.log(app.globalData.openid, 'openid')
    // console.log(e.detail.formId, 'formid');
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=' + _this.data.access_token,
      method: 'post',
      data: {
        "touser": app.globalData.openid,
        "template_id": '4XZO7idSKD2n2EAggMxYMPaJB8n2FQieeSoihXvsXGw',
        "form_id": e.detail.formId,
        "data": {
          "keyword1": {
            "value": e.detail.value.input1,
            "color": "#173177"
          },
          "keyword2": {
            "value": e.detail.value.input2, 
            "color": "#173177"
          },
          "keyword3": {
            "value": e.detail.value.input3,
            "color": "#173177"
          }
        },
        // "emphasis_keyword": "key"
      },
      header: {
        'content-type': 'application/json'
      },
      success: function(e) {
        console.log(e.data)
      }
    })
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
    let time = Date.now();
    this.setData({
      date: util.formatDate(new Date(time))
    })
    var _this = this;
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token',
      data: {
        grant_type: 'client_credential',
        appid: 'wx4b967672095dd0f3',
        secret: 'b1e2f8d25a1bf129453c4e743895ea4a'
      },
      method: 'get',
      success: function (res) {
        _this.setData({
          access_token: res.data.access_token
        })
      }
    })
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

  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为 ', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  }
})