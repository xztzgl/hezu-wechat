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
  onclick(e) {
    e.preventDefault();
    // const values = $(this.props.id).val();
    // console.log(values, 6666);
    this.props.onClickFun(e);
  }
  render() {
    return (
      <div className={`${styles.Pay} ${this.props.className}`}>
        <div>
          <span>
            <span style={this.props.displayed === "0" ? { display: "none" } : {}}>¥{this.props.price} ／人</span>
          </span>
          <span>
            {
              this.props.children
            }
            <button onClick={(e) => { this.onclick(e); }}>{this.props.buttonName}</button>
          </span>
        </div>
      </div>
    );
  }
}
export { View as default };
