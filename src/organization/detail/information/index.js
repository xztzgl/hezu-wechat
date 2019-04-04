import React from "react";

import { List, Flex } from "antd-mobile";
import history from "srcDir/common/router/history";
import store from "store2";
// import fetch from "srcDir/common/ajax/index";
import styles from "./style.less";

const user = store.get("garage-wechat-user");

const defaultImg = require("srcDir/images/local_pic.png");
const myAddress = require("srcDir/images/address@3x.png");
const myTime = require("srcDir/images/time@3x.png");
const myPhone = require("srcDir/images/phone@3x.png");

const weeks = {
  1: "日",
  2: "一",
  3: "二",
  4: "三",
  5: "四",
  6: "五",
  7: "六",
};
const miniWeeks = (arr) => {
  let str = "";
  if (arr.length === 7) {
    str = "周一至周日";
  } else {
    str = "周" + arr.map(v => `${weeks[v]}`).join("、");
  }
  return str;
};

// 创建react组件
const View = (props) => {
  // console.info("+++++++++++++++++++");
  console.info(props);
  console.info(user);
  const organizationDetail = store.get("organizationDetail");
  const { data } = props;
  if (data && data.name) {
    store.set("chosenOrganizationName", data.name);
  }

  const getViewportSize = () => ({
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  });
  const { width, height } = getViewportSize();
  const mapIframe = window.$("#js-map");
  mapIframe.css({
    width: `${width}px`,
    height: `${height}px`,
    border: "0",
  })
    .attr("src", "/index/map/page.html");

  const show = () => {
    if (data && data.name) {
      history.push("/gis");
      mapIframe.show(500);
      const arr = [];
      const back = "this.parent.$('#js-map').hide()";
      arr.push({
        position: organizationDetail.position,
        title: data.name,
        content: [
          `<img src=${data.headImage}>地址：${data.address}`,
          // "电话：010-64733333",
          `<a href="javascript:${back}">返回</a>`
        ]
      });
      console.log(arr);
      window.iframeMap.makeMarker(arr);
    }
  };

  return (
    <div>
      {
        data && <List className={styles.detail}>
          <List.Item
            className={styles.info}
            arrow="horizontal"
            thumb={data.headImage || defaultImg}
            multipleLine
            // onClick={() => changeMobile()}
          >
            <h4>{data.name}</h4>
            <Flex>
              {
                data.number ? <Flex.Item>今日剩余{data.number}</Flex.Item> : <Flex.Item className={styles.red}>今日约满</Flex.Item>
              }
              <Flex.Item>{organizationDetail.area} {window.Math.ceil(organizationDetail.distance)}km</Flex.Item>
            </Flex>
          </List.Item>
          <List.Item
            className={styles.item}
            arrow="horizontal"
            thumb={myAddress}
            multipleLine
            platform="android"
            onClick={() => show()}
          >
            地址：{data.address}
          </List.Item>
          <List.Item
            className={styles.item}
            arrow="horizontal"
            thumb={myPhone}
            multipleLine
            platform="android"
            // onClick={() => ()}
          >
            <a href={`tel:${data.phone}`}>电话：{data.phone}</a>
          </List.Item>
          <List.Item
            className={`${styles.item} ${styles.time}`}
            arrow="horizontal"
            thumb={myTime}
            multipleLine
            platform="android"
            // onClick={() => about()}
          >
            时间：{
              miniWeeks(data.weeks)
            }
            <div>　　　{data.time}</div>
          </List.Item>
        </List>
      }
    </div>
  );
};

export { View as default };
