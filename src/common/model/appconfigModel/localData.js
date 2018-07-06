// map: 循环匹配
// filter:过滤
// comp: 函数组合
// mapcat: 合并集合
import { map, filter, comp } from "transducers-js";
import * as most from "most";

const fetch = () => Promise.resolve({
  type: "dataUpdate",
  value: {
    AppBarTitle: " ",
    MenuList: {
      健康ID: [
        { title: "/homepage/", path: "/homepage/", component: "homepage/index/index", name: "首页" },
        { title: "/verify", path: "/verify", component: "verify/index/index", name: "查健康证" },
        { title: "/personalBooking/", path: "/personalBooking/", component: "personalBooking/index/index", name: "个人预约" },
        { title: "/management/", path: "/management/", component: "management/index/index", name: "员工管理" },
        { title: "/management/staff", path: "/management/staff", component: "management/staff/index", name: "添加员工" },
        { title: "/management/transferKong", path: "/management/transferKong", component: "management/transferKong/index", name: "调岗" },
        { title: "/registered/", path: "/registered/", component: "registered/index/index", name: "企业注册" },
        { title: "/registeredsuccess/", path: "/registeredsuccess/", component: "registeredsuccess/index/index", name: "注册成功" },
        { title: "/registration/", path: "/registration/", component: "registration/index/index", name: "员工登记" },
        { title: "/personalBooking/success", path: "/personalBooking/success", component: "personalBooking/result/success", name: "个人预约成功" },
        { title: "/personalBooking/fail", path: "/personalBooking/fail", component: "personalBooking/result/fail", name: "个人预约失败" },
        { title: "/groupReservation", path: "/groupReservation", component: "groupReservation/index/index", name: "团体预约" },
        { title: "/organization", path: "/organization", component: "organization/index/index", name: "附近体检点" },
        { title: "/certification", path: "/certification", component: "certification/index/index", name: "电子健康证" },
        { title: "/myCenter", path: "/myCenter", component: "myCenter/index/index", name: "个人中心" },
        { title: "/myCenter/personalSettings", path: "/myCenter/personalSettings", component: "myCenter/personalSettings/index", name: "个人设置" },
        { title: "/myCenter/electronicHealthCertificate", path: "/myCenter/electronicHealthCertificate", component: "myCenter/electronicHealthCertificate/index", name: "电子健康证" },
        { title: "/myCenter/certification", path: "/myCenter/certification", component: "myCenter/certification/index", name: "认证" },
        { title: "/myCenter/verified", path: "/myCenter/verified", component: "myCenter/certification/verified", name: "已认证" },
        { title: "/orderList/", path: "/orderList/", component: "order/index/index", name: "个人订单列表" },
        { title: "/orderList/list", path: "/orderList/list", component: "order/detail/list", name: "团体列表" },
        { title: "/order/report", path: "/order/report", component: "order/report/index", name: "订单报告" },
        { title: "/orderList/orderProgress", path: "/orderList/orderProgress", component: "order/detail/orderProgress", name: "团体列表" },
        { title: "/login", path: "/login", component: "login/login/index", name: "登录" },
        { title: "/release", path: "/release", component: "release/index/index", name: "我的发布" },
        { title: "/housing", path: "/housing", component: "housing/index/index", name: "发布房源" },
        { title: "/roommates", path: "/roommates", component: "roommates/index/index", name: "发布合租房源" },
        { title: "/housingDetails", path: "/housingDetails", component: "housingDetails/index/index", name: "房屋详情" },
        { title: "/myNews", path: "/myNews", component: "myNews/index/index", name: "我的消息" },
        { title: "/myCollection", path: "/myCollection", component: "myCollection/index/index", name: "我的收藏" },
        { title: "/evaluate", path: "/evaluate", component: "evaluate/index/index", name: "待评价" },
      ],

    },
    MenuIcon: ["appstore", "money", "institution", "database", "users"]

  }
});
const tableModel = () => {
  const generateStateFromResp = comp(
    filter(i => i.type === "dataUpdate"),
    map(data => data.value),
  // 把结果映射成state 到新的 state
    map(items => state => ({ results: items }))
  );

  const Data = function () {
    const data$ = most.fromPromise(fetch()).transduce(generateStateFromResp);

    return {
      data$,
    };
  };

  return Data;
};

export { tableModel as default };
