// pages/component/componentA/componentA.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },
  externalClasses: ['my-class'],
  /**
   * 组件的初始数据  
   */
  data: {
    // 私有数据，可用于模版渲染

  },

  /**
   * 组件的方法列表
   */
  methods: {
    //onMyEvent就是当被子组件触发时的函数 
    onMyEvent(e){
      console.log(e,'父传子 e')
      //e.detail // 自定义组件触发事件时提供的detail对象
      this.setData({
        paramBtoA: e.detail.paramBtoA
      })

    }
  },
  /**
   * 组件的主要生命周期
   */
  lifetimes: {
    created() {
      //在组件实例刚刚被创建时执行，注意此时不能调用 setData
      console.log('created')
    },
    attached() {
      // 在组件实例进入页面节点树时执行，绝大多数初始化工作可以在这个时机进行。
      console.log('attached')
      setTimeout(() => {
        console.log(this.properties.fatherData, 'fatherData-props')
      }, 500)

    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
      console.log('detached')
    },
  },
})
