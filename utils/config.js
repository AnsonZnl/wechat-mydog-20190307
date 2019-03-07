const API = require('./api');
import { fetch } from './wxRequest';//接口请求
import { getAccessToken } from './AuthProvider';//获取 token 
//接口调用
// wxRequest(url, token, data, type) 
/**
 * 获取token
 * @param params
 */
const get_token = (params)=>{
  return fetch(API.auth, null, params,'POST')
}
/**
 * 获取unionid 非鉴权
 * @param params
 */
const get_unionId = (params) => {
  return fetch(API.getUnionid, null, params, 'POST');
}
/**          
 * 获取用户当前状态
 */
const user_status = (union_id) => {
  // return getAccessToken().then(token => {
  //   console.log('getAccessToken',token);
  //   return fetch(API.status, { value: token }, null, 'GET');
    let user_status_api = API.status + '?union_id=' + union_id
  return fetch(user_status_api, null, null, 'GET');
  // })
}

/**
 * 欢迎语列表
 */
const welcome_msg_list = () => {
  return getAccessToken().then(token => {
    return fetch(API.welcomeMsgList ,{ value: token }, null, 'GET');
  })
};

/**
 * 欢迎语设置
 */
const set_welcome_msg = (group_id,params) => {
  //params 传参
  return getAccessToken().then(token => {
    return fetch(API.group + group_id + '/welcome_msg', { value: token }, params, 'PUT');
  })
};
/**
 * 广告监测列表
 */
const ad_monitor_list = () => {
  return getAccessToken().then(token => {
    return fetch(API.adMonitorList, { value: token }, null, 'GET');
  })
};
/**
 * 广告监测设置
 */
const set_ad_monitor = (group_id, params) => {
  return getAccessToken().then(token => {
    return fetch(API.group + group_id + '/ad_monitor', { value: token }, params, 'PUT');
  })
};
/**
 * 建议反馈查询页
 */
const feed_back = () => {
  return getAccessToken().then(token => {
    return fetch(API.feedback , { value: token }, null, 'GET');
  })
};
/**
 * 永久二维码展示页
 */
const get_group_qrcode = (group_code) => {
  return getAccessToken().then(token => {
    return fetch(API.group + group_code + '/qrcode', { value: token }, null, 'GET');
  })
};

module.exports={
  get_token:get_token,
  get_unionId: get_unionId,
  user_status: user_status,
  welcome_msg_list: welcome_msg_list,
  set_welcome_msg: set_welcome_msg,
  ad_monitor_list: ad_monitor_list,
  set_ad_monitor: set_ad_monitor,
  feed_back: feed_back,
  get_group_qrcode: get_group_qrcode
}