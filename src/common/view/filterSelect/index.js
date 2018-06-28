import React from "react";
// import { render } from "react-dom";

import { Button, Popover, Icon } from "antd-mobile";
// import fetch from "srcDir/common/ajax/index";
// // import openMap from "srcDir/common/weichat/openMap";
// // import Cookies from "js-cookie";
// import navigatorGeolocation from "./navigatorGeolocation";
// import history from "srcDir/common/router/history";
import styles from "./style.less";

// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selected: "",
      selectedName: "",
    };
    this.onSelect = this.onSelect.bind(this);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    // console.log(props);
  }
  onSelect(opt) {
    // console.log(arguments);
    this.setState({
      visible: false,
      selected: opt.props.value,
      selectedName: opt.props.children,
    });
    this.props.parentThis.setState({
      [this.props.paramsName]: opt.props.value,
      getMore: []
    });
  }
  handleVisibleChange(visible) {
    this.setState({
      visible,
    });
  }
  buttonClick(e) {
    console.log(this);
    console.log(e.target.offsetLeft);
  }
  render() {
    const _this = this;
    return (
      <Popover
        mask
        placement={_this.props.placement}
        overlayStyle={{ color: "currentColor" }}
        visible={_this.state.visible}
        overlay={_this.props.data}
        align={{
          overflow: { adjustY: 0, adjustX: 0 },
          offset: [-16, 15],
        }}
        onVisibleChange={_this.handleVisibleChange}
        onSelect={_this.onSelect}
        overlayClassName={styles.popover}
      >
        <Button className={`btn ${styles.default} ${_this.props.className}`} type="primary" inline size="small" onClick={_this.buttonClick}>
          {_this.state.selectedName || _this.props.title}　| <Icon type="down" style={{ verticalAlign: "middle" }} />
          <div className={`am-popover-arrow ${styles.arrow}`} hidden={!_this.state.visible} />
        </Button>
      </Popover>
    );
  }
}

export { View as default };
