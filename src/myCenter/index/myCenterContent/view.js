import React from "react";
import { Icon } from "antd-mobile";
import history from "srcDir/common/router/history";
import styles from "./style.less";
import store from "store2";
import fetch from "srcDir/common/ajax/indexWithBody";
// 创建react组件
const imgHeader = require("srcDir/images/my_m@3x.png");
const customerId = store.get("customerId");
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
    this.showOrderList = this.showOrderList.bind(this);
    // console.log(props, 2222);
  }
  componentDidMount() {
    // console.log(this.props.prompt, 888);
    // /wx/user/selfPage
    const _this = this;
    // let url;
    // let method;
    // if (userType === "U_001_03") {
    //   url = "/wx/enterprise/info/view";
    //   method = "GET";
    // } else {
    //   url = "/wx/user/selfPage";
    //   method = "POST";
    // }
    const url = "/wechat-my/customer";
    const method = "POST";
    fetch({
      url: url,
      method: method,
      entity: {
        customer_id: customerId
      },
      // params: {
      //   phoneNumber: phonelength,
      // },
      success(res) {
        const data = res.entity.data;
        _this.setState({
          data: data
        });
      }
    });
  }
  // login() {
  //   history.push("/login");
  // }
  // personalSettings(data) { // personalSettings 个人设置
  //   if (userType === "U_001_03") {
  //     history.push("/registration");
  //   } else {
  //     store.set("person", data);
  //     history.push("/myCenter/personalSettings");
  //   }
  // }
  showOrderList(defaultKey) {
    history.push("/orderList/", {
      defaultKey,
    });
  }
  // certification() {
  //   if (this.state.data.verified) {
  //     history.push("/myCenter/verified");
  //   } else {
  //     history.push("/myCenter/certification");
  //   }
  //   // history.push("/myCenter/certification");
  // }
  myrelease() {
    // console.log(11);
    history.push("/release");
  }
  render() {
    // console.log(this.props);
    return (
      <div className={styles.bg}>
        <div className={styles.header}>
          <div>
            <div className={styles.avatar}>
              <img src={(this.state.data && this.state.data.avatar) ? this.props.state.avatar : imgHeader} alt="" />
            </div>
          </div>
          <div>
            <div>
              <span>
                <span>用户名 {this.state.data && this.state.data.username}</span>
                <span>积分 {this.state.data && this.state.data.score || 0}</span>
              </span>
              {
                /*
              <span><Icon type="right" /></span>
                 */
              }
            </div>
          </div>
        </div>
        {/* 头部*/}

        {
          /*
        <div className={styles.navCenter}>
          <ul>
            <li onClick={() => this.showOrderList("2")} role="presentation">
              待付款
              {(this.props.data && (this.props.data.countOfWaitPay) * 1 > 0) ? <i>{this.props.data.countOfWaitPay}</i> : ""}
            </li>
            <li onClick={() => this.showOrderList("3")} role="presentation">待体检</li>
            <li onClick={() => this.showOrderList("4")} role="presentation">退款</li>
            <li onClick={() => this.showOrderList("1")} role="presentation">全部订单</li>
          </ul>
        </div>
           */
        }
        {/* 导航部分*/}

        <div className={styles.documentsAndCustomerService}>
          <div onTouchEnd={() => { this.showOrderList("1"); }}>
            <span className={styles.healthCertificate}><i>我的订单</i></span>
            <span><Icon type="right" /></span>
          </div>
          <div onTouchEnd={() => { this.electronicHealthCertificate(); }}>
            <span className={styles.healthCertificate}><i>我的消息</i></span>
            <span><Icon type="right" /></span>
          </div>
          <div onTouchEnd={() => { this.electronicHealthCertificate(); }}>
            <span className={styles.healthCertificate}><i>我的收藏</i></span>
            <span><Icon type="right" /></span>
          </div>
          <div onTouchEnd={() => { this.myrelease(); }}>
            <span className={styles.healthCertificate}><i>我的发布</i></span>
            <span><Icon type="right" /></span>
          </div>
          {
            /*
          <div onTouchEnd={() => { this.electronicHealthCertificate(); }}>
            <span className={styles.healthCertificate}><i>电子健康证</i></span>
            <span><Icon type="right" /></span>
          </div>
             */
          }
          {/*
            <div>
              <span className={styles.collectionOfHealthCertificates}><i>收藏的健康证</i></span>
              <span><Icon type="right" /></span>
            </div>
          */}
          {
            /*
          <div onTouchEnd={() => { this.certification(); }}>
            <span className={styles.identity}><i>身份认证</i><i>{(this.props.data && this.props.data.verified) ? "已认证" : "未认证，立即认证"}</i></span>
            <span><Icon type="right" /></span>
          </div>
          <div>
            <span className={styles.customerService}><i>联系客服<a href="tel:4008008811">4008008811</a></i></span>
            <span><Icon type="right" /></span>
          </div>
             */
          }
        </div>
      </div>
    );
  }
}
export { View as default };
