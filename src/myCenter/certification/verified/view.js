import React from "react";
// import { render } from "react-dom";

import styles from "./style.less";
// import fetchUpload from "srcDir/common/ajax/upload";
// import fetch from "srcDir/common/ajax/indexWithBody";
// import { Toast } from "antd-mobile";
// import fetch from "srcDir/common/ajax/index";
// // import openMap from "srcDir/common/weichat/openMap";
// // import Cookies from "js-cookie";
// import navigatorGeolocation from "./navigatorGeolocation";
import history from "srcDir/common/router/history";
// import TakePictures from "srcDir/common/viewform/takePictures/view";
// import Conment from "srcDir/common/viewform/searchFail/view";


// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      takePictures: false,
      front: "",
      back: "",
      backopen: false,
      frontOpen: false,
      certificationOk: false,
    };
    this.conversionDate = this.conversionDate.bind(this);
    // console.log(props, 2222);
  }
  conversionDate(e) {
    // console.log(e);
    const dataArry = e.split(" ")[0];
    const dateArry = dataArry.split("-");
    const dateString = "至" + dateArry[0] + "年" + dateArry[1] + "月" + dateArry[2] + "日";
    return dateString;
  }
  push() {
    history.push("/myCenter/certification");
  }
  render() {
    // const true1 = true;
    // const _this = this;
    // console.log(this.props, 3333);
    // const dataobj = this.props.results && this.props.results.obj;
    return (
      <div style={{ paddingBottom: "20px" }}>
        <div className={styles.success}>
          <div></div>
          已认证
        </div>
        <div className={styles.photo}>
          <div>证件照片</div>
          <div>
            <div className={styles.img}>
              <div>
                <img src={this.props.results && this.props.results.obj.front} alt="" />
                照片面
              </div>
              <div>
                <img src={this.props.results && this.props.results.obj.back} alt="" />
                国徽面
              </div>
            </div>
          </div>
        </div>
        <div className={styles.information}>
          <div>认证姓名</div>
          <div>{this.props.results && this.props.results.obj.name}</div>
        </div>
        <div className={styles.information}>
          <div>证件号码</div>
          <div>{this.props.results && this.props.results.obj.cardid}</div>
        </div>
        <div className={styles.information}>
          <div>证件有效期</div>
          <div>
            {
              (this.props.results && this.props.results.obj.validDateEnd) ? this.conversionDate(this.props.results.obj.validDateEnd) : ""
            }
          </div>
        </div>
        <div className={styles.update} onTouchEnd={() => { this.push(); }}>更新</div>
        <div className={styles.prompt}>信息仅用于身份验证，员工体检服务保证您的信息安全</div>
      </div>
    );
  }
}

export { View as default };
