// pages/map/map.js

const app = getApp()
const personalityMapKey = "GV5BZ-4JQ3U-A7IV2-2YTQS-BPXMF-TPBHG"
let QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
let qqmapsdk
let keyword
let height
let detail = ''
let allDetail = ''

const aa = function(title) {
  return new Promise((resolve, reject) => {
    new QQMapWX({ key: personalityMapKey})
    .search({
      keyword: title,
      page_size: 15,
      success: function (res) {
        console.log(res)
        var mks = []
        allDetail = res.data
        for (let i = 0; i < res.data.length; i++) {
          mks.push({
            title: res.data[i].title,
            id: res.data[i].id,
            latitude: res.data[i].location.lat,
            longitude: res.data[i].location.lng,
            iconPath: "/pic/position.png", //图标路径
            width: 20,
            height: 20
          })
        }
        resolve(mks)
      },
      fail: function (res) {
        resolve(res)
      }
    })
  })
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude : null,
    longitude : null, 
    markers: '',
    hidden: true,
    personalityMap: '',
    borderColor: "rgb(80, 70, 70)",
    bgColor: "rgb(241, 236, 236)",
    searchInputValue: '点击以搜索',
    height: '',
    chooseSize: false,
    animationData: {},
    positionInformation: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.qqmapsdk = new QQMapWX({
      key: personalityMapKey
    })

    var that = this
    wx.getSystemInfo({
      success: function (res) {
        height = res.screenHeight - 250
        that.setData({
          height: height,
        })
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
      // 调用接口
    let that = this
    if (app.globalData.title !== '') {
      wx.getLocation({
        success: function(res) {
          aa(app.globalData.title).then((result) => {
            wx.setStorage({
              key: 'markers',
              data: {
                markers: result,
                searchInputValue: app.globalData.title,
                latitude: res.latitude,
                longitude: res.longitude,
              }
            })
            that.setData({
              markers: result,
              searchInputValue: app.globalData.title,
              latitude: res.latitude,
              longitude: res.longitude,
            })
          }).catch((error) => {
            console.log(error)
          })
        },
      })
      console.log(app.globalData.title)
    } else if (app.globalData.lo !== '') {
      console.log(app.globalData)
      detail = app.globalData.lo
      wx.setStorage({
        key: 'map',
        data: {
          latitude: app.globalData.lo.location.lat,
          longitude: app.globalData.lo.location.lng,
          markers: [{
            title: app.globalData.lo.title,
            id: app.globalData.lo.id,
            latitude: app.globalData.lo.location.lat,
            longitude: app.globalData.lo.location.lng,
            iconPath: "/pic/position.png", //图标路径
            width: 30,
            height: 30,
            rotate: 10,
            alpha: 0.8
          }],
        },
        success: function () {
          //console.log('写入map成功')
        }
      })
      this.setData({
        latitude: app.globalData.lo.location.lat,
        longitude: app.globalData.lo.location.lng,
        markers: [{
          latitude: app.globalData.lo.location.lat,
          longitude: app.globalData.lo.location.lng,
          iconPath: "/pic/position.png", //图标路径
          width: 30,
          height: 30,
          title: app.globalData.lo.title,
          id: app.globalData.lo.id,
          rotate: 10,
          alpha: 0.8
        }],
        searchInputValue: app.globalData.lo.title,
      })
      console.log(app.globalData)
    } else {
      wx.getStorage({
        key: 'markers',
        success: function(res) {
          that.setData({
            markers: res.data.markers,
            searchInputValue: res.data.searchInputValue,
            latitude: res.data.latitude,
            longitude: res.data.longitude,
          })
        },
        fail: function() {
          wx.getStorage({
            key: 'map',
            success: function (res) {
              console.log(res)
              that.setData({
                latitude: res.data.latitude,
                longitude: res.data.longitude,
                markers: res.data.markers,
              })
              //console.log('读取map成功')
            },
            fail: function () {
              wx.getLocation({
                success: function (res) {
                  that.setData({
                    latitude: res.latitude,
                    longitude: res.longitude,
                    markers: [{
                      latitude: res.latitude,
                      longitude: res.longitude,
                      markers: [{
                        latitude: res.latitude,
                        longitude: res.longitude,
                        iconPath: "/pic/position.png", //图标路径
                        width: 30,
                        height: 30,
                        rotate: 10,
                        alpha: 0.8
                      }],
                    }]
                  }),
                    wx.setStorage({
                      key: 'map',
                      data: {
                        latitude: res.latitude,
                        longitude: res.longitude,
                        markers: [{
                          latitude: res.latitude,
                          longitude: res.longitude,
                          iconPath: "/pic/position.png", //图标路径
                          width: 30,
                          height: 30,
                          rotate: 10,
                          alpha: 0.8
                        }],
                      },
                      success: function () {
                        //console.log('写入map成功')
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
        }
      })
    } 
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    app.globalData.title = '',
    app.globalData.lo = ''
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    wx.removeStorage({
      key: 'map',
      success: function(res) {},
    })
    wx.removeStorage({
      key: 'markers',
      success: function(res) {},
    })
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

  searchTap: function(e) {
    detail = '';
    allDetail = '';
    wx.navigateTo({
      url: '../search/search',
    })
  },
  
  // searchInput: function(e) {
  //   let that = this
  //   let value = e.detail.value
  //   if (value === '') {
  //     return 
  //   } else {
  //     wx.getLocation({
  //       success: function (res) {
  //         that.qqmapsdk.reverseGeocoder({
  //           location: {
  //             latitude: res.latitude,
  //             longitude: res.longitude,
  //           },
  //           success: function(event) {
  //             that.qqmapsdk.getSuggestion({
  //               keyword: value,
  //               region: event.result.address_component.city,
  //               success: function (res) {
  //                 console.log(res)
  //                 that.setData({
  //                   searchSuggest: res.data,
                    
  //                 })
  //               }
  //             })
  //           }
  //         })
  //       }
  //     })
  //   }
  // },

  // searchposition: function(e) {
  //   console.log(e);
  //   let that = this
  //   let keyword = e.detail.value
  //   if (keyword === '') {
  //     wx.showModal({
  //       title: '请输入要搜索的内容',
  //       content: '',
  //       success: function(e) {
  //         if(e.cancel) {
  //           that.setData({
  //             notshowSuggest: true              
  //           })
  //         }
  //       }
  //     })
  //   } else {
  //     qqmapsdk.search({
  //       keyword: keyword,
  //       page_size: 15,
  //       success: function(res) {
  //         var mks = []
  //         for(let i = 0; i < res.data.length; i++) {
  //           mks.push({
  //             title: res.data[i].title,
  //             id: res.data[i].id,
  //             latitude: res.data[i].location.lat,
  //             longitude: res.data[i].location.lng,
  //             iconPath: "/pic/position.png", //图标路径
  //             width: 20,
  //             height: 20
  //           })
  //         }
  //         wx.pageScrollTo({
  //           scrollTop: 0,
  //         })
  //         that.setData({
  //           markers: mks,
  //           notshowSuggest: true,
  //           searchInputValue: ''
  //         })
  //       },
  //       fail: function(res) {
  //         console.log(res);
  //       }
  //     })
  //   }
  // },

  // SuggestText: function(e) {
  //   console.log(e)
  //   wx.openLocation({
  //     latitude: e.target.dataset.lo.lat,
  //     longitude: e.target.dataset.lo.lng,
  //     name: e.target.dataset.title,
  //     address: e.target.dataset.address
  //   })
  //   this.setData({
  //     notshowSuggest: true,
  //     searchInputValue: ''
  //   })
  // },

  regetpositionTap: function() {
    let that = this
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
            success: function () {
              //console.log('写入map成功')
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
  },
  mapTap: function(e) {
    console.log(e)
    this.qqmapsdk.reverseGeocoder({
      location: {
        latitude: e.target.dataset.latitude,
        longitude: e.target.dataset.longitude
      },
      success: function(res) {
        console.log(res);
        wx.openLocation({
          latitude: e.currentTarget.dataset.latitude,
          longitude: e.currentTarget.dataset.longitude,
          name: res.result.address
        })
      },
      fail: function(e) {
        console.log(e);
      }
    })
  },
  choosepositionTap: function(e) {
    let that = this
    wx.chooseLocation({
      success: function(res) {
        console.log(res)
        console.log(res.address);
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
        })
      },
    })
  },
  changeMapStyleTap: function(e) {
    let bgcolor = e.currentTarget.dataset.bgcolor
    if (bgcolor === "rgb(241, 236, 236)") {
      this.setData({
        borderColor: "rgb(241, 236, 236)",
        bgColor: "rgb(80, 70, 70)",
        personalityMap: personalityMapKey
      })
    } else {
      this.setData({
        borderColor: "rgb(80, 70, 70)",
        bgColor: "rgb(241, 236, 236)",
        personalityMap: ''        
      })
    }
  },
  markertap: function (e) {
    console.log(detail)
    if(detail !== '') {
      this.setData({
        positionInformation: detail
      })
    } else {
        let id = e.markerId;
        for(let i=0,len=allDetail.length; i < len; i++) {
          if(allDetail[i].id === id) {
            this.setData({
              positionInformation: allDetail[i]
            })
          }
        }
    }
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(200).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export(),
      // 改变view里面的Wx：if
      chooseSize: true
    })
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },
  hideModal: function (e) {
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY(200).step()
    that.setData({
      animationData: animation.export()

    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export(),
        chooseSize: false
      })
    }, 200)
  },
  phone: function(e) {
    wx.makePhoneCall({
      phoneNumber: 'e.currentTarget.dataset.phone',
    })
  },
  lineWay: function(e) {
    wx.openLocation({
      latitude: e.currentTarget.dataset.position.lat,
      longitude: e.currentTarget.dataset.position.lng,
      name: e.currentTarget.dataset.name
    })
  }
})