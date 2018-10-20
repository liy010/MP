// pages/picture/picture.js
const util = require('../../utils/util.js')
const app = getApp()

wx.cloud.init({
  traceUser: true
})
const pictureListDB = wx.cloud.database()
const MAX_LIMIT = 10
let offset = 0
let total
const countResult = pictureListDB.collection('pictureID').where({
  _openid: app.globalData.openid
}).count()
//console.log(countResult)
countResult.then((result) => {
    total = result.total
})
let tasks = []

Page({

  /**
   * 页面的初始数据
   */
  data: {
    srcList: '',
    height: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          height: res.screenWidth / 3
        })
      },
    })
    pictureListDB.collection('pictureID').where({
      _openid: app.globalData.openid
    }).skip(offset).limit(MAX_LIMIT).get({
      success: (res) => {
        //console.log(res)
        for (let i = 0, len = res.data.length; i < len; i++) {
          tasks.push(res.data[i].pid)
        }
        //console.log(tasks)
        offset += MAX_LIMIT
        that.setData({
          srcList: tasks
        })
      },
      fail: (e) => {
        console.log(e)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onShow: function () {
    // console.log(total)
    let that = this
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onReady: function () {
    
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
    offset = 0
    tasks = []
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
    if (offset > total) {
      return
    } else {
      let that = this
      pictureListDB.collection('pictureID').where({
        _openid: app.globalData.openid
      })
      .skip(offset)
      .limit(MAX_LIMIT)
      .get({
        success: (res) => {
          for (let i = 0, len = res.data.length; i < len; i++) {
            tasks.push(res.data[i].pid)
          }
          offset += MAX_LIMIT
          that.setData({
            srcList: tasks
          })
          //console.log(tasks)
        },
        fail: (e) => {
          console.log(e)
        }
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  tap: function(e) {
    let that = this
    wx.chooseImage({
      success(res) {
        //console.log(res)
        const tempFilePaths = res.tempFilePaths
        //console.log(util.pictureName(tempFilePaths[0]))
        wx.cloud.uploadFile({
          cloudPath: 'picture/' + util.pictureName(tempFilePaths[0]),
          filePath: tempFilePaths[0],
          success: res => {
            //console.log(res.fileID)
            pictureListDB.collection('pictureID').add({
              data: {
                //_openid: app.globalData.openid,
                pid: res.fileID
              },
              success: function(res) {
                //console.log(res)
              }
            })
            tasks.push(res.fileID)
            that.setData({
              srcList: tasks
            })
          },
          fail: console.error
        })
      }
    })
  },
  pictureTap: function(e) {
    wx.previewImage({
      urls: tasks,
      current: e.target.dataset.src,
      success: function(e) {
        //console.log('图片预览成功')
      }
    })
  }
})