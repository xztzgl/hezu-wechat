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
  componentDidMount() {
    // console.log(this.props.prompt, 888);
    if (this.props.val.length > 0) {
      this.props.sexCardid(this.props.val);
    }
  }
  render() {
    return (
      <div className={styles.buttonBody}>
        <div className={styles.buttonCss}>
          <label><span>{this.props.label}</span></label>
          <div>
            <div>
              <span>
                <button className={this.props.sex === "M" ? "sex" : ""}>男</button>
              </span>
              <span>
                <button className={this.props.sex === "F" ? "sex" : ""}>女</button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export { View as default };
