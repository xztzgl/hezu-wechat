import React from "react";
import styles from "./style.less";
import { Picker } from "antd-mobile";
import fetch from "srcDir/common/ajax/index";
// 创建react组件
// import { district } from "antd-mobile-demo-data";
const CustomChildren = props => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: "#fff", paddingLeft: "0.3rem" }}
  >
    <div style={{ display: "flex", height: "0.9rem", lineHeight: "0.9rem", borderRadius: "0 10px 10px 0" }}>
      {/* <div style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>1{props.children}</div> */}
      <div style={{ flex: 1, color: "#888" }}>{props.extra}</div>
    </div>
  </div>
);
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promptText: "",
      pickerValue: [],
      district: [],
    };
    this.onchange = this.onchange.bind(this);
    // console.log(props, 2222);
  }
  componentDidMount() {
    const _this = this;
    fetch({
      url: "/sys/area/tree",
      method: "GET",
      // params: {
      //   phoneNumber: phonelength,
      // },
      success(res) {
        const data = JSON.parse(res.entity);
        // console.log(data);
        _this.setState({
          district: data.obj
        });
      }
    });
  }
  onchange(e) {
    // e.preventDefault();
    this.setState({ pickerValue: e });
    // const values = $(this.props.id).val();
    // console.log(values, 6666);
    this.props.onchangeFun(e);
  }
  code(e) {
    e.preventDefault();
    // console.log(111);
    if (this.props.switch) {
      this.props.verificationCode();
      if (this.props.phonenum.length > 0) {
        // $(".code").hide();
        this.countdown();
        this.props.setSwitch(true);
      }
    }
  }
  countdown() {
    // console.log(111111);
    let times = 60;
    // $(".countdown").show();
    const _this = this;
    const countdown = setInterval(function () {
      if (times === 60) {
        $(".code").text(times);
        times --;
      } else if (times < 0) {
        // $(".countdown").hide();
        clearInterval(countdown);
        // $(".code").show();
        $(".code").text("获取验证码");
        _this.props.setSwitch(false);
      } else {
        $(".code").text(times);
        times --;
      }
    }, 1000);
  }
  render() {
    // const letter = this.props.label.length > 3 ? { letterSpacing: 0 } : {};
    return (
      <div className={styles.inputBody}>
        <div className={styles.inputPos}>
          <div className={styles.inputCss}>
            <label >所在地区</label>
            <Picker
              // title="选择地区"
              extra="选择地区"
              data={this.state.district}
              value={this.state.pickerValue}
              onChange={v => this.onchange(v)}
            >
              <CustomChildren>选择地区</CustomChildren>
            </Picker>
          </div>
          <div className={styles.getVerificationCode} style={this.props.disabledCode === "1" ? {} : { display: "none" }}>
            <button className="code" onClick={(e) => { this.code(e); }}>获取验证码</button>
          </div>
        </div>
        <div className={styles.prompt}>{this.props.prompt}</div>
      </div>
    );
  }
}
export { View as default };
