var url = {
  webpackDevServer: {
    ip: "http://192.168.99.100",
    port: "8777",
    localUrl: "http://192.168.99.100:8777",
    url: "http://192.168.99.100:8777",
  },
  mockServer: {
    ip: "http://192.168.99.100",
    port: "3000",
    url: "http://192.168.99.100:3000",
  },
  // 远程api服务器地址，若不写则连至本地开发mockServer
  remoteServer: {
    // url: "http://192.168.6.201:9000", // 测试接口 2018年2月5日 测试要求改为测试地址
    url: "http://47.93.40.147:8080/", // 测试接口 2018年2月5日 测试要求改为测试地址
    // url: "http://39.107.73.192:5181/health-wechat" // 阿里云接口
    // url: "http://192.168.3.93:8080"
    // url: "http://api.wx.iciyun.com/health-wechat"
    // url: "http://192.168.1.19:5181/health-wechat"
    // url: "http://192.168.1.105/wx"
    // url: "http://192.168.0.102:8888/garageWechat/wx"
    // url: "http://192.168.0.54:5181/health-wechat"
    // url: "http://192.168.1.19:5181/health-wechat"
    // url: "http://192.168.1.88:8080/wx"
  }
};

module.exports = url;
