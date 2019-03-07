//index.js
import { user_status} from "../../utils/config";
const utils = require('../../utils/util')
const app = getApp()

Page({
  data: {
    hasUserInfo: null,
    homeTab:[
      { imgSrc: '/images/icon/home_ic_ad.png', text: '广告监测', goLink: '/pages/admonitor/admonitor', event: 'home_ad' },
      { imgSrc: '/images/icon/home_ic_hi.png', text: '欢迎语', goLink: '/pages/welcome/welcome', event: 'home_welcome' },
      { imgSrc: '/images/icon/home_ic_feedback.png', text: '建议反馈', goLink: '/pages/feedback/feedback', event: 'home_feedback' },
      { imgSrc: '/images/icon/home_ic_more.png', text: '即将开放', goLink: null,event:'home_more' }
    ],
    receiveStatus: null,// 0表示未领取机器人，1表示已领取
    receiveDog:{},
  },
  onLoad:function (params) {
    console.log('onLoad')
  },
  onShow: function (options) {
    console.log('onshow function log')
    let self =this;
    let unionId = wx.getStorageSync('union_id')
    let userInfo = wx.getStorageSync('user_info');
    if (unionId && userInfo){
      console.log('user_status')
      //判断用户当前状态
      user_status(unionId).then(res => {
        if (res.code == 1200) {
          self.setData({
            receiveDog: res.data,
            receiveStatus: res.data.status,
            hasUserInfo:true
          })
          console.log(self.data.receiveDog)
        }

      })
    }else{
      self.setData({
        hasUserInfo: false
      })
    }
  },
  pageGoQrcode:function () {

    let group_code = this.data.receiveDog.group_code
    console.log(group_code, 'group_code=====')
    utils.pageGo('/pages/qrcode/index?group_code=' + group_code, 1)
    // let unionId = wx.getStorageSync('union_id')
    // if (unionId) {
    //   user_status(unionId).then(res => {
    //     let group_code = res.data.group_code
    //     utils.pageGo('/pages/qrcode/index?group_code=' + group_code, 1)
    //   })
    // }
  },
  pageGoDes:function (params) {
    utils.pageGo('/pages/receiveDes/receiveDes',1)
  },
  handlepageGo:function (e) {
    let tabLink = e.currentTarget.dataset.tab
    let event = e.currentTarget.dataset.event
    let receiveStatus = this.data.receiveStatus ;//0 未领取
    if (tabLink != null){
      if (event == 'home_ad' || event== 'home_welcome'){
        utils.pageGo(receiveStatus == 0 ? '/pages/receiveDes/receiveDes' : tabLink, 1)
      }else{
        utils.pageGo(tabLink, 1)
      }
    }
  },
  //小程序授权 获取用户信息
  getUserInfo: function(e) {
    var self = this;
    app.getUserInfoAll(e, res => {
      self.setData({
        hasUserInfo: res.hasUserInfo,
        userInfo: res.userInfo
      })
      setTimeout(() => {
        let unionId = wx.getStorageSync('union_id');
        user_status(unionId).then(res => {
          if (res.code == 1200) {
            self.setData({
              receiveDog: res.data,
              receiveStatus: res.data.status
            })
          }
        })
      }, 2000);
    })
  },
  onShareAppMessage:function () {
    // 用户点击右上角分享
    return {
      title: '永久入群神器，广告拦截卫士', // 转发标题
      path: '/pages/index/index', // 分享路径
      imageUrl: '/images/pic/mini_program_cover.png'//分享图片
    }
  }
})


