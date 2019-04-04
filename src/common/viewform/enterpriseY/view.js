import React from "react";
import styles from "./style.less";

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
  onchange(e) {
    e.preventDefault();
    const values = $(this.props.id).val();
    // console.log(values, 6666);
    this.props.onchangeFun(values);
  }
  code(e) {
    e.preventDefault();
    // console.log(111);
    if (this.props.switch) {
      // console.log(12313);
      if (this.props.phonenum && this.props.phonenum.length > 0) {
        // $(".code").hide();
        this.props.verificationCode();
        this.countdown();
        this.props.setSwitch(true);
      } else {
        this.props.yphone("");
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
    // const urlimg = `url(${this.props.url})`;
    return (
      <div className={styles.inputBody}>
        <div className={styles.inputPos}>
          <div className={styles.inputCss}>
            <label>{this.props.label}</label>
            <input
              type={this.props.types}
              placeholder={this.props.placeholder}
              // disabled={this.props.val.length > 0 ? "disabled" : ""}
              // style={this.props.val.length > 0 ? { color: "#999" } : {}}
              defaultValue={this.props.val}
              ref={(input) => { this.props.id = input; }} onChange={(e) => { this.onchange(e); }}
            />
          </div>
          <div className={styles.getVerificationCode} style={this.props.disabledCode === "1" ? {} : { display: "none" }}>
            <button className="code" onClick={(e) => { this.code(e); }}>获取验证码</button>
            {
              /*
                <button className="countdown" style={{ display: "none" }}></button>
              */
            }
          </div>
        </div>
        <div className={styles.prompt}>{this.props.prompt}</div>
      </div>
    );
  }
}
export { View as default };
