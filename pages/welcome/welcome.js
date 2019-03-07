// pages/welcome/welcome.js
import { welcome_msg_list, set_welcome_msg } from '../../utils/config'
const app = getApp()
const utils = require('../../utils/util')

Page({
  data: {
    popErrorMsg: false,
    dataList: null,
    params: {
      // switch: '',
      // msg: '',
    },
    changeId: null,
    changeValue: null,
    changeStatus: true,
    switchStatus: true,//0 关闭 1 开启
    editStatus: false
  },

  onLoad: function () {
    //获取列表信息数据
    welcome_msg_list().then(res => {
      if (res.code === 1200) {
        this.setData({
          dataList: res.data
        })
      } else {
        utils.pageGo('/pages/errorPage/errorPage', 2)
      }
    })

  },
  changeSwitch: function (e) {
    let self = this
    let item = e.currentTarget.dataset.item
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
      set_welcome_msg(self.data.changeId, self.data.parmas)
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
    set_welcome_msg(id, parmas).then(res => {
      self.setData({
        changeStatus: true
      })
      if (res.code === 1200) {
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
    let { changeId, changeValue, dataList } = self.data
    self.setData({
      dataList: dataList.map(item => {
        return (item.id == changeId ? { ...item, msg: changeValue } : { ...item })
      })
    }, () => {
      self.setData({
        editStatus: false,
        changeId: null,
        changeValue: null,
      })
    })
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

