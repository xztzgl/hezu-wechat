import React from "react";

import { Steps, Icon } from "antd-mobile";
// import fetch from "srcDir/common/ajax/indexWithBody";
import history from "srcDir/common/router/history";
const Step = Steps.Step;


// 创建react组件
// import LabelInput from "srcDir/common/viewform/labelInput/labelInput";
// import FooterButton from "srcDir/common/viewform/footerBottom/view";
import styles from "./style.less";

// const values = {};
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberpeople: "",
      phone: "",
      name: "",
    };
    // this.inquire = this.inquire.bind(this);
    // this.physicalExamination = this.physicalExamination.bind(this);
    // this.verifyThePhone = this.verifyThePhone.bind(this);
    // this.numberpeople = this.numberpeople.bind(this);
    // console.log(props, 2222);
  }
  // deleteValues(e) {
  //   $.each(e, function (v) {
  //     // console.log(v);
  //     delete e[v];
  //     // console.log(e);
  //   });
  // }
  render() {
    // console.log(history);
    const data = history.location.state.data;
    return (
      <div>
        <div className={styles.phone}>
          <div>健康护照</div>
          <div><a href="tel:4008008811">4008008811</a></div>
          <div><Icon type="right" /></div>
        </div>
        <div className={styles.line}>
          <Steps current={-1} className="timeline">
            {
              data.map((v, k) => <Step
                key={k}
                title={v.statusToCode}
                description={v.createDate}
                // icon={<img className={styles.img} src={require("srcDir/images/dot_now@3x.png")} alt="" />}
                icon={(() => {
                  switch (v.toCode) {
                  case "O_001_01":
                    return (<img className={styles.img} src={require("srcDir/images/dot_pass@3x.png")} alt="" />);
                  case "O_001_02":
                    return (<img className={styles.img} src={require("srcDir/images/dot_pass@3x.png")} alt="" />);
                  case "O_001_03":
                    return (<img className={styles.img} src={require("srcDir/images/dot_pass@3x.png")} alt="" />);
                  case "O_001_04":
                    return (<img className={styles.img} src={require("srcDir/images/dot_pass@3x.png")} alt="" />);
                  case "O_001_05":
                    return (<img className={styles.img} src={require("srcDir/images/dot_now@3x.png")} alt="" />);
                  case "O_001_06":
                    return (<img className={styles.img} src={require("srcDir/images/dot_pass@3x.png")} alt="" />);
                  case "O_002_03":
                    return (<img className={styles.img} src={require("srcDir/images/dot_now@3x.png")} alt="" />);
                  case "O_003_01":
                    return (<img className={styles.img} src={require("srcDir/images/dot_pass@3x.png")} alt="" />);
                  default:
                    return "";
                  }
                })()}
              />)
            }
          </Steps>
        </div>
      </div>
    );
  }
}
export { View as default };
