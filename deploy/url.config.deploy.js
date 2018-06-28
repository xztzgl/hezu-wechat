var url = {
  webpackDevServer: {
    ip: "http://192.168.1.96",
    port: "8777",
    localUrl: "http://localhost:8777",
    url: "http://192.168.1.96:8777",
  },
  mockServer: {
    ip: "http://localhost",
    port: "3000",
    url: "http://localhost:3000",
  },
  // 远程api服务器地址，若不写则连至本地开发mockServer
  remoteServer: {
    url: "http://api.wx.kaxiuzhijia.com/garage/wx"
  }
};

module.exports = url;
