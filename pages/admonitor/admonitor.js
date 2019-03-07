// pages/admonitor/admonitor.js

// pages/welcome/welcome.js
import { ad_monitor_list, set_ad_monitor } from '../../utils/config'
const app = getApp()
const utils = require('../../utils/util')

Page({
  data: {
    modal: false,
    dataList: null,
    params: {
      // switch: '',
      // msg: '',
    },
    changeId: null,
    changeValue:null,
    changeStatus: true,
    switchStatus: true,//0 关闭 1 开启
    editStatus: false
  },
  onShow: function (params) {
    console.log('ad_monitor_list onShow')
  },
  onLoad: function () {
    console.log('ad_monitor_list onLoad')
    //获取列表信息数据
    ad_monitor_list().then(res => {
      if (res.code === 1200) {
        this.setData({
          dataList: res.data.groups_ad,
          modal: res.data.is_new_user
        })
      } else {
        utils.pageGo('/pages/errorPage/errorPage', 2)
      }
    })
  },
  changeSwitch: function (e) {
    let item = e.currentTarget.dataset.item
    let self = this
    const { dataList, switchStatus } = self.data
    self.setData({ changeId: item.id })
    if (!switchStatus) return
    // "switch": //0关闭1开启
    self.setData({
      switchStatus: false,
      parmas: { switch: item.switch === 0 ? 1 : 0, msg: item.msg }
    })
    self.setData({
      dataList: dataList.map(v => {
        return v.id === item.id ? {
          ...v,
          switch: item.switch === 0 ? 1 : 0
        } : { ...v }
      }),
      switchStatus: true
    }, () => {
        set_ad_monitor(self.data.changeId, self.data.parmas)
    })
  },
  changeTextarea: function (e) {
    var self = this;
    let value = e.detail.value;
    let id = e.currentTarget.dataset.item.id
    self.setData({
      dataList: self.data.dataList.map(item => {
        return (item.id === id ? { ...item, msg: value } : { ...item })
      })
    })
  },
  //保存
  handleSaveWelcom: function (e) {
    let self = this;
    const { changeId, changeStatus, dataList, params } = self.data
    if (!changeStatus) return
    this.setData({ changeStatus: false })
    dataList.forEach(item => {
      if (item.id === changeId) {
        params.switch = item.switch
        params.msg = item.msg
        self.setData({
          params
        }, () => {
          self.saveWelcomeMsg(changeId, params)
        })
      }
      return
    })
  },
  saveWelcomeMsg: function (id, parmas) {
    let self = this
    //本地
    set_ad_monitor(id, parmas).then(res => {
      self.setData({
        changeStatus: true
      })
      if (res.code == 1200) {
        self.setData({
          editStatus: false,
          changeId: null,
          changeValue: null,
        })
        utils.successShowText('保存成功')
      }
    })
  },

  //编辑
  handleEdit: function (e) {
    let item = e.currentTarget.dataset.item
    this.setData({
      editStatus: true,
      changeId: item.id,
      changeValue: item.msg
    })
  },
  //取消编辑
  handleCancelEdit: function (params) {
    let self = this
    let { changeId, changeValue, dataList} = self.data    
    self.setData({
      dataList: dataList.map(item => {
        return (item.id == changeId ? { ...item, msg: changeValue } : { ...item })
      })
    },()=>{
        self.setData({
          editStatus: false,
          changeId: null,
          changeValue: null,
        })
    }) 
  },
  showModal: function (params) {
    this.setData({ modal: true })
  },
  hideModal: function (params) {
    this.setData({ modal: false })
  },
  onShareAppMessage: function (params) {
    // 用户点击右上角分享
    return {
      title: '永久入群神器，广告拦截卫士', // 转发标题
      path: '/pages/index/index', // 分享路径
      imageUrl: '/images/pic/mini_program_cover.png'//分享图片
    }
  }

})

