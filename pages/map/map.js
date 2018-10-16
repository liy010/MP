// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude : null,
    longitude : null, 
    markers: [{
      id: 1,
      latitude: null,
      longitude: null,
      name: 'Home'
    }],
    x: 0,
    y: 0,
    hidden: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'map',
      success: function(res) {
        console.log(res)
        that.setData({
          latitude: res.data.latitude,
          longitude: res.data.longitude          
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

  mapTap: function() {
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
  }
})