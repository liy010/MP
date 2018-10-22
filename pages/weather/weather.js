// pages/weather/weather.js
var bmap = require('../../libs/bmap-wx.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weatherData: '',
    city: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var BMap = new bmap.BMapWX({
      ak: 'iWyYK20txL5AfjtGy0w363xA4DpuiBzo'
    })
    var fail = function(data) {
      console.log(data)
    }
    var success = function(data) {
      console.log(data)
      var weatherData = data.currentWeather[0];
      weatherData = '城市：' + weatherData.currentCity + '\n' + 'PM2.5：' + weatherData.pm25 + '\n' + '日期：' + weatherData.date + '\n' + '温度：' + weatherData.temperature + '\n' + '天气：' + weatherData.weatherDesc + '\n' + '风力：' + weatherData.wind + '\n'; 
      that.setData({
        weatherData: weatherData,
        city: weatherDataCity
      });
    }
    BMap.weather({
      fail: fail,
      success: success
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

  }
})