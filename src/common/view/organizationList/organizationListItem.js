import React from "react";

import { Flex } from "antd-mobile";
import store from "store2";

// import history from "srcDir/common/router/history";

import styles from "./style.less";

// const onClick = (id) => {
//   history.push(`/organization/detail/${id}`, { id: id });
// };
const defaultImg = require("srcDir/images/local_pic.png");

// 创建react组件
const View = (props) => {
  const { data } = props;
  const { addRoute } = props.router;
  const onClick = ({ id, position, distance, area }) => {
    store.set("organizationDetail", {
      position,
      distance,
      area,
    });
    addRoute({ keyName: "体检点详情", path: "/organization/detail", name: "体检点详情", title: "/organization/detail", component: "organization/detail/index", paramId: id });
  };
  return (
    <Flex
      className={props.className}
      onClick={() => onClick({
        id: data.id,
        position: [data.longitude, data.latitude],
        distance: data.distance,
        area: data.area
      })}
    >
      <Flex.Item>
        <img src={data.headImage || defaultImg} alt="体检点图片" />
      </Flex.Item>
      <Flex.Item>
        <h4>{data.name}</h4>
        <address>{data.address}</address>
        <Flex>
          {
            data.number ? <Flex.Item>今日剩余{data.number}</Flex.Item> : <Flex.Item className={styles.red}>今日约满</Flex.Item>
          }
          <Flex.Item>{data.area} {window.Math.ceil(data.distance)}km</Flex.Item>
        </Flex>
      </Flex.Item>
    </Flex>
  );
};

export { View as default };
