/*
 * Created Date: Thursday June 21st 2018 5:21:28 pm
 * Author: gumingxing
 * -----
 * Last Modified:Thursday June 21st 2018 5:21:28 pm
 * Modified By: gumingxing
 * -----
 * Copyright (c) 2018 MagCloud
 */

import React from "react";
import styles from "./style.less";
import history from "srcDir/common/router/history";
// 创建react组件
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
    // e.preventDefault();
    // const values = $(this.props.id).val();
    // console.log(values, 6666);
    // this.props.onClickFun(e);
    if (e === 1) {
      history.push("/homepage");
    } else if (e === 2) {
      history.push("/release/");
    } else if (e === 3) {
      history.push("/myCenter");
    }
  }
  render() {
    return (
      <div className={styles.nav}>
        <div onClick={() => this.onclick(1)}>首页</div>
        <div onClick={() => this.onclick(2)}>发布</div>
        <div onClick={() => this.onclick(3)}>我的</div>
      </div>
    );
  }
}
export { View as default };
