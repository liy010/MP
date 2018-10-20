// pages/map/map.js

const personalityMapKey = "GV5BZ-4JQ3U-A7IV2-2YTQS-BPXMF-TPBHG"
let QQMapWX = require('../../utils/qqmap-wx-jssdk.js')
let qqmapsdk
let keyword
let height

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude : null,
    longitude : null, 
    markers: '',
    x: 0,
    y: 0,
    hidden: true,
    personalityMap: '',
    borderColor: "rgb(80, 70, 70)",
    bgColor: "rgb(241, 236, 236)",
    notshowSuggest: true,
    searchSuggest: '',
    searchInputValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: personalityMapKey
    })
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        height = res.screenHeight - 250
      }
    })
    wx.getStorage({
      key: 'map',
      success: function(res) {
        console.log(res)
        that.setData({
          latitude: res.data.latitude,
          longitude: res.data.longitude,
          height: height      
        })
        //console.log('读取map成功')
      },
      fail: function() {
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
              success: function() {
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
    const ctx1 = wx.createCanvasContext('myCanvas1');
    const ctx2 = wx.createCanvasContext('myCanvas2');
    const ctx3 = wx.createCanvasContext('myCanvas3');
    const ctx4 = wx.createCanvasContext('myCanvas4');
    ctx1.setFillStyle('red')
    ctx1.fillRect(80, 40, 150, 75)
    ctx1.draw()

    const grd = ctx3.createLinearGradient(0, 0, 200, 0)
    grd.addColorStop(0, 'black')
    grd.addColorStop(0.5, 'blue')
    grd.addColorStop(1, 'white')
    ctx3.setFillStyle(grd)
    ctx3.fillRect(80, 40, 150, 75)
    ctx3.draw()

    const cgrd = ctx4.createCircularGradient(145, 60, 50)
    cgrd.addColorStop(0, 'black')
    cgrd.addColorStop(1, 'white')
    ctx4.setFillStyle(cgrd)
    ctx4.fillRect(80, 40, 150, 100)
    ctx4.draw()
  },
  start(e) {
    this.setData({
      hidden: false,
      x: e.touches[0].x,
      x: e.touches[0].y
    })
  },
  move(e) {
    this.setData({
      x: e.touches[0].x,
      y: e.touches[0].y
    })
  },
  end(e) {
    this.setData({
      hidden: true
    })
  },
  // markertap(e) {
  //   console.log(e)
  // },

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

  searchTap: function(e) {
    wx.pageScrollTo({
      scrollTop: height + 25,
    })
    this.setData({

    })
  },
  
  searchInput: function(e) {
    let that = this
    let value = e.detail.value
    if (value === '') {
      return 
    } else {
      wx.getLocation({
        success: function (res) {
          qqmapsdk.reverseGeocoder({
            location: {
              latitude: res.latitude,
              longitude: res.longitude,
            },
            success: function(event) {
              qqmapsdk.getSuggestion({
                keyword: value,
                region: event.result.address_component.city,
                success: function (res) {
                  console.log(res)
                  that.setData({
                    searchSuggest: res.data,
                    notshowSuggest: false
                  })
                }
              })
            }
          })
        }
      })
    }
  },

  searchposition: function(e) {
    console.log(e);
    let that = this
    let keyword = e.detail.value
    if (keyword === '') {
      wx.showModal({
        title: '请输入要搜索的内容',
        content: '',
        success: function(e) {
          if(e.cancel) {
            that.setData({
              notshowSuggest: true              
            })
          }
        }
      })
    } else {
      qqmapsdk.search({
        keyword: keyword,
        page_size: 15,
        success: function(res) {
          var mks = []
          for(let i = 0; i < res.data.length; i++) {
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
          wx.pageScrollTo({
            scrollTop: 0,
          })
          that.setData({
            markers: mks,
            notshowSuggest: true,
            searchInputValue: ''
          })
        },
        fail: function(res) {
          console.log(res);
        }
      })
    }
  },

  SuggestText: function(e) {
    console.log(e)
    wx.openLocation({
      latitude: e.target.dataset.lo.lat,
      longitude: e.target.dataset.lo.lng,
      name: e.target.dataset.title,
      address: e.target.dataset.address
    })
    this.setData({
      notshowSuggest: true,
      searchInputValue: ''
    })
  },

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
    qqmapsdk.reverseGeocoder({
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
  }
})