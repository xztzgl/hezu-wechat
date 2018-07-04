import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
// import moment from "moment";
// import numeral from "numeral";
import store from "store2";

import { List, Modal, Toast } from "antd-mobile";
import history from "srcDir/common/router/history";
import fetch from "srcDir/common/ajax/indexWithBody";
import RefundReasonView from "srcDir/order/list/refundReasonView";
import pay from "srcDir/common/weichat/pay";

import styles from "./style.less";

const alert = Modal.alert;
import Nav from "srcDir/common/viewform/navigation/index";
// const defaultImg = require("srcDir/images/local_pic.png");
const getName = (code) => {
  const codeMap = store.session.get("codeMap");
  const arry = codeMap.filter(v => v.code === code);
  return arry.length > 0 ? arry[0].value : "";
};
const getDistrictName = (code) => {
  const district = store.session.get("district");
  const arry = district.filter(v => v.disp_local_id === code);
  // console.log(arry, 1111);
  return arry.length > 0 ? arry[0].local_name : "";
};
// const status = {
//   21001: "待评价"
//   21002: "已完成"
// };

// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollLoad: true,
      touchMove: true,
      customerId: store.get("customerId")
    };
    this.detail = this.detail.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.unmount = this.unmount.bind(this);
    this.callback = this.callback.bind(this);
    this.toPay = this.toPay.bind(this);
    this.toReBooking = this.toReBooking.bind(this);
    this.toCancel = this.toCancel.bind(this);
    this.toRefund = this.toRefund.bind(this);
    this.renderList = this.renderList.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
  }
  componentDidMount() {
    this.refreshList();
  }
  onScroll() {
    const _this = this;
    const { props, state } = this;
    if (state.scrollLoad && state.touchMove) {
      const win = $(window);
      const doc = $(document);
      if (win.scrollTop() + win.height() > doc.height() - 100) {
        // console.log("到底了", state.listData);

        let url;
        let statusId;
        switch (props.typeId) {
        case "1":
          url = "/wechat-order/list";
          statusId = "21001";
          break;

        case "2":
          url = "/wechat-order/list";
          statusId = "21002";
          break;

        default:
          url = "/wechat-order/list";
        }

        fetch({
          url,
          method: "POST",
          entity: {
            status_id: statusId,
            customer_id: state.customerId,
            limit: state.limit,
            page: state.page + 1,
          },
          success(res) {
            const data = res.entity;
            // 最后一页
            if (data.last) {
              state.scrollLoad = false;
            }
            const newListData = state.listData.concat(data.content);
            const ListContent = () => (<div>
              {
                newListData.map(v => _this.renderList(v))
              }
            </div>);
            render(
              <ListContent />
              , document.getElementById(`listWrapper${props.typeId}`)
            );
            _this.setState({
              listData: newListData,
              page: data.number,
              limit: data.size,
              touchMove: false
            });
            state.touchMove = false;
          }
        });
      }
    }
  }
  onTouchMove() {
    this.setState({ touchMove: true });
  }
  toCancel(id) {
    const _this = this;
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
                  _this.callback();
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
  toReBooking(id) {
    fetch({
      url: "wx/order/orderDetail",
      method: "POST",
      params: {
        id: id,
      },
      success(res) {
        const data = res.entity;
        if (data.success) {
          const values = {
            name: data.obj.physicalName,
            cardid: data.obj.physicalCardId,
            phone: data.obj.physicalPhone
          };
          store.set("physicalExaminationInformation", values);
          history.push("/personalBooking/", {
            reBooking: true
          });
        }
        // console.log(history);
      }
    });
  }
  toPay(id) {
    pay(id, this.callback);
  }
  callback() {
    // this.unmount();
    // console.log(this.unmount);
    this.refreshList();
  }
  unmount() {
    const { props } = this;
    unmountComponentAtNode(document.getElementById(`listWrapper${props.typeId}`));
  }
  refreshList() {
    const _this = this;
    const { props } = this;
    // console.log("old");
    // console.log(props.results.rows.map((v) => renderList(v)));
    let url;
    let statusId;
    switch (props.typeId) {
    case "1":
      url = "/wechat-order/list";
      statusId = "21001";
      break;

    case "2":
      url = "/wechat-order/list";
      statusId = "21002";
      break;
    // case "1":
    //   url = "/wx/order/listMyOrder";
    //   break;

    // case "2":
    //   url = "/wx/order/listMyOrder";
    //   statusId = "O_001_01";
    //   break;

    // case "3":
    //   url = "/wx/order/listMyOrder";
    //   statusId = "O_001_02";
    //   break;

    // case "4":
    //   url = "/wx/refund/listRefund";
    //   // statusId = "O_001_01";
    //   break;

    default:
      url = "/wechat-order/list";
    }

    fetch({
      url,
      method: "POST",
      entity: {
        status_id: statusId,
        customer_id: this.state.customerId,
        limit: 5,
        page: 0
      },
      success(res) {
        const data = res.entity;
        // console.log(data);
        // 最后一页
        const ListContent = () => (<div>
          {
            data.content.map(v => _this.renderList(v))
          }
        </div>);
        render(
          <ListContent />
          , document.getElementById(`listWrapper${props.typeId}`)
        );
        _this.setState({
          listData: data.content,
          page: data.number,
          limit: data.size
        });
      }
    });
  }
  detail(id) {
    store.set("product_id", id);
    history.push("/housingDetails");
  }
  toRefund(id) {
    // console.log(id);
    // console.log(RefundReasonView);
    // console.log(unmountComponentAtNode);
    const _this = this;
    const onClose = () => {
      unmountComponentAtNode(document.getElementById("modal2refund"));
    };
    render(
      <RefundReasonView id={id} onClose={onClose} refreshList={_this.refreshList} />, document.getElementById("modal2refund")
    );
  }

  renderList(v) {
    const _this = this;
    return (
      <List className={styles.card}>
        <List.Item wrap platform="android">
          {/* <header className={styles.header}>
            <h3 className={styles.title}>{v.house_title}</h3>
            <p className={`${styles.status} ${v.statusCode === "O_001_05" && styles.cancel}`}>{v.statusName}</p>
          </header> */}
          <div
            className={styles.detail}
            onClick={() => this.detail(v.id)}
          >
            <div className={styles.goods}>
              <img src={v.house_image_id.split(",")[0]} alt="icon" />
              <div className={styles.Introduction}>
                <div>
                  <div>{v.house_title}</div>
                </div>
                <div><span>{getName(v.house_housetype_id)}</span>-{getDistrictName(v.house_district_id)}-{v.house_name}</div>
                <div><text>{v.house_rental}元</text><text>{getName(v.house_payment_id)}</text></div>
              </div>
            </div>
          </div>
          {
            /* 待付款"O_001_01"，显示 立即付款 和 取消订单 */
            v.statusCode === "O_001_01" && (
              <footer className={styles.footer}>
                <button className={styles.button} onClick={() => _this.toCancel(v.id)}>取消订单</button>
                <button className={`${styles.button} ${styles.buttonActive}`} onClick={() => _this.toPay(v.id)}>立即付款</button>
              </footer>
            )
          }
          {
            /* 待体检"O_001_02"，显示 重新预约 和 申请退款 */
            v.statusCode === "O_001_02" && (
              <footer className={styles.footer}>
                <button className={styles.button} onClick={() => _this.toRefund(v.id)}>申请退款</button>
                <button
                  className={`${styles.button} ${styles.buttonActive}`}
                  onClick={() => _this.toReBooking(v.id)}
                >重新预约</button>
              </footer>
            )
          }
          {
            /* 退款"O_003"，显示 重新预约 */
            (/O_003/.test(v.statusCode) || (v.statusCode === "O_001_06")) && (
              <footer className={styles.footer}>
                <button
                  className={`${styles.button} ${styles.buttonActive}`}
                  onClick={() => _this.toReBooking(v.id)}
                >重新预约</button>
              </footer>
            )
          }
          {
            /* 已完成"O_001_04"，显示 再次预约 */
            (v.statusCode === "O_001_04" || v.statusCode === "O_001_05") && (
              <footer className={styles.footer}>
                <button
                  className={`${styles.button} ${styles.buttonActive}`}
                  onClick={() => _this.toReBooking(v.id)}
                >再次预约</button>
              </footer>
            )
          }
        </List.Item>
      </List>
    );
  }

  render() {
    const _this = this;
    const { props } = this;
    return (
      <div>
        <div
          id={`listWrapper${props.typeId}`}
          className={styles.listWrapper}
          onTouchMove={_this.onTouchMove}
          onTouchEnd={_this.onScroll}
        >
          {/*
            state.listData && state.listData.map(v => _this.renderList(v))
          */}
        </div>
        <div id="modal2refund" />
        <Nav />
      </div>
    );
  }
}

export { View as default };
