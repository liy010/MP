// pages/weather/weather.js
var bmap = require('../../libs/bmap-wx.js');
var util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weatherData: '',
    city: '',
    originalweatherData: '',
    pm: {
      pmColor: '',
      airQuality: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this, originalweatherData = []
    this.BMap = new bmap.BMapWX({
      ak: 'iWyYK20txL5AfjtGy0w363xA4DpuiBzo'
    })
    var fail = function(data) {
      console.log(data)
    }
    var success = function(data) {
      let pm
      // console.log(data)
      var weatherData = data.currentWeather[0];
      weatherData['now'] = util.real_time_temperature(weatherData.date)
      originalweatherData = data.originalData.results[0].weather_data
      originalweatherData[0].date = '今天'      
      console.log(weatherData)
      console.log(originalweatherData)
      if(weatherData['pm25'] < 60) {
        pm = {
          pmColor: '#0c0',
          airQuality: '优'
        }
      } else if (weatherData['pm25'] < 100) {
        pm = {
          pmColor: '#fc0',
          airQuality: '良'
        }
      } else {
        pm = {
          pmColor: 'c00',
          airQuality: '差'
        }
      }
      console.log(pm)
      let city = weatherData.currentCity
      that.setData({
        currentweatherData: weatherData,
        city: city,
        originalweatherData: originalweatherData,
        pm: pm
      });
    }
    this.BMap.weather({
      fail: fail,
      success: success
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.animation = wx.createAnimation({
      duration: 1000
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

  cityTap: function(e) {
   
  },
  shuaxinTap: function(e) {
    this.animation.rotate(720).step()
    this.setData({ animation: this.animation.export() })

    var that = this, originalweatherData = []
    var fail = function (data) {
      console.log(data)
    }
    var success = function (data) {
      // console.log(data)
      let pm
      var weatherData = data.currentWeather[0];
      let city = weatherData.currentCity
      weatherData['now'] = util.real_time_temperature(weatherData.date)
      originalweatherData = data.originalData.results[0].weather_data
      originalweatherData[0].date = '今天'
      console.log(weatherData)
      console.log(originalweatherData)
      // for(let i = 1; i < 4; i++) {
      //   originalweatherData[i-1] = originalweatherDataTemp[i]
      // }
      if (weatherData['pm25'] < 60) {
        pm = {
          pmColor: '#0c0',
          airQuality: '优'
        }
      } else if (weatherData['pm25'] < 100) {
        pm = {
          pmColor: '#fc0',
          airQuality: '良'
        }
      } else {
        pm = {
          pmColor: 'c00',
          airQuality: '差'
        }
      }
      that.animation.rotate(0, 0).step()
      that.setData({
        currentweatherData: weatherData,
        city: city,
        originalweatherData: originalweatherData,
        pm: pm,
        animation: that.animation.export()
      });
    }
    this.BMap.weather({
      fail: fail,
      success: success
    })
  }
})