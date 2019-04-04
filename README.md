# 微信登录获取code地址  openId="ot3OQxMVcEhd8amllYBrYd1gQMZE"
https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxec2edeca4121b2a7&redirect_uri=http%3a%2f%2fs181285g35.51mypc.cn&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect


http://192.168.0.54:5181/health-wechat/wx/manage/openId?code=001zBqyb04WV1x17Qqvb0JZoyb0zBqyE&response_type=code&scope=snsapi_userinfo&state=2

线上

https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxec2edeca4121b2a7&redirect_uri=http%3a%2f%2fwx.iciyun.com&response_type=code&scope=snsapi_userinfo&state=2#wechat_redirect

# 目录结构与命名
  一. 首页 homepage
  二. 扫码查伪 scanCode
  三. 查健康证 verify
  四. 个人预约 personalBooking
  五. 团体预约 groupReservation
  六. 附近体检点 organization
  七. 电子健康证 certification
  八. 个人中心 myCenter
  九. 登录 login
  十. 订单 order
  十一.员工注册 registration
  十二.员工管理 management
  十三.企业注册 registered
十一. 公用组件 common
    ->
        1.数据请求 ajax
        2.菜单 menu
        3.对话框 modalIFrame
        4.数据模型 model
        5.地图 navigatorGeolecation
        6 路由 router
        7.加载中 spin
        8.标签页 tab
        9.业务需求组件 view、viewform
       10.微信支付 weichat