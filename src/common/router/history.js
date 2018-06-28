import { createBrowserHistory } from "history";
import store from "store2";

const history = createBrowserHistory({
  hashType: "noslash"
});

/**
 * 路由白名单-不在名单中的路由在没有token（即未登录）时，跳转至登录页
 */
const pathname = [
  "/",
  "/login",
  "/homepage/",
  "/release/",
  "/organization",
  "/organization/detail",
  "/verify",
  "/registered/",
  "/registeredsuccess",
  "/gis",
  "/searchResult",
  "/scanCode/detail",
  "/groupReservation",
];

const title = [
  { "/homepage": "入职体检服务系统" },
  { "/homepage/": "入职体检服务系统" },
  { "/registration/": "员工登记" },
  { "/release/": "发布" },
  { "/management/": "员工管理" },
  { "/management/staff": "添加员工" },
  { "/registered/": "企业注册" },
  { "/registeredsuccess/": "注册成功" },
  { "/login": "登录" },
  { "/verify": "查健康证" },
  { "/personalBooking/": "个人预约" },
  { "/groupReservation": "团体预约" },
  { "/organization": "附近体检点" },
  { "/organization/detail": "体检点详情" },
  { "/certification": "健康证明" },
  { "/myCenter": "个人中心" },
];

history.listen((location) => {
  console.log("当前路由：：：：：");
  console.log(location.pathname);
  window.$("#js-map").hide(500);
  // console.log(pathname);
  const Authorization = store.get("Authorization");
  let condition = false;
  if (pathname.filter(v => location.pathname === v).length === 0) {
    if (!Authorization) {
      condition = true;
    } else if (Authorization && Authorization === "undefined") {
      condition = true;
    }
  }

  console.log(condition);
  if (condition) {
    store.session.set("page", location.pathname.substr(1));
    store.set("Authorization", "");
    history.replace("/login");
  }
  const titleArr = title.filter(v => location.pathname === Object.keys(v)[0]);
  if (titleArr.length > 0) {
    window.document.title = titleArr[0][location.pathname];
  }
});

export default history;
