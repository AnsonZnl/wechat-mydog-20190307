// pages/feedback/feedback.js
import { feed_back } from "../../utils/config"; 
const utils = require('../../utils/util')

Page({
  data:{
    feedbackData: null
  },
  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    console.log('onLoad');
    
    feed_back().then(res => {
      if (res.code == 1200) {
        this.setData({
          feedbackData: res.data
        })
      }
    })
  },
  copyId: function (e) {
    wx.setClipboardData({
      data: e.currentTarget.dataset.code,
      success: res => {
        utils.successShowText('复制成功')
      }
    });
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: '永久入群神器，广告拦截卫士', // 转发标题
      path: '/pages/index/index', // 分享路径
      imageUrl: '/images/pic/mini_program_cover.png'//分享图片
    }
  }
})
