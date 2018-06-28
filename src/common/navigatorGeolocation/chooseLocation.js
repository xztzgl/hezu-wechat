import React from "react";

// import { Flex } from "antd-mobile";

// 创建react组件
const View = () => (
  <iframe
    id="js-map"
    name="iframeMap"
    title="chooseLocation"
    style={{
      display: "none",
      position: "fixed",
      top: "0",
      bottom: "0",
      left: "0",
      right: "0",
      zIndex: "1500",
    }}
    seamless
  />
);

export { View as default };
