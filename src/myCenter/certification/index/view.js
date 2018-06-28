import React from "react";
// import { render } from "react-dom";

import styles from "./style.less";
import fetchUpload from "srcDir/common/ajax/upload";
// import fetch from "srcDir/common/ajax/indexWithBody";
import { Toast } from "antd-mobile";
// import fetch from "srcDir/common/ajax/index";
// // import openMap from "srcDir/common/weichat/openMap";
// // import Cookies from "js-cookie";
// import navigatorGeolocation from "./navigatorGeolocation";
// import history from "srcDir/common/router/history";
// import TakePictures from "srcDir/common/viewform/takePictures/view";
// import Conment from "srcDir/common/viewform/searchFail/view";
const disagree = require("srcDir/images/disagree@3x.png");
const agree = require("srcDir/images/agree@3x.png");
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
      checedimg: disagree,
      agreeUpload: false,
    };
    this.takePictures = this.takePictures.bind(this);
    // console.log(props, 2222);
  }
  componentDidMount() {
    // $("#agree").css("backgroundImage", "url()")
  }
  takePictures(v) {
    if (this.state.agreeUpload) {
      const _this = this;
      const file = window.document.createElement("input");
      file.id = "js-file";
      file.type = "file";
      file.accept = "image/*";
      file.capture = "camera";
      window.$(file).change(function () {
        const data = new FormData();
        data.append("file", file.files[0]);
        // console.log(data.values);
        fetchUpload({
          url: "/wx/user/selfVerifyUserInfo",
          method: "POST",
          entity: data,
          success(res) {
            // console.log(res);
            if (res.entity.success) {
              const dataobj = res.entity.obj;
              if (dataobj.side === "front") {
                if (v === 1) {
                  Toast.success("人像页上传成功");
                  _this.setState({
                    front: dataobj.url,
                    frontopen: true,
                  });
                  if (_this.state.backopen) {
                    _this.setState({
                      certificationOk: true,
                    });
                  }
                } else {
                  Toast.info("请拍摄人像页");
                }
              } else {
                if (v === 0) {
                  Toast.success("国徽页上传成功");
                  _this.setState({
                    back: dataobj.url,
                    backopen: true,
                  });
                  if (_this.state.frontopen) {
                    _this.setState({
                      certificationOk: true,
                    });
                  }
                } else {
                  Toast.info("请拍摄国徽页");
                }
              }
            } else {
              Toast.info(res.entity.msg);
            }
          }
        });
      });
      file.click();
    } else {
      Toast.info("请同意实名认证协议");
    }
  }
  agreeFuntion() {
    // console.log(12213);
    let whether = this.state.agreeUpload;
    let agreeWhether = this.state.checedimg;
    if (whether) {
      whether = false;
      agreeWhether = disagree;
    } else {
      whether = true;
      agreeWhether = agree;
    }
    this.setState({
      checedimg: agreeWhether,
      agreeUpload: whether,
    });
  }
  render() {
    // const true1 = true;
    const _this = this;
    return (
      <div style={{ paddingBottom: "20px" }}>
        <div className={styles.cerification}>
        {
          this.state.certificationOk ? <div className={styles.success}>
            <div></div>
            认证成功
          </div> : <div>拍摄您的二代身份证原件，请确保图片清晰、四角完整</div>
        }
          <div onTouchEnd={() => { this.takePictures(1); }} style={this.state.front.length > 0 ? { backgroundImage: "url(" + _this.state.front + ")" } : {}}></div>
          <div onTouchEnd={() => { this.takePictures(0); }} style={this.state.back.length > 0 ? { backgroundImage: "url(" + _this.state.back + ")" } : {}}></div>
          {
            this.state.certificationOk ?
              <div style={{ textAlign: "center" }}>信息仅用于身份验证，员工体检服务保证您的信息安全</div> :
              <div id="agree">
                <span className={styles.checked} style={{ backgroundImage: "url(" + _this.state.checedimg + ")", paddingLeft: "27%" }} onTouchEnd={() => { this.agreeFuntion(); }}>已同意员工体检服务</span>
                <a scr="">《实名认证协议》</a>
              </div>
          }
        </div>
      </div>
    );
  }
}

export { View as default };
