wechat-mydog-20190307

小程序案例
开发中应用到的：
- 应用promise封装wx.request请求接口（weRequest.js）
- 生成二维码插件：weapp.qrcode.js 
- canvas画图及下载
- 暗藏获取用户信息按钮
```
<button wx:if='{{!hasUserInfo}}' class='hidden-button' open-type='getUserInfo' bindgetuserinfo="getUserInfo"></button>
```
- textarea,input,canvas等原生组件层级最高，z-index无效，可通过hidden解决
- onShow：页面每次进入都会请求一次
- onLoad:页面加载时请求，只请求一次

学习到的：
- 
