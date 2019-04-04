import React from "react";
import { Toast } from "antd-mobile";
// import LabelInput from "srcDir/common/viewform/labelInput/labelInput";
// import LabelButton from "srcDir/common/viewform/menAndWomen/view";
// import FooterButton from "srcDir/common/viewform/footerBottom/view";
import fetch from "srcDir/common/ajax/indexWithBody";
// import FooterBottom from "srcDir/common/viewform/footerBottom/view";
import history from "srcDir/common/router/history";
import store from "store2";
import styles from "./style.less";
// import fetchUpload from "srcDir/common/ajax/upload";
// import Select from "srcDir/common/viewform/select/view";
// const RadioItem = Radio.RadioItem;
// const values = {};
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rankingData: [],
      value: "",
    };
    this.onChange = this.onChange.bind(this);
    this.reset = this.reset.bind(this);
    // console.log(props, 1111);
  }
  componentDidMount() {
    const _this = this;
    fetch({
      url: "/wx/position/myPosition",
      method: "GET",
      // params: {
      //   phoneNumber: phonelength,
      // },
      success(res) {
        const data = res.entity; // JSON.parse(res.entity);
        const position = store.set("position");
        const id = store.set("ide");
        console.log(id, "测试1");
        if (position !== "undefined" && position !== null) {
          _this.setState({
            rankingData: data.obj,
            value: position,
            id: id
          });
          localStorage.removeItem("position");
          localStorage.removeItem("ide");
        }
      }
    });
  }
  onChange(e, value) {
    // console.log($(e.target).value());
    e.preventDefault();
    this.setState({
      value: value,
    });
  }
  reset() {
    this.setState({
      value: "",
    });
  }
  ok() {
    // console.log(typeof(this.state.value), this.state.value);
    const position = this.state.value + "";
    if (position.length > 0) {
      const _this = this;
      fetch({
        url: "/wx/employee/info/alter",
        method: "POST",
        // params: {
        //   id: _this.state.id,
        //   position: _this.state.value,
        // },
        entity: {
          id: _this.state.id,
          position: _this.state.value,
        },
        success(res) {
          const data = res.entity; // JSON.parse(res.entity);
          // console.log(data);
          if (data.success) {
            Toast.success(data.msg, 1, () => { history.go(-1); });
          } else {
            Toast.fail(data.msg);
          }
        }
      });
    } else {
      Toast.info("请选择岗位");
    }
  }
  render() {
    const _this = this;
    return (
      <div style={{ paddingTop: 20 }} className={styles.bg}>
        <div className={styles.content}>
          {
            this.state.rankingData.map((i, s) =>
              <div
                className={styles.children}
                key={s}onClick={(e) => _this.onChange(e, i.value)}
                value={i.value}
                style={(this.state.value + "") === (i.value + "") ? { backgroundColor: "#4175ff", color: "#fff" } : {}}
              >
                {/* <RadioItem
                  key={i.value}
                  checked={(this.state.value + "") === (i.value + "")}
                  onClick={(e) => _this.onChange(e, i.value)}
                  onChange={(e) => _this.onChange(e, i.value)}
                >
                  {i.label}
                </RadioItem> */}
                {i.label}
              </div>
            )
          }
        </div>
        {/* <FooterBottom price="0" displayed="0" buttonName="确定" onClickFun={() => { this.payImmediately(); }} >
          <button>查看订单</button>
        </FooterBottom> */}
        <div className={styles.submit}>
          <div>
            <span>
              <button onClick={(e) => this.reset(e)}>重置</button>
            </span>
            <span>
              <button onClick={(e) => this.ok(e)}>确定</button>
            </span>
          </div>
        </div>
      </div>
    );
  }
}
export { View as default };
