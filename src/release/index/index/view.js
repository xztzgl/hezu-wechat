/*
 * Created Date: Thursday June 21st 2018 5:21:28 pm
 * Author: gumingxing
 * -----
 * Last Modified:Tuesday June 26th 2018 3:06:19 pm
 * Modified By: gumingxing
 * -----
 * Copyright (c) 2018 MagCloud
 */

import React from "react";
import styles from "./style.less";
import Nav from "srcDir/common/viewform/navigation/index";
// import { createForm } from "rc-form";
import history from "srcDir/common/router/history";

// import { Carousel, InputItem, Picker, List, DatePicker, TextareaItem, Toast } from "antd-mobile";

// import history from "srcDir/common/router/history";
// import store from "store2";
// import fetch from "srcDir/common/ajax/indexWithBody";
// import moment from "moment";
// const maxDate = moment("2016-12-03 +0800", "YYYY-MM-DD Z").utcOffset(8);
// const minDate = moment("2015-08-06 +0800", "YYYY-MM-DD Z").utcOffset(8);
// const codeMap = store.session.get("codeMap");
// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    // console.log(props, 2222);
  }
  componentDidMount() {
  }
  onclick(e) {
    if (e === 1) {
      history.push("/housing");
    } else if (e === 2) {
      history.push("/roommates");
    }
  }
  render() {
    return (
      <div className={styles.rele}>
        <div>
          <div onClick={() => this.onclick(1)}>发布房源</div>
          <div onClick={() => this.onclick(2)}>发布合租房源</div>
        </div>
        {/* <div></div> */}
        <Nav />
      </div>
    );
  }
}
export { View as default };
