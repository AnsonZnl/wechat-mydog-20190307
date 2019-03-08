//app.js
import { get_unionId} from './utils/config'
import { onLogin} from './utils/AuthProvider'

const dd = require('./utils/js/md-app')
const API = require('./utils/api')
App({
  onLaunch: function () {
    // 微信预登陆
    // wx.login({
    //   success: function (e) {
    //     // console.log("登录成功");
    //   }
    // })
  },
  globalData: {
    userInfo: null,
    G_SDK:dd
  },
  // 全局获取用户信息
  getUserInfoAll:function (res,callback) {
    let _this = this;
    // console.log(res,'---获取用户信息---');
    if (res.detail.errMsg == 'getUserInfo:fail auth deny') {
      wx.showModal({
        title: '用户授权',
        content: '本小程序需用户授权，请重新点击按钮授权。',
        mask: true,
        confirmColor: '#2ABE76',
        success: function (res) {
        }
      })
    } else if (res.detail.errMsg == 'getUserInfo:ok') {
      let userInfo = res.detail.userInfo;
      _this.globalData.userInfo = userInfo;
      wx.setStorageSync('user_info', userInfo); //存储用户信息
      _this.wxLogin(res.detail.encryptedData, res.detail.iv);
      callback({
        userInfo: userInfo,
        hasUserInfo: true,
      });
    }
  },
  //微信授权登录，拿token
  wxLogin: function (encryptedData, iv) {
    wx.login({
      success: function(res){
        console.log(res,'wx_login_success')
        if(res.code){
          let params={
            app_id: API.APP_ID,
            code: res.code,
            encrypted_data: encryptedData,
            iv: iv,
            type:19
          };
          
          get_unionId(params).then(res=>{
            "use strict";
            if(res.code===1200){  
              //存储unionid等
              let openId = res.data.openId;
              let unionId=res.data.unionid;
              wx.setStorageSync('open_id', openId)
              wx.setStorageSync('union_id', unionId)
              onLogin()
            }else{
              console.log("鉴权接口报错")
            }
          })
        }
      },
      fail: function(req) {
        console.log(req,'fail') 
      
      }
    })
  },

})