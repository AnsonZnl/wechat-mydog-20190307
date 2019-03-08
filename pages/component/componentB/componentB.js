// pages/component/componentB/componentB.js
Component({

  properties: {
    paramAtoB: String,
    paramBtoA:String
  },
  data: {

  }, // 私有数据，可用于模版渲染

  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { },
  moved: function () { },
  detached: function () { },

  methods: {
    //触发父组件的方法
    change(){
      //自定义组件触发事件时，需要使用 triggerEvent 方法，指定事件名、detail对象和事件选项：
      //https://developers.weixin.qq.com/miniprogram/dev/framework/custom-component/events.html
      // const myEventDetail = {} // detail对象，提供给事件监听函数
      // const myEventOption = {} // 触发事件的选项
      // this.triggerEvent('myevent', myEventDetail, myEventOption)

      this.triggerEvent('myevent', { paramBtoA: '123'})
    }
  }
  
})