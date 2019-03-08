// pages/component/customizeToast/customizeToast.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    des:String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    cancleSet(){
      //引用父组件的方法
      this.triggerEvent('cancleSet')
    }

  }
})
