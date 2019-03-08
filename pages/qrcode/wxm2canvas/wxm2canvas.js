// pages/qrcode/wxm2canvas/wxm2canvas.js
const wxml2canvas = require('../../../utils/js/wxml2canvas.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    view:true,
    btnStatus:true

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },


  drawCanvas:function(){
    let self = this
    const wrapperId = '#wrapper'
    const drawClassName = '.draw'
    const canvasId = 'canvas-map'

    //刚开始图片没有绘制出来，是因为canvas的大小太小了 没有设置高宽 同时要设置pade的大小
    wxml2canvas(wrapperId, drawClassName, canvasId).then(()=>{
      self.setData({
        view:false,
        btnStatus:false
      },()=>{
          self.setData({
            btnStatus: true
          })
      })
    })

  }
})