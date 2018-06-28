import React from "react";
// import { render } from "react-dom";
import { Icon } from "antd-mobile";
import styles from "./style.less";
// import fetch from "srcDir/common/ajax/index";
// import fetchbody from "srcDir/common/ajax/indexWithBody";
import history from "srcDir/common/router/history";
// // import LoginInput from "srcDir/common/viewform/loginInput/view";
// // import LoginInput from "srcDir/common/viewform/loginInput/view";
// import store from "store2";
// // import fetch from "srcDir/common/ajax/indexWithBody";
// // 创建react组件
// // const View = (props) => {
// //   console.info("personalBooking/index/index");
// //   console.log(props);
// //   return (
// //     <div className={styles.bg}>
// //       <PersonalInformation />
// //     </div>
// //   );
// // };
// // const codeMap = store.session.get("codeMap");
// const genderCode = codeMap.filter((x) => /M_012\S+/.test(x.code) === true);

// const employeeArry = [];
// genderCode.map(v => {
//   const obj = {
//     value: v.code,
//     label: v.name
//   };
//   employeeArry.push(obj);
//   return true;
// });
// console.log(genderCode, 111111, employeeArry);
// const values = {};
// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      person: {},
      district: [],
      url: ""
    };
    // this.inquire = this.inquire.bind(this);
    // this.getStore = this.getStore.bind(this);
    // this.verifyThePhone = this.verifyThePhone.bind(this);
    // this.onAddImageClick = this.onAddImageClick.bind(this);
    // this.loginfunction = this.loginfunction.bind(this);
    // this.verifyIndustry = this.verifyIndustry.bind(this);
    // this.verifyEmploynumCode = this.verifyEmploynumCode.bind(this);
  }
  // componentDidMount() {
  //   // console.log(this.props.prompt, 888);
  //   const _this = this;
  //   fetch({
  //     url: "/wx/position/list?pid=1",
  //     method: "GET",
  //     // params: {
  //     //   phoneNumber: phonelength,
  //     // },
  //     success(res) {
  //       const data = JSON.parse(res.entity);
  //       // console.log(data, 1111);
  //       _this.setState({
  //         district: data.obj
  //       });
  //     }
  //   });
  //   this.getStore();
  // }
  loginfunction(e) {
    e.preventDefault();
    // console.log(values, "数据");
    history.push("/homepage/");
  }
  render() {
    return (
      <div>
        <div className={styles.icon}><Icon type="check-circle-o" /></div>
        <div className={styles.text}>已提交企业账号申请</div>
        <div className={styles.text}>将于<span>1-3个工作日</span>短息通知申请结果！</div>
        <div className={styles.loginButton}>
          <button onClick={(e) => { this.loginfunction(e); }}>确定</button>
        </div>
      </div>
    );
  }
}

export { View as default };
