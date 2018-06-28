import React from "react";
import { render } from "react-dom";
import FooterButton from "srcDir/common/viewform/footerBottom/view";
import styles from "./style.less";
// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   promptText: "",
    // };
    this.inquire = this.inquire.bind(this);
    this.renderContent = this.renderContent.bind(this);
    // console.log(props, 2222);
  }
  // componentDidMount() {
  //   // console.log(this.props.prompt, 888);
  // }
  componentDidMount() {
    const _this = this;
    setTimeout(function () {
      _this.renderContent();
    }, 1000);
  }
  inquire(e) {
    e.preventDefault();
    // const values = $(this.props.id).val();
    // console.log(values, 6666);
    // this.props.onchangeFun();
    this.props.features();
  }
  renderContent() {
    const _this = this;
    const { props } = this;
    const Content = () => (
      <div>
        <div className={`${styles.errorBody} ${props.classname}`}>
          <p>{props.dataaction ? props.dataaction : "查询失败!"}</p>
          <p>{props.datatitle ? props.datatitle : "未找到体检证明!"}</p>
        </div>
        {
          props.disabled === "1" && <FooterButton
            className={styles.buttonCenter}
            displayed="0"
            buttonName={props.bottonName ? props.bottonName : "查询更多"}
            onClickFun={(e) => { _this.inquire(e); }}
          />
        }
      </div>
    );
    if (document.getElementById("failResult")) {
      render(
        <Content />
        , document.getElementById("failResult")
      );
    }
  }
  render() {
    // console.log(this.props, 666);
    return (
      <div id="failResult" />
    );
  }
}
export { View as default };
