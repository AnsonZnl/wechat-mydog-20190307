
import drawQrcode from '../../utils/js/weapp.qrcode'
import { get_group_qrcode } from "../../utils/config";
const utils = require('../../utils/util')
const app = getApp()
Page({
  data: {
    stop: true,
    groupMsg: null,
    openSet: false
  },
  onLoad: function (options) {
    let self = this;
    console.log(options, 'options')
    let group_code = options.group_code
    utils.showLoading();
    get_group_qrcode(group_code).then(res => {
      if (res.code == 1200) {
        self.setData({
          groupMsg: res.data
        })
        self.drawQrcode(res.data.qrcode);//绘制二维码
      } else { //code 1403 群二维码已失效 
        //没有导群
        utils.hideLoading();
        utils.pageGo('/pages/errorPage/errorPage', 2)
      }
    })
  },
  //生成二维码
  drawQrcode: function (codeUrl) {
    let self = this
    utils.showLoading()
    drawQrcode({
      width: 250,
      height: 250,
      canvasId: 'myQrcode',
      // ctx: wx.createCanvasContext('myQrcode'),
      text: codeUrl,//二维码内容
      callback(e) {
        //callback 回调不准确 目前只能通过callback加定时器延时来解决 https://github.com/yingye/weapp-qrcode/issues/18
        setTimeout(() => {
          self.canvasToTempFilePath('myQrcode', 1)
        }, 500);
      }
    })

  },
  downloadQrcode: function (params) {
    this.canvasToTempFilePath('groupQrcode', 2)
  },
  canvasToTempFilePath: function (canvasId, type) {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      width: 320,//画布宽度（默认为canvas宽度-x）
      height: 468,
      destWidth: type == 1 ? 250 : 320 * 2,//输出图片宽度（默认为 width * 屏幕像素密度
      destHeight: type == 1 ? 250 : 468 * 2,
      canvasId: canvasId,
      quality: 1.0,
      fileType: 'jpg',
      success: res => {
        if (type == 1) {//二维码
          this.createdCode(res.tempFilePath)//渲染页面
        } else {
          this.saveImageToPhotosAlbum(res.tempFilePath)
        }
      }
    }, this);
  },
  saveImageToPhotosAlbum: function (tempFilePath) {
    let self = this
    const { stop } = self.data
    if (!stop) return
    self.setData({ stop: false });
    wx.getSetting({
      success(res) {
        // 如果没有则获取授权
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              self.saveImage(tempFilePath)
            },
            fail() {
              console.log('fail')
              // 如果用户拒绝过或没有授权，则再次打开授权窗口
              //（ps：微信api又改了现在只能通过button才能打开授权设置，以前通过openSet就可打开，下面有打开授权的button弹窗代码）
              self.setData({
                openSet: true
              })
              // wx.showModal({
              //   title: '温馨提示',
              //   content: '您已拒绝授权，是否去设置打开？',
              //   confirmText: "确认",
              //   cancelText: "取消",
              //   confirmColor:'#2ABE76',
              //   success(res) {
              //     if (res.confirm) {
              //       // console.log('用户点击确认')
              //       wx.openSetting({
              //         success: (res) => {
              //           res.authSetting = {
              //             "scope.writePhotosAlbum": true,
              //           }
              //         }
              //       })
              //     } else {
              //       console.log('用户点击取消')
              //     }
              //   }
              // })
            },
          })
        } else {
          self.saveImage(tempFilePath)
        }
      },
      complete: function () {
        self.setData({
          stop: true
        })
      }
    })
  },
  // 授权
  cancleSet(e) {
    console.log(e)

    this.setData({
      openSet: false
    })
  },
  saveImage: function (tempFilePath) {
    let self = this
    wx.saveImageToPhotosAlbum({
      filePath: tempFilePath,
      success: (res) => {
        if (res.errMsg == "saveImageToPhotosAlbum:ok") {
          utils.successShowText('下载成功')
        }
      },
      fail: function () {
        utils.successShowText('下载失败')
      },
      complete: function () {
        self.setData({
          stop: true
        })
      }
    });
  },
  createdCode: function (qrcodeUrl) {
    const ctx = wx.createCanvasContext('groupQrcode')

    ctx.setFillStyle('#ffffff');
    ctx.fillRect(0, 0, 320 * 2, 468 * 2);

    ctx.drawImage('/images/icon/profile_group.png', 30, 50, 50, 50)
    ctx.drawImage(qrcodeUrl, 35, 145, 250, 250)

    ctx.font = '19px PingFangSC-Medium';
    ctx.fillStyle = '#333333';
    ctx.fillText(this.data.groupMsg.name, 100, 70);

    ctx.font = '16px PingFangSC-Regular;';
    ctx.fillStyle = '#7F7F7F';
    ctx.fillText('扫一扫二维码，加入群聊', 100, 100);
    ctx.draw()

    utils.hideLoading()
  },
  onShareAppMessage: function (params) {
    // 用户点击右上角分享
    return {
      title: '永久入群神器，广告拦截卫士', // 转发标题
      path: '/pages/index/index', // 分享路径
      imageUrl: '/images/pic/mini_program_cover.png'//分享图片
    }
  },

})


