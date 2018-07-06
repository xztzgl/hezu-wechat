import React from "react";
import { Toast } from "antd-mobile";
import fetch from "srcDir/common/ajax/index";
import fetchBody from "srcDir/common/ajax/indexWithBody";
import LoginInput from "srcDir/common/viewform/loginInput/view";
import history from "srcDir/common/router/history";
import store from "store2";
import styles from "./style.less";

const codeImage = require("srcDir/images/code@3x.png");
const numberImage = require("srcDir/images/number@3x.png");
// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phonetext: "",
      verificationCode: "",
      phone: "",
      code: "",
      switch: true,
      touchbar: "loginTabLeft",
      enterprise: true,
    };
    this.getVerificationCode = this.getVerificationCode.bind(this);
    this.verifyThePhone = this.verifyThePhone.bind(this);
    this.setSwitch = this.setSwitch.bind(this);
    this.loginfunction = this.loginfunction.bind(this);
    this.verifyVerficationcode = this.verifyVerficationcode.bind(this);
    this.enterprise = this.enterprise.bind(this);
    // console.log(props, 2222);
  }
  // componentDidMount() {
  //   // const _this = this;
  // }
  getVerificationCode() {
    // console.log(this.state.phone, 111);
    const phonelength = this.state.phone;
    if (phonelength.length < 1) {
      this.verifyThePhone(phonelength);
    } else {
      // console.log(111);
      fetch({
        url: `/wechat-login/getCode/${phonelength}`,
        method: "GET",
        // params: {
        //   phoneNumber: phonelength,
        // },
        success(res) {
          // console.log("成功", res);
          const data = JSON.parse(res.entity);
          // Toast.success(data.msg);
          if (!data.obj) {
            return false;
          }
        }
      });
    }
    // console.log(111);
  }
  setSwitch(e) {
    if (e) {
      // console.log(e);
      this.setState({
        switch: false,
      });
    } else {
      this.setState({
        switch: true,
      });
    }
  }
  loginfunction(e) {
    e.preventDefault();
    const phonelength = this.state.phone;
    const codelength = this.state.code;
    // console.log(1);
    if (phonelength.length < 1) {
      this.verifyThePhone(phonelength);
    } else if (codelength.length < 1) {
      this.verifyVerficationcode(codelength);
    } else {
      // let urlP;
      // if (this.state.enterprise) {
      //   urlP = "/wx/enterprise/info/login";
      // } else {
      const urlP = "/wechat-login/login";
      // }
      fetchBody({
        // url: "/wx/account/login",
        url: urlP,
        method: "POST",
        entity: {
          password: codelength,
          username: phonelength,
          // mobile: phonelength,
        },
        success(res) {
          console.log("成功", res);
          const data = res.entity;
          if (data.success) {
            // alert(JSON.parse(res.entity).obj.token, 12313);
            store.set("Authorization", `Bearer ${data.token}`);
            store.set("customerId", data.customer_id);
            // store.set("userType", JSON.parse(res.entity).obj.userType);
            // const url = store.session.get("page");
            if (data.signed) {
              const origin = window.location.origin;
              window.location.href = `${origin}`;
            } else {
              history.push("/registered/", {
                username: phonelength
              });
            }
            // const origin = window.location.origin;
            // window.location.href = `${origin}`;
            // if (url && url !== "") {
            //   Toast.success(data.msg, 2, () => {
            //     // history.push("homepage/");
            //     window.location.href = `${origin}`;
            //   });
            // } else {
            //   window.location.href = `${origin}/homepage`;
            // }
            // window.location.href = "/homepage";
          } else {
            Toast.fail(data.msg);
          }
        }
      });
    }
  }
  verifyVerficationcode(e) {
    if (e.length < 1) {
      this.setState({
        verificationCode: "验证码不能为空。",
      });
    } else if (e.length > 6 || e.length < 6) {
      this.setState({
        verificationCode: "验证长度为6位。",
      });
      // delete values.phone;
    } else {
      this.setState({
        verificationCode: "",
        code: e,
      });
    }
  }
  verifyThePhone(e) {
    const phoneNum = /^1\d{10}$/;
    if (e.length < 1) {
      this.setState({
        phonetext: "手机号不能为空。",
      });
      // delete values.phone;
    } else if (e.length > 11) {
      this.setState({
        phonetext: "手机号最大长度为11位。",
        switch: false,
      });
      // delete values.phone;
    } else {
      if (!phoneNum.test(e)) {
        this.setState({
          phonetext: "请输入正确的手机号",
          switch: false,
        });
        // delete values.phone;
      } else {
        // values.phone = e;
        this.setState({
          phonetext: "",
          phone: e,
          switch: true,
        });
      }
    }
  }
  enterprise(e, name) {
    this.setState({
      touchbar: name,
      enterprise: e
    });
  }
  registered() {
    history.push("/registered/");
  }
  render() {
    // const letter = this.props.label.length > 3 ? { letterSpacing: 0 } : {};
    return (
      <div className={styles.login}>
        <div className={styles.loginBody}>
          <div className={styles.loginTab}>
            {/* <div className={styles[this.state.touchbar]}></div> */}
            {/* <div className={styles.loginTabTitle}>
              <div onClick={() => this.enterprise(true, "loginTabLeft")}>企业用户登录</div>
              <div onClick={() => this.enterprise(false, "loginTabRight")}>个人用户登录</div>
            </div> */}
          </div>
          <LoginInput
            label="手机"
            types="tel"
            prompt={this.state.phonetext}
            // val={this.state.name}
            placeholder="请输入11位手机号"
            id="textinput"
            url={codeImage}
            onchangeFun={(e) => { this.verifyThePhone(e); }}
            // verificationCode={(e) => { this.getVerificationCode(e); }}
            disabledCode="0"
          />
          <LoginInput
            label="验证码"
            types="tel"
            prompt={this.state.verificationCode}
            // val={this.state.name}
            placeholder="请输入验证码"
            id="textinput2"
            url={numberImage}
            phonenum={this.state.phone}
            switch={this.state.switch}
            onchangeFun={(e) => { this.verifyVerficationcode(e); }}
            verificationCode={(e) => { this.getVerificationCode(e); }}
            setSwitch={(e) => { this.setSwitch(e); }}
            disabledCode="1"
          />
          <div className={styles.loginButton}>
            <button onClick={(e) => { this.loginfunction(e); }}>登录</button>
          </div>
          {/* <div className={styles.registered}>
            {
             this.state.enterprise && <span onClick={() => this.registered()}>企业用户注册</span>
            }
          </div> */}
        </div>
      </div>
    );
  }
}
export { View as default };
