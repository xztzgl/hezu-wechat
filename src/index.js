import React from "react";
import ReactDOM from "react-dom";
import history from "srcDir/common/router/history";
import store from "store2";

import Most from "react-most";
// import html2canvas from "srcDir/common/tool/html2canvas.min";

import IndexPage from "srcDir/index/index-121/view";

// import fetch from "srcDir/common/model/itemModel/fetch";

// import store from "store2";

// const origin = window.location.origin;
// if (!store.session.get("logined")) {
//   // console.log("跳转到登录页面");
//   window.location.href = origin + "/login/login/page.html";
//   // 渲染到页面
//   module.exports = false;
// } else {
//  // 渲染到页面
//   module.exports = ReactDOM.render(
//     <Most>
//       <IndexPage />
//     </Most>, document.getElementById("root")
//  );
// }

// 防抖
import { attach } from "fastclick";
attach(document.body);
// 微信
import "srcDir/common/weichat/getOpenId";
import "srcDir/common/weichat/index";

// window.html2canvas = html2canvas;
const Authorization = store.get("Authorization");
// console.log(Authorization);
if (Authorization && Authorization !== "undefined") {
  require("srcDir/common/weichat/getUserInfo");
}
// 路由跳转
const page = store.session.get("page");
const itemId = store.session.get("itemId");
if (page && page === "register") {
  history.replace("register");
} else {
  history.push("/homepage/");
}
$(".js-loading").show();
if (page && page !== "undefined") {
  let url = "";
  if (itemId === "undefined" || itemId === "") {
    url = `/${page}`;
  } else {
    url = `/${page}/${itemId}`;
  }
  setTimeout(() => {
    history.replace(url);
    // history.push("/personalBooking/fail");
    $(".js-loading").hide();
  }, 500);
}


module.exports = ReactDOM.render(
  <Most>
    <IndexPage />
  </Most>, document.getElementById("root")
);
