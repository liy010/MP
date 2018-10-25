// pages/weather/weather.js
var bmap = require('../../libs/bmap-wx.js');

const personalityMapKey = "GV5BZ-4JQ3U-A7IV2-2YTQS-BPXMF-TPBHG"
let QQMapWX = require('../../utils/qqmap-wx-jssdk.js')

var util = require('../../utils/util.js');
const app =getApp()
const db = wx.cloud.database()
let docId

let cityArray

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
    },
    chooseAddTap: false,
    region: ['北京市', '北京市', '北京市'],
    customItem: '无',
    total: '',
    listIndex: -1,
    startPoint: [0, 0],
    positionColor: 'white'
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
          pmColor: '#c00',
          airQuality: '差'
        }
      }
      console.log(pm)
      let city = weatherData.currentCity
      console.log(weatherData)
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
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let that = this
    db.collection('weather').where({
      _openid: app.globalData.openid
    }).get({
      success: function (res) {
        docId = res.data[0]._id
        console.log(res)
        cityArray = res.data[0].city
        console.log(cityArray)
        that.setData({
          total: cityArray.length,
        })
      },
      fail: function (error) {
        console.log(error)
      }
    })
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
      // console.log(weatherData)
      // console.log(originalweatherData)
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
  },

  addTap: function(e) {
    this.setData({
      chooseAddTap: true,
    })
  },

  bindRegionChange: function(e) {
    let that = this
    console.log(e)
    //cityArray.push(e.detail.value)
    if(cityArray.length <= 8) {
      const _ = db.command
      db.collection('weather').doc(docId).update({
        data: {
          city: _.push(e.detail.value[1])
        },
        success: function(res){
          cityArray.push(e.detail.value[1])
          that.setData({
            region: e.detail.value,
            total: cityArray.length,
            chooseAddTap: false
          })
        },
        fail: function(err) {
          wx.showModal({
            title: '数据库错误，请稍后再试',
            content: 'err',
            showCancel: true,
            cancelText: '',
            cancelColor: '',
            confirmText: '',
            confirmColor: '',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
          })
        }
      })
    } else {
      wx.showModal({
        title: '抱歉，最多只能添加8个',
        content: '',
        showCancel: true,
        cancelText: '',
        cancelColor: '',
        confirmText: '',
        confirmColor: '',
        success: function(res) {},
        fail: function(res) {},
        complete: function(res) {},
      })
    }
  },

  bindPickerCancel: function(e) {
    console.log(e)
    this.setData({
      chooseAddTap: false
    })
  },

  mytouchstart: function(e) {
    this.setData({startPoint: [e.touches[0].pageX, e.touches[0].pageY]});
  },

  mytouchend: function(e) {
    let pm
    console.log(e)
    let that = this
    var curPoint = [e.changedTouches[0].pageX, e.changedTouches[0].pageY];
    var startPoint = this.data.startPoint;
    if(curPoint[0] <= startPoint[0]) {
      if(Math.abs(curPoint[0] - startPoint[0]) >= Math.abs(curPoint[1] - startPoint[1])) {
        if( that.data.listIndex + 1 < cityArray.length) {
          console.log('左滑')
          let city = cityArray[that.data.listIndex + 1] 
          console.log(city)
          new QQMapWX({
            key: personalityMapKey
          }).geocoder({
            address: city,
            success: function(res) {
              let lo = util.tecentToBaidu(res.result.location.lng,res.result.location.lat)
              console.log(lo)
              that.BMap.weather({
                location: lo.lng + ',' + lo.lat,
                success: function(data) {
                  console.log(data)
                  let weatherData = data.currentWeather[0]
                  weatherData['now'] = util.real_time_temperature(weatherData.date)
                  let originalweatherData = data.originalData.results[0].weather_data
                  originalweatherData[0].date = '今天'
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
                  that.setData({
                    currentweatherData: weatherData,
                    city: weatherData.currentCity,
                    originalweatherData: originalweatherData,
                    pm: pm,
                    listIndex: that.data.listIndex + 1,
                    positionColor: '#ccc',
                    startPoint: [0, 0]
                  });
                },
                fail: function(error) {
                  console.log('百度地图查询天气错误', error)
                }
              })
            },
            fail: function(e) {
              console.log(e)
            },
            complete: function (res) {
              console.log(res);
            }
          })
        } else {
          var fail = function (data) {
            console.log(data)
          }
          var success = function (data) {
            // console.log(data)
            let pm
            var weatherData = data.currentWeather[0];
            let city = weatherData.currentCity
            weatherData['now'] = util.real_time_temperature(weatherData.date)
            let originalweatherData = data.originalData.results[0].weather_data
            originalweatherData[0].date = '今天'
            // console.log(weatherData)
            // console.log(originalweatherData)
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
            that.setData({
              currentweatherData: weatherData,
              city: city,
              originalweatherData: originalweatherData,
              pm: pm,
              listIndex: -1,
              positionColor: 'white'
            });
          }
          this.BMap.weather({
            fail: fail,
            success: success
          })
        }
      }
    } else {
      let that = this      
      if (Math.abs(curPoint[0] - startPoint[0]) >= Math.abs(curPoint[1] - startPoint[1])) {
        if (that.data.listIndex - 1 > -1) {
          console.log('右滑')
          let city = cityArray[that.data.listIndex - 1] 
          new QQMapWX({
            key: personalityMapKey
          }).geocoder({
            address: city,
            success: function (res) {
              console.log(res)
              let lo = util.tecentToBaidu(res.result.location.lng, res.result.location.lat)
              console.log(lo)
              that.BMap.weather({
                location: lo.lng + ',' + lo.lat,
                success: function (data) {
                  console.log(data)
                  let weatherData = data.currentWeather[0]
                  weatherData['now'] = util.real_time_temperature(weatherData.date)
                  let originalweatherData = data.originalData.results[0].weather_data
                  originalweatherData[0].date = '今天'
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
                  that.setData({
                    currentweatherData: weatherData,
                    city: weatherData.currentCity,
                    originalweatherData: originalweatherData,
                    pm: pm,
                    listIndex: that.data.listIndex - 1,
                    positionColor: '#ccc',
                    startPoint: [0, 0]
                  });
                },
                fail: function (error) {
                  console.log('百度地图查询天气错误', error)
                }
              })
            },
            fail: function(e) {
              console.log(e)
            }
          })
        } else if (that.data.listIndex - 1 === -1) {
          var fail = function (data) {
            console.log(data)
          }
          var success = function (data) {
            // console.log(data)
            let pm
            var weatherData = data.currentWeather[0];
            let city = weatherData.currentCity
            weatherData['now'] = util.real_time_temperature(weatherData.date)
            let originalweatherData = data.originalData.results[0].weather_data
            originalweatherData[0].date = '今天'
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
            that.setData({
              currentweatherData: weatherData,
              city: city,
              originalweatherData: originalweatherData,
              pm: pm,
              listIndex: -1,
              positionColor: 'white'
            });
          }
          that.BMap.weather({
            fail: fail,
            success: success
          })
        } else {
          console.log('last')
          new QQMapWX({
            key: personalityMapKey
          }).geocoder({
            address: cityArray[cityArray.length - 1],
            success: function (res) {
              console.log(res)
              let lo = util.tecentToBaidu(res.result.location.lng, res.result.location.lat)
              that.BMap.weather({
                location: lo.lng + ',' + lo.lat,
                success: function (data) {
                  console.log(data)
                  let weatherData = data.currentWeather[0]
                  weatherData['now'] = util.real_time_temperature(weatherData.date)
                  let originalweatherData = data.originalData.results[0].weather_data
                  originalweatherData[0].date = '今天'
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
                  that.setData({
                    currentweatherData: weatherData,
                    city: weatherData.currentCity,
                    originalweatherData: originalweatherData,
                    pm: pm,
                    listIndex: cityArray.length - 1,
                    positionColor: '#ccc',
                    startPoint: [0, 0]
                  });
                },
                fail: function (error) {
                  console.log('百度地图查询天气错误', error)
                }
              })
            },
            fail: function (e) {
              console.log(e)
            }
          })
        }
      }
    }
  },
  pickerIconTap: function(e) {
    this.setData({
      chooseAddTap: false
    })
  }
})