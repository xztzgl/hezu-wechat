import React from "react";
// import ReactDOM from "react-dom";


// import { Tabs, ListView, } from "antd-mobile";
import { ListView, Modal, } from "antd-mobile";
// import { StickyContainer, Sticky } from "react-sticky";
// import store from "store2";
import fetch from "srcDir/common/ajax/indexWithBody";
// import fetchUpload from "srcDir/common/ajax/upload";
import Nav from "srcDir/common/viewform/navigation/index";
import history from "srcDir/common/router/history";
import { createForm } from "rc-form";
import styles from "./style.less";
import store from "store2";
// const imgHeader = require("srcDir/images/my_m@3x.png");
const loader = store.get("Authorization");
const alert = Modal.alert;
// let pageIndex = 0;

const customerid = store.get("customerId");
// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });

    this.state = {
      dataSource,
      length: -1,
      data: [],
      dataP: [],
      page: 0,
      // pageP: 0,
      dataroommates: [],
      refreshing: true,
      values: {},
      onTouchMove: true,
    };
    this.setData = this.setData.bind(this);
    this.onScroll = this.onScroll.bind(this);
    this.getFormValues = this.getFormValues.bind(this);
    this.callback = this.callback.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.detail = this.detail.bind(this);
  }
  componentWillMount() {
    this.setheight(this);
  }
  componentDidMount() {
    this.setData({
      page: "0",
    }, null, 1);
  }
  componentWillUnmount() {
  }
  onScroll() {
    const _this = this;
    $(window).scroll(function () {
      var scrollTop = $(this).scrollTop(); // 滚动条距离顶部的高度
      var scrollHeight = $(document).height();   // 当前页面的总高度
      var clientHeight = $(this).height();    // 当前可视的页面高度
      if (scrollTop + clientHeight >= scrollHeight && _this.state.onTouchMove) {   // 距离顶部+当前高度 >=文档总高度 即代表滑动到底部
        // 滚动条到达底部
        // alert(3);
        // console.log("dddd");
        _this.setState({
          onTouchMove: false,
        }, () => {
          _this.setData(Object.assign(_this.state.values, { page: `${_this.state.page}` }), null, _this.state.num);
        });
      } else if (scrollTop <= 0) {
        // 滚动条到达顶部
        // alert(4);
        // 滚动条距离顶部的高度小于等于0 TODO
      }
    });
  }
  onTouchMove() {
    this.setState({ touchMove: true });
  }
  setheight(_this) {
    const windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const heightDiv = windowH - 100 + "px";
    _this.setState({
      heightD: heightDiv
    });
  }
  setData(data, conditions, num) {
    const _this = this;
    fetch({
      // url: "/wx/account/login",
      // url: `${configURL.remoteServer.urlHome} + "/wechat-house/list"`,
      url: "/wechat-notice/list",
      method: "POST",
      entity: Object.assign(data, { limit: "10", customer_id: customerid }),
      // entity: {
      //   district_id: "1212",
      //   housetype_id: "20301",
      //   limit: "10",
      //   page: `${_this.state.page}`,
      //   rental_id: "20402"
      // },
      success(res) {
        _this.setState({
          onTouchMove: true,
        }, () => {
          if (conditions && res.entity.content) {
            if (num === 1) {
              _this.setState({
                data: [...res.entity.content],
                page: (res.entity.page * 1) + 1,
              });
            } else {
              _this.setState({
                dataroommates: [...res.entity.content],
                page: (res.entity.page * 1) + 1,
              });
            }
          } else if (res.entity.content) {
            // console.log(121212);
            if (num === 1) {
              _this.setState({
                data: [..._this.state.data, ...res.entity.content],
                page: res.entity.content.length > 0 ? (res.entity.page * 1) + 1 : _this.state.page,
              });
            } else {
              _this.setState({
                dataroommates: [..._this.state.dataroommates, ...res.entity.content],
                page: res.entity.content.length > 0 ? (res.entity.page * 1) + 1 : _this.state.page,
              });
            }
          }
        });
      }
    });
  }
  getFormValues() {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.limit = "0";
        const key = Object.keys(values);
        key.map(v => {
          if (typeof (values[v]) !== "string" && typeof (values[v]) !== "undefined") {
            values[v] = values[v].join(",");
          }
          return true;
        });
        this.setState({
          values,
        }, () => {
          this.setData(values, true, 1);
        });
      }
    });
  }
  callback(key) {
    if (key === "1") {
      this.setState({
        num: 1,
        page: 0,
      }, () => {
        this.setData({ page: "0" }, null, 1);
      });
    } else {
      this.setState({
        num: 2,
        page: 0,
      }, () => {
        this.setData({ page: "0" }, null, 2);
      });
    }
  }
  load(iphone) {
    // console.log(loader);
    if (loader && loader.length > 0) {
      alert(<div>{iphone}</div>, "现在就联系吗？", [
        { text: "再看看", onPress: () => { } },
        { text: <div><a href={`tel:${iphone}`}>马上联系</a></div>, onPress: () => { } },
      ]);
    } else {
      alert("尚未登录", "登录才能拨打电话", [
        { text: "取消", onPress: () => { } },
        { text: "确定", onPress: () => history.push("/login") },
      ]);
    }
  }
  detail(id, type) {
    if (type === "1") {
      history.push("/housing", {
        id
      });
    } else {
      history.push("/roommates", {
        id
      });
    }
  }
  render() {
    const { data, } = this.state;
    return (
      <div className={styles.body}>
        <div style={{ backgroundColor: "#fff", padding: "0 0 60px 0" }} onTouchEnd={this.onScroll} onTouchMove={this.onTouchMove}>
          {data.length > 0 && data.map((v, i) => <div
            key={i}
            className={styles.detail}
            onClick={() => this.detail(v.id, v.product_type)}
          >
            <div className={styles.myNews}>
              <div className="anticon-news">
                {/* <img src={imgHeader} alt="icon" /> */}
              </div>
              <div>
                {v.text}
              </div>
            </div>
          </div>)}
        </div>
        <Nav checked={1} />
      </div>
    );
  }
}
const TestWrapper = createForm()(View);
export { TestWrapper as default };
