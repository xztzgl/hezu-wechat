import React from "react";
import LabelInput from "srcDir/common/viewform/labelInput/labelInput";
import FooterButton from "srcDir/common/viewform/footerBottom/view";
import styles from "./style.less";


// 创建react组件
const values = {};
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idNumber: "",
      headlth: "",
    };
    this.healthCertificateNumber = this.healthCertificateNumber.bind(this);
    this.inquire = this.inquire.bind(this);
    this.verifyTheIdentityCard = this.verifyTheIdentityCard.bind(this);
  }
  healthCertificateNumber(e) {
    if (e.length < 1) {
      // console.log("不能为空");
      this.setState({
        headlth: "健康证号不能为空。",
        // sex: "",
      });
      // delete values.cardid;
    } else if ((e.length >= 1 && e.length < 12) || e.length > 12) {
      this.setState({
        headlth: "健康证号只能是12位。",
        // sex: "",
      });
      // delete values.cardid;
    } else {
      this.setState({
        headlth: "",
      });
      values.sn = e;
    }
  }
  inquire() {
    const { props } = this;
    const ary = [];
    if (!values.sn) {
      this.healthCertificateNumber("");
    }
    if (!values.cardid) {
      this.verifyTheIdentityCard("");
      // return false;
      ary.push("0");
    }
    if (ary.indexOf("0") === -1) {
      // console.log(1);
      const { addRoute } = props.router || {};
      addRoute({ keyName: "查询健康证结果", path: "/searchResult", name: "查询健康证结果", title: "/searchResult", component: "verify/index/result", paramId: values });
    }
  }
  verifyTheIdentityCard(e) {
    const idCardNum = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
    if (e.length < 1) {
      // console.log("不能为空");
      this.setState({
        idNumber: "身份证号不能为空。",
        // sex: "",
      });
      // delete values.cardid;
    } else if (e.length > 18) {
      this.setState({
        idNumber: "身份证号只能是18位。",
        // sex: "",
      });
      // delete values.cardid;
    } else {
      if (!idCardNum.test(e)) {
        this.setState({
          idNumber: "请输入正确的身份证号",
          // sex: "",
        });
        // delete values.cardid;
      } else {
        this.setState({
          idNumber: "",
        });
        values.cardid = e;
        // console.log(e, "身份证");
        // this.getsex(e);
      }
    }
  }
  render() {
    return (
      <div className={styles.bg}>
        <LabelInput
          label="健康证号"
          types="text"
          prompt={this.state.headlth}
          // val={this.state.name}
          placeholder="请输入12位健康证号"
          id="textinput"
          onchangeFun={(e) => { this.healthCertificateNumber(e); }}
        />
        <LabelInput
          label="身份证号"
          types="text"
          prompt={this.state.idNumber}
          // val={this.state.cardid}
          placeholder="请输入18位身份证号"
          id="textinput1"
          onchangeFun={(e) => { this.verifyTheIdentityCard(e); }}
        />
        <FooterButton
          className={styles.buttonCenter}
          displayed="0"
          buttonName="查询"
          onClickFun={() => { this.inquire(); }}
        />
      </div>
    );
  }
}

export { View as default };
