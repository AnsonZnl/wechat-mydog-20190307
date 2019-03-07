
// const API_PATH = 'https://gdogprd.lizmom.cn';//生产环境
const API_PATH = 'https://gdogdev.lizmom.cn';//开发环境

const api={
    SECRET: "dd1c1f6aa6d4f0f76b18d56b577ca44a", //base64加密liz-shop-owner:secret
    APP_ID: 'wxf6153567687b6c60', //APPID 抢福利
    auth: API_PATH+'/auth',         //获取token
    status: API_PATH+'/user/status',//用户当前状态
    getUnionid: API_PATH+'/wechat/app/user_info',//公众号授权 unionId opendId等 `${API_PATH}/wechat/user_info?app_id=${appid}&code=${code}`
    group: API_PATH + '/group/',//欢迎语设置'/group/:group_id/welcome_msg';广告监测设置 /group/:group_id/ad_monitor
    welcomeMsgList: API_PATH+'/groups/welcome_msg',
    adMonitorList: API_PATH+'/groups/ad_monitor',//广告监测列表页
    feedback: API_PATH+'/feedback'//建议反馈查询页  
}
module.exports=api;