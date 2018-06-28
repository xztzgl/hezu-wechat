import React from "react";

// import { Toast } from "antd-mobile";
// import fetch from "srcDir/common/ajax/indexWithBody";
import history from "srcDir/common/router/history";


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
        <div className={styles.tableList}>
          {
            data.map((v, k) => <div key={k}>
              <div>{v.physicalName}</div>
              <div>{v.physicalCardId}</div>
              <div>{v.statusName}</div>
            </div>)
          }
        </div>
      </div>
    );
  }
}
export { View as default };
