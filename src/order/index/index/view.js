import React from "react";

// import styles from "./style.less";
import Tab from "srcDir/common/tab/";
import history from "srcDir/common/router/history";

// 创建react组件
const View = (props) => {
  console.info("order/tab");
  console.info(props);
  const TabConf = {
    defaultKey: history.location.state && history.location.state.defaultKey, // 初始化展示tab
    tabs: [{
      title: "全部订单",
      key: "1",
      path: "order/list/all",
    }, {
      title: "待付款",
      key: "2",
      path: "order/list/2pay",
    }, {
      title: "待体检",
      key: "3",
      path: "order/list/2examine",
    }, {
      title: "退款",
      key: "4",
      path: "order/list/refund",
    }]
  };

  return (
    <div>
      <Tab conf={TabConf} modal={props.modal} router={props.router} />
    </div>
  );
};

export { View as default };
