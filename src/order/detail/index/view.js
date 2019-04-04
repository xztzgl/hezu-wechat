import React from "react";
import { Icon, Toast, Modal } from "antd-mobile";
import { render, unmountComponentAtNode } from "react-dom";
// import moment from "moment";
import fetch from "srcDir/common/ajax/indexWithBody";
import store from "store2";
import RefundReasonView from "srcDir/order/detail/index/refundReasonView";
import history from "srcDir/common/router/history";
import pay from "srcDir/common/weichat/pay";
import styles from "./style.less";
const alert = Modal.alert;
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      statusCode: "",
      physicalName: "",
      physicalPhone: "",
      physicalCardId: "",
      healthCenteLogo: "",
      healthCenterName: "",
      appointDate: "",
      amount: "",
      discountAmount: "",
      paidAmount: "",
      sn: "",
      orderTime: "",
      beginTime: "",
      endTime: "",
      time: "",
      id: "",
      healthCenterId: "",
      contactName: "",
      contactPhone: "",
      number: "",
      childOrderDTOs: "",
      typeCode: "",
      shopOrderLogs: "",
      paymentMethodName: "",
      groupListName: "",
      groupListPhone: "",
      close: true,
    };
    this.getData = this.getData.bind(this);
    this.setInterval = this.setInterval.bind(this);
    this.reservation = this.reservation.bind(this);
    this.organization = this.organization.bind(this);
    this.toPay = this.toPay.bind(this);
    this.toRefund = this.toRefund.bind(this);
    this.check = this.check.bind(this);
    this.group = this.group.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.getData(nextProps);
  }
  getData(e) {
    let data = "";
    if (e.results.obj.shopOrder) {
      data = e.results.obj.shopOrder;
      this.setState({
        statusCode: e.results.obj.refundStatusCode,
        shopOrderLogs: e.results.obj.refundLogs,
      });
    } else {
      data = e.results.obj;
      this.setState({
        statusCode: data.statusCode,
        shopOrderLogs: data.shopOrderLogs,
      });
    }
    // console.log(data, 111);
    const _this = this;
    this.setState({
      id: data.id,
      // statusCode: data.statusCode,
      physicalName: data.physicalName,
      physicalPhone: data.physicalPhone,
      physicalCardId: data.physicalCardId,
      healthCenterId: data.healthCenterId,
      healthCenteLogo: data.healthCenteLogo,
      healthCenterName: data.healthCenterName,
      appointDate: _this.date(data.appointDate),
      amount: _this.price(data.amount),
      discountAmount: _this.price(data.discountAmount),
      paidAmount: _this.price(data.amount, data.discountAmount),
      sn: data.sn,
      orderTime: data.orderTime,
      beginTime: data.beginTime,
      endTime: data.endTime,
      contactName: data.contactName,
      contactPhone: data.contactPhone,
      number: data.number,
      childOrderDTOs: data.childOrderDTOs,
      typeCode: data.typeCode,
      // shopOrderLogs: data.shopOrderLogs,
      paymentMethodName: data.paymentMethodName,
      groupListName: _this.group(data.childOrderDTOs, "physicalName"),
      groupListPhone: _this.group(data.childOrderDTOs, "phone"),
    });
    this.setInterval(data.orderTime);
  }
  setInterval(e) {
    const _this = this;
    const time = setInterval(function () {
      if (_this.expired(e) === "0:0:0") {
        // console.log(e);
        _this.setState({
          time: _this.expired(e),
          close: false,
        });
        clearInterval(time);
      } else {
        _this.setState({
          time: _this.expired(e),
        });
      }
    }, 1000);
  }
  toPay(id) {
    pay(id, this.callback);
  }
  callback() {
    const defaultKey = "1";
    history.push("/orderList/", {
      defaultKey,
    });
  }
  price(u, k) {
    let p = "0";
    if (u && !k) {
      p = u;
    } else if (u && k) {
      p = u - k;
    }
    // console.log(p);
    return parseFloat(p).toFixed(2);
  }
  expired(e) {
    const dateArry = e.replace(/-/g, "/");
    const date = new Date();
    const now1 = date.getTime();
    const endDate = (new Date(dateArry)).getTime() + 30 * 60 * 1000;
    const end = new Date(endDate);
    const leftTime = end - now1;
    // let d;
    let h = 0;
    let m = 0;
    let s = 0;

    if (leftTime > 0) {
      // d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
      h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
      m = Math.floor(leftTime / 1000 / 60 % 60);
      s = Math.floor(leftTime / 1000 % 60);
    }
    return h + ":" + m + ":" + s;
  }
  date(e) {
    let dataArry = "0";
    if (e) {
      dataArry = e.split(" ")[0];
    }
    return dataArry;
  }
  remaining(e) {
    const dateArry = e.replace(/-/g, "/");
    const date = new Date();
    const now1 = date.getTime();
    const endDate = (new Date(dateArry)).getTime() + 30 * 60 * 1000;
    const end = new Date(endDate);
    const leftTime = end - now1;
    let d = 0;
    // let h = 0;
    // let m = 0;
    // let s = 0;

    if (leftTime > 0) {
      d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
      // h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
      // m = Math.floor(leftTime / 1000 / 60 % 60);
      // s = Math.floor(leftTime / 1000 % 60);
    }
    return d;
  }
  toCancel(id, defaultKey) {
    alert("确认取消订单？", "取消订单后录入的信息将一同删除",
      [
        { text: "确认取消",
          onPress: () => {
            fetch({
              url: "/wx/order/cancelSelfOrder",
              method: "POST",
              entity: {
                orderId: id,
              },
              success(res) {
                const data = res.entity;
                if (data.success) {
                  Toast.success(data.msg);
                  // let default = "1";
                  history.push("/orderList/", {
                    defaultKey,
                  });
                }
              }
            });
          }
        },
        {
          text: "放弃取消",
        },
      ],
      "default"
      // obj.defaultValue
    );
  }
  toRefund(id) {
    const _this = this;
    const onClose = () => {
      unmountComponentAtNode(document.getElementById("modal2refund1"));
    };
    render(
      <RefundReasonView id={id} onClose={onClose} refreshList={_this.refreshList} />, document.getElementById("modal2refund1")
    );
  }
  organization() {
    const id = this.state.healthCenterId;
    const { addRoute } = this.props.router;
    addRoute({ keyName: "体检点详情", path: "/order/addressDetails", name: "体检点详情", title: "/order/addressDetails", component: "order/addressDetails/index", paramId: id });
  }
  reservation() {
    const values = {
      name: this.state.physicalName,
      cardid: this.state.physicalCardId,
      phone: this.state.physicalPhone
    };
    store.set("physicalExaminationInformation", values);
    history.push("/personalBooking/", {
      reBooking: true
    });
  }
  check(id) {
    history.push("/order/report", {
      id: id,
    });
  }
  groupList() {
    history.push("/orderList/list", {
      data: this.state.childOrderDTOs,
    });
  }
  orderProgress() {
    history.push("/orderList/orderProgress", {
      data: this.state.shopOrderLogs
    });
  }
  group(k, v) {
    let value = "";
    const data = k[0];
    if (data) {
      if (v === "physicalName") {
        value = data.physicalName;
      } else if (v === "phone") {
        value = data.phone;
      }
    }
    return value;
  }
  render() {
    const _this = this;
    return (
      <div className={styles.bg}>
        <div className={styles.header} onTouchEnd={() => { this.orderProgress(); }}>
          {(() => {
            switch (this.state.statusCode) {
            case "O_001_01":
              return (<div className={styles.pay}><div className={styles.no}>
                <div>待付款</div>
                <div>{this.state.time}后订单将自动关闭，请尽快付款</div>
              </div></div>);
            case "O_001_02":
              return (<div className={styles.tobe} ><div className={`${styles.no}`}>
                <div>待体检</div>
                <div>请在{this.remaining(this.state.appointDate)}天后进行体检</div>
              </div></div>);
            case "O_001_03":
              return (<div className={styles.bodychecked}><div className={styles.noOne}>
                <div>已体检</div>
              </div></div>);
            case "O_001_04":
              return (<div className={styles.done}><div className={styles.noOne}>
                <div>已完成</div>
              </div></div>);
            case "O_001_05":
              return (<div className={styles.cancel}><div className={styles.noOne}>
                <div>已关闭</div>
              </div></div>);
            case "O_001_06":
              return (<div className={styles.refound}><div className={styles.noOne}>
                <div>退款中</div>
              </div></div>);
            case "O_002_01":
              return (<div className={styles.noOne}>
                <div>待付款</div>
              </div>);
            case "O_002_02":
              return (<div className={styles.pay}><div className={styles.noOne}>
                <div>已付款</div>
              </div></div>);
            case "O_002_03":
              return (<div className={styles.done}><div className={styles.noOne}>
                <div>已完成</div>
              </div></div>);
            case "O_002_04":
              return (<div className={styles.noOne}>
                <div>取消</div>
              </div>);
            case "O_003_01":
              return (<div className={styles.noOne}>
                <div>待审核</div>
              </div>);
            case "O_003_02":
              return (<div className={styles.refound}><div className={styles.noOne}>
                <div>退款中</div>
              </div></div>);
            case "O_003_03":
              return (<div className={styles.pay}><div className={styles.noOne}>
                <div>已退款</div>
              </div></div>);
            case "O_003_04":
              return (<div className={styles.noOne}>
                <div>审核未通过</div>
              </div>);
            case "O_003_05":
              return (<div className={styles.noOne}>
                <div>已取消</div>
              </div>);
            default:
              return "";
            }
          })()}
          <div>
            <Icon type="right" />
          </div>
        </div>
        {
          this.state.typeCode === "O_007_03" ? <div className={styles.physicalExamination}>
            <div>体检人信息</div>
            <div>
              <div>体检人：{this.state.physicalName}</div><div>{this.state.physicalPhone}</div>
            </div>
            <div>身份证号：{this.state.physicalCardId}</div>
          </div> : <div>
            <div className={styles.contact}>
              <div>联系人信息</div>
              <div>
                <div>联系人：{this.state.contactName}</div><div>{this.state.contactPhone}</div>
              </div>
            </div>
            <div className={styles.group}>
              <div onTouchEnd={() => { this.groupList(); }}>
                <div>体检名单</div><div>共{this.state.number}人</div><div><Icon type="right" /></div>
              </div>
              <div>
                <div>{this.state.groupListName}</div><div>{this.state.groupListPhone}</div>
              </div>
            </div>
          </div>
        }
        <div className={styles.checkpoint}>
          <div onTouchEnd={() => { this.organization(); }}>
            <div>{this.state.healthCenterName}</div>
            <div><Icon type="right" /></div>
          </div>
          <div></div>
          <div>
            <div>
              <img src={this.state.healthCenteLogo} alt="" />
              <span style={this.state.typeCode === "O_007_03" ? {} : { backgroundColor: "#4175ff", color: "#fff" }}>{this.state.typeCode === "O_007_03" ? "个人" : "团体"}</span>
            </div>
            <div>
              <div><span>{this.state.appointDate}</span><span>{this.state.beginTime}-{this.state.endTime}</span></div>
              <div><span>健康体检与结核病防治</span><span>¥{this.state.amount}</span></div>
            </div>
          </div>
          <div>
            <div>
              <span>订单金额</span>
              <span>¥{this.state.amount}</span>
            </div>
            <div>
              <span>优惠金额</span>
              <span>¥{this.state.discountAmount}</span>
            </div>
          </div>
          <div></div>
          <div>
            <span>实付款</span>
            <span>¥{this.state.paidAmount}</span>
          </div>
        </div>

        <div className={styles.paymentMethod}>
          <span>支付方式</span>
          <span>{this.state.paymentMethodName}</span>
        </div>

        <div className={styles.orderInformation}>
          <div>订单号：{this.state.sn}</div>
          <div>下单时间：{this.state.orderTime}</div>
        </div>
        <div className={styles.btmline} />
        {(() => {
          switch (this.state.statusCode) {
          case "O_001_01":
            return (<div>
              {
                _this.state.close ? <div className={styles.btm}>
                  <button onTouchEnd={() => { _this.toCancel(_this.state.id, "1"); }}>取消订单</button>
                  <button onTouchEnd={() => { _this.toPay(_this.state.id); }}>立即支付</button>
                </div> : <div className={styles.btm} style={{ backgroundColor: "#e9e9e9" }}></div>
              }
            </div>);
          case "O_001_02":
            return (<div className={styles.btm}>
              <button onTouchEnd={() => { this.toRefund(_this.state.id); }}>申请退款</button>
              <button onTouchEnd={() => { this.reservation(); }}>重新预约</button>
            </div>);
          case "O_001_03":
            return (<div className={styles.btm}>
              <button onTouchEnd={() => { this.reservation(); }}>重新预约</button>
            </div>);
          case "O_001_04":
            return (<div className={styles.btm}>
              <button onTouchEnd={() => { this.reservation(); }}>重新预约</button>
              <button onTouchEnd={() => { this.check(_this.state.id); }}>查看报告</button>
            </div>);
          case "O_001_05":
            return (<div className={styles.btm}>
              <button onTouchEnd={() => { this.reservation(); }}>重新预约</button>
            </div>);
          case "O_001_06":
            return (<div className={styles.btm}>
              <button onTouchEnd={() => { this.reservation(); }}>重新预约</button>
            </div>);
          case "O_002_01":
            // return (<div className={styles.btm}>
            //   <button>申请退款</button>
            //   <button>重新预约</button>
            // </div>);
            return "";
          case "O_002_02":
            // return (<div className={styles.btm}>
            //   <button>申请退款</button>
            //   <button>重新预约</button>
            // </div>);
            return "";
          case "O_002_03":
            // return (<div className={styles.btm}>
            //   <button>申请退款</button>
            //   <button>重新预约</button>
            // </div>);
            return "";
          case "O_002_04":
            // return (<div className={styles.btm}>
            //   <button>重新预约</button>
            // </div>);
            return "";
          case "O_003_01":
            return (<div className={styles.btm}>
              <button onTouchEnd={() => { this.reservation(); }}>重新预约</button>
            </div>);
          case "O_003_02":
            return (<div className={styles.btm}>
              <button onTouchEnd={() => { this.reservation(); }}>重新预约</button>
            </div>);
          case "O_003_03":
            return (<div className={styles.btm}>
              <button onTouchEnd={() => { this.reservation(); }}>重新预约</button>
            </div>);
          case "O_003_04":
            return (<div className={styles.btm}>
              <button>申请退款</button>
              <button onTouchEnd={() => { this.reservation(); }}>重新预约</button>
            </div>);
          case "O_003_05":
            return (<div className={styles.btm}>
              <button onTouchEnd={() => { this.reservation(); }}>重新预约</button>
            </div>);
          default:
            return "";
          }
        })()}
        <div id="modal2refund1" ></div>
      </div>
    );
  }
}
export { View as default };
