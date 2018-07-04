/*
 * Created Date: Thursday June 21st 2018 5:21:28 pm
 * Author: gumingxing
 * -----
 * Last Modified:Wednesday July 4th 2018 10:45:19 am
 * Modified By: gumingxing
 * -----
 * Copyright (c) 2018 MagCloud
 */

import React from "react";
import styles from "./style.less";
import { Modal } from "antd-mobile";
import history from "srcDir/common/router/history";
// 创建react组件
const alert = Modal.alert;
class View extends React.Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //   promptText: "",
  //   // };
  //   // this.onTabClick = this.onTabClick.bind(this);
  //   console.log(props, 2222);
  // }
  // componentDidMount() {
  //   // console.log(this.props.prompt, 888);
  // }
  onclick(e) {
    if (e === 1) {
      history.push("/homepage");
    } else if (e === 2) {
      // history.push("/release/");
      alert("请选择要发布房源类型", "", [
        // { text: "按钮一", onPress: () => console.log("第0个按钮被点击了") },
        { text: "找人合租", onPress: () => history.push("/roommates/") },
        { text: "发布房源", onPress: () => history.push("/housing/") },
      ]);
    } else if (e === 3) {
      history.push("/myCenter");
    }
  }
  render() {
    return (
      <div className={styles.nav}>
        <div onClick={() => this.onclick(1)}>
          <div className={this.props.checked === 1 && styles.checked}>
            <div className="anticon-home"></div>
            <div>首页</div>
          </div>
        </div>
        <div onClick={() => this.onclick(2)}>
          <div className={this.props.checked === 2 && styles.checked}>
            <div className="anticon-release"></div>
            <div>发布</div>
          </div>
        </div>
        <div onClick={() => this.onclick(3)}>
          <div className={this.props.checked === 3 && styles.checked}>
            <div className="anticon-my"></div>
            <div>我的</div>
          </div>
        </div>
      </div>
    );
  }
}
export { View as default };
