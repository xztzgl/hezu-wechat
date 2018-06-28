import React from "react";
import styles from "./style.less";
// import { unmountComponentAtNode } from "react-dom";

import fetch from "srcDir/common/model/itemModel/fetch";
import { Tabs } from "antd-mobile";
const TabPane = Tabs.TabPane;

class Tab extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   userSearchData: null,
    //   userData: null,
    //   truckSearchData: null,
    //   truckData: null
    // };
    this.onTabClick = this.onTabClick.bind(this);
    // console.log(props);
  }
  componentDidMount() {
    const { conf } = this.props;
    this.onTabClick(conf.tabs[0].key);
  }
  onTabClick(key) {
    // unmountComponentAtNode(document.getElementById("listWrapper"));
    // console.log("onTabClick");
    // console.log(key);
    const fetchData = this.props.fetch;
    // console.log(fetchData.params);
    const params = {};
    params[fetchData.params] = key;
    params._index = 1;
    fetch({
      url: fetchData.url,
      method: fetchData.method,
      params,
      success(res) {
        const data = JSON.parse(res.entity);
        if (typeof fetchData.success === "function") {
          fetchData.success(data, key);
        }
      }
    });
  }
  render() {
    // console.log("tab");
    // console.log(props);
    const { props } = this;
    const { conf } = props;
    return (
      <div>
        <Tabs
          className={styles.tabTitle}
          defaultActiveKey={conf.defaultKey}
          animated={false}
          pageSize={2}
          onTabClick={(key) => this.onTabClick(key)}
        >
          {
            conf.tabs && conf.tabs.map(
              (v) => (
                <TabPane tab={v.title} key={v.key} typeId={v.id} />
              )
            )
          }
        </Tabs>
        <div id="tabContent" />
      </div>
    );
  }
}


export { Tab as default };
