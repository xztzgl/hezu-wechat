import React from "react";
import styles from "./style.less";

// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      // open: true,
    };
    this.onchange = this.onchange.bind(this);
    // this.setValue = this.setValue.bind(this);
    // console.log(props, 2222);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      // console.log(nextProps, 888);
      this.setValue(nextProps.val);
    }
  }
  // componentDidMount() {
  //   this.setValue();
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(nextProps, nextState);
  //   if (nextState.open) {
  //     this.setValue();
  //   }
  // }
  onchange(e) {
    e.preventDefault();
    // const values = $(this.props.id).val();
    const values = e.target.value;
    // console.log(e.target.value);
    this.setState({
      value: values,
    });
    // console.log(values, 6666);
    this.props.onchangeFun(values);
  }
  setValue(k) {
    // const valText = this.props.val;
    // console.log(valText, 3333, k);
    this.setState({
      value: k,
    });
  }
  render() {
    const labellength = this.props.label.length;
    const letterTwo = labellength > 3 ? { letterSpacing: 0 } : {};
    const letter = labellength === 2 ? { letterSpacing: 31, padding: 0 } : letterTwo;
    return (
      <div className={styles.inputBody}>
        <div className={styles.inputCss}>
          <label style={letter} ><span className={labellength === 2 ? styles.spanPos : ""}>{this.props.label}</span></label>
          <input
            type={this.props.types}
            placeholder={this.props.placeholder}
            // disabled={this.props.val.length > 0 ? "disabled" : ""}
            // style={this.props.val.length > 0 ? { color: "#999" } : {}}
            // defaultValue={this.props.val}
            value={this.state.value}
            ref={(input) => { this.props.id = input; }} onChange={(e) => { this.onchange(e); }}
          />
        </div>
        <div className={styles.prompt}>{this.props.prompt}</div>
      </div>
    );
  }
}
export { View as default };
