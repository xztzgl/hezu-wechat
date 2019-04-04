import React from "react";

import { Toast } from "antd-mobile";
import fetch from "srcDir/common/ajax/indexWithBody";
import history from "srcDir/common/router/history";
import store from "store2";

// 创建react组件
import LabelInput from "srcDir/common/viewform/labelInput/labelInput";
import FooterButton from "srcDir/common/viewform/footerBottom/view";
import styles from "./style.less";

const values = {};
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberpeople: "",
      phone: "",
      name: "",
      emailaddress: "",
      numOpen: true,
      phoneOpen: true,
      nameOpen: true,
      emailOpen: true,
    };
    this.inquire = this.inquire.bind(this);
    this.physicalExamination = this.physicalExamination.bind(this);
    this.verifyThePhone = this.verifyThePhone.bind(this);
    this.numberpeople = this.numberpeople.bind(this);
    this.emailaddress = this.emailaddress.bind(this);
    // console.log(props, 2222);
  }
  // deleteValues(e) {
  //   $.each(e, function (v) {
  //     // console.log(v);
  //     delete e[v];
  //     // console.log(e);
  //   });
  // }
  componentDidMount() {
    const windowbody = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const topheight = $("#telephone").offset().top;
    const telephoneHeight = windowbody - topheight - 67 + "px";
    $("#bg").css("height", windowbody);
    $("#telephone").css("height", telephoneHeight);
  }
  inquire() {
    // e.preventDefault();
    // if (k) {
    //   console.log(1);
    //   return false;
    // }
    const ary = [];
    if (!values.contact) {
      if (this.state.nameOpen) {
        this.physicalExamination("");
      }
      ary.push("0");
    }
    if (!values.phone) {
      if (this.state.phoneOpen) {
        this.verifyThePhone("");
        // return false;
      }
      ary.push("0");
    }
    if (!values.email) {
      if (this.state.emailOpen) {
        this.emailaddress("");
        // return false;
      }
      ary.push("0");
    }
    if (!values.number) {
      if (this.state.numOpen) {
        this.numberpeople("");
        // return false;
      }
      ary.push("0");
    }
    if (ary.indexOf("0") === -1) {
      // console.log(1);
      // history.push("/searchError");
      // this.deleteValues(values);
      // const _this = this;
      // history.push("/homepage/");
      const userId = store.get("garage-wechat-user");
      if (userId) {
        values.userId = userId.id;
      }
      fetch({
        url: "/wx/team/info/createTeamInfo",
        method: "POST",
        entity: values,
        success(res) {
          const data = res.entity;
          // console.log(data.obj);
          if (data.success) {
            Toast.success(data.msg);
            // _this.deleteValues(values);
            values.contact = "";
            values.phone = "";
            values.email = "";
            if (values.userId) {
              delete values.userId;
            }
            values.number = "";
            history.push("/homepage/");
          } else {
            Toast.error(data.msg);
          }
          // history.push("/searchSuccess");
        }
      });
    }
  }
  physicalExamination(e) {
    if (e.length < 1) {
      // console.log("不能为空");
      this.setState({
        name: "姓名不能为空",
        nameOpen: false,
      });
      // delete values.name;
    } else {
      values.contact = e;
      this.setState({
        name: "",
        // nameOpen: true,
      });
    }
  }
  verifyThePhone(e) {
    // console.log(1);
    const phoneNum = /^1\d{10}$/;
    if (e.length < 1) {
      this.setState({
        phone: "手机号不能为空。",
        phoneOpen: false,
      });
      // delete values.phone;
    } else if (e.length > 11) {
      this.setState({
        phone: "手机号最大长度为11位。",
        phoneOpen: false,
      });
      // delete values.phone;
    } else {
      if (!phoneNum.test(e)) {
        this.setState({
          phone: "请输入正确的手机号",
          phoneOpen: false,
        });
        // delete values.phone;
      } else {
        values.phone = e;
        this.setState({
          phone: "",
          // phoneOpen: ,
        });
      }
    }
  }
  emailaddress(e) {
    const re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (e.length < 1) {
      this.setState({
        emailaddress: "邮箱不能为空",
        emailOpen: false,
      });
    } else {
      if (re.test(e)) {
        values.email = e;
        this.setState({
          emailaddress: "",
          // emailOpen: false,
        });
      } else {
        this.setState({
          emailaddress: "请输入正确的邮箱地址",
          emailOpen: false,
        });
      }
    }
  }
  numberpeople(e) {
    if (e.length < 1) {
      // console.log("不能为空");
      this.setState({
        numberpeople: "人数不能为空",
        numOpen: false,
      });
      // delete values.name;
    } else if (!/^[0-9]*$/.test(e)) {
      this.setState({
        numberpeople: "请输入数字",
        numOpen: false,
      });
    } else {
      values.number = e;
      this.setState({
        numberpeople: "",
      });
    }
  }
  render() {
    return (
      <div className={styles.bg} id="bg">
        <LabelInput
          label="姓名"
          types="text"
          prompt={this.state.name}
          // val={this.state.name}
          placeholder="请输入联系人姓名"
          id="textinput"
          onchangeFun={(e) => { this.physicalExamination(e); }}
        />
        <LabelInput
          label="联系电话"
          types="tel"
          prompt={this.state.phone}
          // val={this.state.phoneNum}
          placeholder="请填写11位手机号"
          id="textinput2"
          classname="fourFont"
          onchangeFun={(e) => { this.verifyThePhone(e); }}
        />
        <LabelInput
          label="邮箱"
          types="text"
          prompt={this.state.emailaddress}
          // val={this.state.name}
          placeholder="请输入您的联系邮箱"
          id="textinput4"
          onchangeFun={(e) => { this.emailaddress(e); }}
        />
        <LabelInput
          label="体检人数"
          types="tel"
          prompt={this.state.numberpeople}
          // val={this.state.name}
          placeholder="请填写体检人数"
          id="textinput3"
          onchangeFun={(e) => { this.numberpeople(e); }}
        />
        <div id="telephone" className={styles.telephone} >
          <div className={styles.phoneAppointment}>
            <div className={styles.phone}>
              <a href="tel:4008001000" style={{ color: "transparent" }}>400-800-1000</a>
              <p>预约热线</p>
              <a href="tel:4008001000">400-800-1000</a>
            </div>
          </div>
        </div>
        <FooterButton
          className={styles.buttonCenter}
          displayed="0"
          buttonName="立即预约"
          onClickFun={(e) => { this.inquire(e); }}
        />
      </div>
    );
  }
}
export { View as default };
