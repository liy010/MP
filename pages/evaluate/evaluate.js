// pages/evaluate/evaluate.js
const app = getApp()
const util = require('../../utils/util.js')
var hasClick = false

wx.cloud.init({
  traceUser: true
})
const commentListDB = wx.cloud.database()
const MAX_LIMIT = 10
let offset = 0
let total
const countResult = commentListDB.collection('commentList').count()
//console.log(countResult)
countResult.then((result) => {
  total = result.total
})

let tasks = []
let commentindex = ''

Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList: '',
    time: '',
    com: '',
    buttonletter: "点击加载更多 ···",
    showNot: false,
    commentChange: '',
    commentCache: '',
    comment_index: '',
    lineHeight: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // console.log(todos)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    let that = this
    commentListDB.collection('commentList').orderBy('time', 'desc').skip(offset).limit(MAX_LIMIT).get({
      success: function (res) {
        //console.log(res.data)
        offset += MAX_LIMIT
        let datas = res.data
        for (let i = 0, len = datas.length; i < len; i++) {
          datas[i].time = util.formatTime(new Date(datas[i].time))
        }
        //console.log(datas)
        tasks = tasks.concat(datas)
        //console.log(tasks)
        that.setData({
          commentList: tasks
        })
        // console.log(datas)
      },
      fail: function () {
        wx.showToast({
          title: '评价内容获取失败，请稍后再试',
          icon: 'fail',
          duration: 1500
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

  // tap: function() {
  //   if (hasClick) {
  //     return
  //   }
  //   hasClick = true
  //   wx.showLoading({
  //     title: '正在发送···',
  //   })
  //   setTimeout(() => {
  //     hasClick = false
  //     wx.showToast({
  //       title: '已发送',
  //       icon: 'success',
  //       duration: 1300
  //     })
  //   }, 1500)
  // },
  formSubmit: function(e) {
    // console.log(e)
    let that = this
    let time = new Date().getTime()
    let comment = e.detail.value.input
    let color = 'black'
    console.log(e)
    if (comment == '') {
      wx.showModal({
        title: '请输入评论内容！',
        content: '',
      }) 
    } else {
      commentListDB.collection('commentList').add({
        data: {
          comment: comment,
          color: color,
          time: time
        },
        success: function (res) {
          // console.log(res)
          // commentListDB.collection('commentList').orderBy('time', 'desc').limit(10).get({
          //   success: function (res) {
          //     //console.log(res.data)
          //     let datas = res.data
          //     for (let i = 0, len = datas.length; i < len; i++) {
          //       datas[i].time = util.formatTime(new Date(datas[i].time))
          //     }
          let newcoment = {
            comment: comment,
            time: util.formatTime(new Date(time)),
            color: color
          }
          tasks.unshift(newcoment)
          that.setData({
            commentList: tasks,
            com: ''
          })
          wx.showToast({
            title: '已发送',
            icon: 'success',
            duration: 2000
          })
          // console.log(datas)
        },
        fail: function () {
          wx.showToast({
            title: '评价内容获取失败，请稍后再试',
            icon: 'fail',
            duration: 1500
          })
        }
      })
    }
  },
  moreTap: function(e) {
    let that = this
    if (offset < total) {
      commentListDB.collection('commentList').orderBy('time', 'desc').skip(offset).limit(MAX_LIMIT).get({
        success: function (res) {
          //console.log(res.data)
          offset += MAX_LIMIT
          let datas = res.data
          for (let i = 0, len = datas.length; i < len; i++) {
            datas[i].time = util.formatTime(new Date(datas[i].time))
          }
          tasks = tasks.concat(datas)
          if (offset > total) {
            that.setData({
              buttonletter: "没有更多了 ···",
              commentList: tasks
            })
          } else {
            that.setData({
              commentList: tasks
            })
          }
          // console.log(datas)
        },
        fail: function () {
          wx.showToast({
            title: '评价内容获取失败，请稍后再试',
            icon: 'fail',
            duration: 1500
          })
        }
      })
    }  
  },
  changeCommentTap: function(e) {
    this.setData({
      showNot: true,
      commentChange: e.target.dataset.comment,
      commentCache: e.target.dataset
    })
  },
  deleteCommentTap: function(e) {
    let that = this
    console.log(e)
    wx.showModal({
      title: '你确定要删除这条评论？',
      content: e.target.dataset.comment,
      success: function(event) {
        console.log(event)
        if(event.confirm) {
          console.log('a')
          commentListDB.collection('commentList').doc(e.target.dataset.id).remove({
            success: function(res) {
              console.log(res)
              console.log(e.target.dataset.index)
              tasks.splice(e.target.dataset.index, 1)
              console.log(tasks)
              that.setData({
                commentList: tasks
              })
              wx.showToast({
                title: '删除成功',
                icon: 'success',
                duration: 2000
              })
            },
            fail: function(res) {
              console.log(res)
            }
          })
        } 
      }
    })
  },
  cancelTap: function(e) {
    this.setData({
      commentChange: '',
      showNot: false,
      commentCache: ''
    })
  },
  changSubmit: function(e) {
    let time = new Date().getTime()
    let that = this
    console.log(e);
    let index = e.detail.target.dataset.commentcache.index
    commentListDB.collection('commentList').doc(e.detail.target.dataset.commentcache.id).update({
      data: {
        comment: e.detail.value.change,
        time: time
      },
      success: function() {
        tasks[index].comment = e.detail.value.change
        console.log(tasks[index])
        that.setData({
          commentList: tasks,
          commentChange: '',
          showNot: false,
          commentCache: ''
        })

      },
      fail: function() {
        wx.showToast({
          title: '修改失败，请稍后再试',
          icon: 'fail',
          duration: 2000
        })
      }
    })
  },
  commentTap: function(e){
    var query = wx.createSelectorQuery();
    query.selectAll('.list').boundingClientRect(function(rect) {
      rect.height
    }).exec((res) => {
      console.log(res);
      if (commentindex === '' || commentindex !== e.currentTarget.dataset.commentindex) {
        commentindex = e.currentTarget.dataset.commentindex
      } else {
        commentindex = ''
      }
      console.log(e)
      this.setData({
        comment_index: commentindex,
        lineHeight: res[0][e.currentTarget.dataset.commentindex].height
      })
    })
  },
})