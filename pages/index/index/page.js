console.group();
if (location.search.split("&").filter(v => /code=/.test(v))[0]) {
  const code = location.search.split("&").filter(v => /code=/.test(v))[0].split("=")[1];
  const url = `http://api.wx.iciyun.com/health-wechat/wx/manage/openId?code=${code}&response_type=code&scope=snsapi_userinfo&state=2`;
  console.log(url);
  location.href = url;
}
console.groupEnd();
require("cp");
require("src");
const config = require("configModule");
// console.log(config)
$(() => {
  /* global IS_PRODUCTION:true */ // 由于ESLint会检测没有定义的变量，因此需要这一个`global`注释声明IS_PRODUCTION是一个全局变量(当然在本例中并不是)来规避warning
  if (!IS_PRODUCTION) {
    console.log("如果你看到这个Log，那么这个版本实际上是开发用的版本");
    console.log(config.API_ROOT);
  }
});

