import rest from "rest";
import store from "store2";
// import Cookies from "js-cookie";
// 获取token
let Authorization = store.get("Authorization");
// alert(Authorization);
if (!Authorization) {
  const search = window.location.search;
  if (search && /Authorization=/.test(search)) {
    Authorization = search.split("&").filter(x => /Authorization=/.test(x))[0].split("=")[1];
  }
}
store.set("Authorization", Authorization);
// openId
// import store from "store2";
// const openId = store.get("openId");
// header添加token
import defaultRequest from "rest/interceptor/defaultRequest";
// 添加上传文件
// import mime from "rest/interceptor/mime";

// 添加统一的host
const configURL = require("srcRootDir/webpack-config/base/url.config.js");
import restpathPrefix from "rest/interceptor/pathPrefix";
// 让rest可以传参
import template from "rest/interceptor/params";
const ajax = rest
  .wrap(defaultRequest, { headers: { Authorization, } })
  // .wrap(mime, { mime: "text/plain" })
  .wrap(restpathPrefix, { prefix: configURL.remoteServer.url })
  .wrap(template, {
    // params: { openId: "o2yml0gNxBtvZZIeHMs65qeSN1BA" }
    // params: { openId, }
  });

export { ajax as default };
