import React from "react";
// import { render } from "react-dom";

import { Icon, Toast } from "antd-mobile";
// import fetch from "srcDir/common/ajax/index";
// // import openMap from "srcDir/common/weichat/openMap";
// // import Cookies from "js-cookie";
// import navigatorGeolocation from "./navigatorGeolocation";
// import { Toast } from "antd-mobile";
import fetchUpload from "srcDir/common/ajax/upload";
import fetch from "srcDir/common/ajax/indexWithBody";
import history from "srcDir/common/router/history";
import store from "store2";
// import TakePictures from "srcDir/common/viewform/takePictures/view";
import styles from "./style.less";
const imgHeader = require("srcDir/images/my_m@3x.png");
// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    // console.log(data);
    this.state = {
      takePictures: false,
      name: "",
      mobile: "",
      clickNum: 1
    };
    this.avatar = this.avatar.bind(this);
    this.getData = this.getData.bind(this);
    this.headerimg = this.headerimg.bind(this);
    this.onClick = this.onClick.bind(this);
    // console.log(props, 2222);
  }
  componentDidMount() {
    this.getData();
  }
  onClick() {
    const _this = this;
    const { clickNum } = this.state;
    if (clickNum < 7) {
      _this.setState({
        clickNum: clickNum + 1
      });
    } else if (clickNum === 7) {
      store.remove("Authorization");
      _this.setState({
        clickNum: 0
      });
      history.replace("/homepage/");
    }
  }
  getData() {
    // const data = history.state && history.state.state.data;
    const data = store.get("person");
    // console.log(data);
    this.setState({
      name: data.name || "",
      mobile: data.mobile || "",
      srcimg: data.avatar || "",
    });
  }
  avatar() {
    // if (e) {
    //   this.setState({
    //     takePictures: false,
    //   });
    // } else {
    //   this.setState({
    //     takePictures: true,
    //   });
    // }
    const _this = this;
    const file = window.document.createElement("input");
    file.id = "js-file";
    file.type = "file";
    file.accept = "image/*";
    // if (e) {
    //   file.capture = "camera";
    // }
    window.$(file).change(function () {
      const data = new FormData();
      data.append("file", file.files[0]);
      // console.log(data.values);
      fetchUpload({
        url: "/file/upload",
        method: "POST",
        entity: data,
        success(res) {
          // const licenseGender = res.entity.obj.gender.code;
          // const licenseData = res.entity.obj;
          // licenseData.id = props.results.obj.driverEntity.id;
          // delete licenseData.drMember;
          // delete licenseData.id;
          // addOrUpdateCarWithBindDefaultCar(licenseData);
          // console.log(res.entity.obj);
          if (res.entity.success) {
            fetch({
              url: "/wx/user/updateHeadImageUrl",
              method: "POST",
              params: {
                headImageUrl: res.entity.obj,
              },
              success(ress) {
                Toast.success(ress.entity.msg);
                // const data1 = ress.entity;
                // console.log(data1);
                // console.log(ress.entity.obj);
                _this.headerimg(res.entity.obj);
                // _this.props.clickFun(true);
              }
            });
          } else {
            Toast.error(res.entity.msg);
          }
        }
      });
    });
    file.click();
  }
  headerimg(e) {
    // console.log(e, 12222);
    this.setState({
      srcimg: e,
    });
  }
  render() {
    return (
      <div className={styles.bg}>
        <div className={styles.avatar} onTouchEnd={() => { this.avatar(); }}>
          <div>头像</div>
          <div><img src={this.state.srcimg ? this.state.srcimg : imgHeader} alt="" /></div>
          <div><Icon type="right" /></div>
        </div>
        <div className={styles.person}>
          <div>姓名</div>
          <div>{this.state.name}</div>
        </div>
        <div className={styles.person}>
          <div>账号</div>
          <div
            onClick={this.onClick}
            role="button"
            tabIndex="0"
          >{this.state.mobile}</div>
        </div>
        {
          // this.state.takePictures && <TakePictures clickFun={(e) => { this.avatar(e); }} headerImg={(e) => { this.headerimg(e); }} />
        }
      </div>
    );
  }
}
// const View = (props) => {
//   // console.info("myCenter/index/index");
//   console.log(props);

//   return (
//     <div className={styles.bg}>
//       <div className={styles.avatar} onTouchEnd={() => {}}>
//         <div>头像</div>
//         <div><img src="" alt="" /></div>
//         <div><Icon type="right" /></div>
//       </div>
//       <div className={styles.person}>
//         <div>姓名</div>
//         <div>777</div>
//       </div>
//       <div className={styles.person}>
//         <div>账号</div>
//         <div>19999999999</div>
//       </div>
//     </div>
//   );
// };

export { View as default };
