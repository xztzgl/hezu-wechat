import React from "react";
import { List, Modal, Picker, Toast } from "antd-mobile";
import store from "store2";
import fetch from "srcDir/common/ajax/indexWithBody";
import history from "srcDir/common/router/history";
const codeMap = store.session.get("codeMap");
const gender = codeMap.filter(x => /R_004\S+/.test(x.code) === true);
const genderData = [];
gender.map(x => genderData.push({
  value: x.code,
  label: x.name
}));

// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      visible: true,
    };
    this.onClose = this.onClose.bind(this);
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
    // console.log(this.state);
  }
  onClose() {
    // console.log("close");
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  onChange(v) {
    // console.log(v);
    this.setState({
      value: v
    });
  }
  submit(defaultKey) {
    const _this = this;
    const { props, state } = this;
    if (!state.value || state.value.length === 0) {
      Toast.fail("请选择退款原因");
      return false;
    }
    fetch({
      url: "/wx/order/applyRefund",
      method: "POST",
      entity: {
        orderId: props.id,
        reasonCode: state.value[0]
      },
      success(res) {
        const data = res.entity;
        if (data.success) {
          // props.refreshList();
          Toast.success(data.msg);
          _this.onClose();
          history.push("/orderList/", {
            defaultKey,
          });
        }
      }
    });
  }

  render() {
    const _this = this;
    const { state } = this;

    return (
      <Modal
        title="申请退款"
        transparent
        maskClosable={false}
        visible={1}
        footer={[
          { text: "确定申请", onPress: () => { _this.submit("1"); } },
          { text: "取消申请", onPress: () => { _this.onClose(); } }
        ]}
      >
        请选择退款原因<br />
        <Picker
          data={genderData}
          cols={1}
          value={state.value}
          onChange={v => _this.onChange(v)}
        >
          <List.Item
            arrow="horizontal"
            multipleLine
            platform="android"
            onClick={() => {}}
          >
          退款原因
          </List.Item>
        </Picker>
      </Modal>
    );
  }
}

export default View;
