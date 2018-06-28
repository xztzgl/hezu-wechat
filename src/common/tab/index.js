import React from "react";
import styles from "./style.less";
import { Tabs } from "antd-mobile";
const TabPane = Tabs.TabPane;
// const onTabClick = (key) => {
//   console.log("onTabClick");
//   console.log(key);
// };
const Tab = (props) => {
  console.log("tab");
  console.log(props);
  const { conf } = props;
  return (
    <Tabs
      className={styles.tabTitle}
      defaultActiveKey={conf.defaultKey}
      animated={false}
      // onTabClick={onTabClick}
    >
      {
        conf.tabs && conf.tabs.map(
          (v) => {
            let ContentPage;
            if (v.path !== "") {
              ContentPage = require(`srcDir/${v.path}/route`).default;
            }
            return (
              <TabPane tab={v.title} key={v.key} style={{ overflow: "hidden" }}>
                {
                  ContentPage && <ContentPage typeId={v.key} tabConf={conf} modal={props.modal} router={props.router} />
                }
              </TabPane>
            );
          }
        )
      }
    </Tabs>
  );
};


export { Tab as default };
