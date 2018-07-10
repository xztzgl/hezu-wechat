import React from "react";
// import ReactDOM from "react-dom";


// import { Tabs, ListView, } from "antd-mobile";
import { Tabs, ListView, Picker, List, Modal, } from "antd-mobile";
// import { StickyContainer, Sticky } from "react-sticky";
// import history from "srcDir/common/router/history";
// import store from "store2";
import fetch from "srcDir/common/ajax/indexWithBody";
// import fetchUpload from "srcDir/common/ajax/upload";
import Nav from "srcDir/common/viewform/navigation/index";
import history from "srcDir/common/router/history";
import { createForm } from "rc-form";
import styles from "./style.less";
import store from "store2";
const imgHeader = require("srcDir/images/my_m@3x.png");
const loader = store.get("Authorization");
const alert = Modal.alert;
// let pageIndex = 0;
const getName = (code) => {
  const codeMap = store.session.get("codeMap");
  let data;
  if (codeMap) {
    const arry = codeMap.filter(v => v.code === code);
    data = arry.length > 0 ? arry[0].value : "";
  }
  return data || [];
};

// city();
const getDistrictName = (code) => {
  const district = store.session.get("district");
  let data;
  if (district) {
    const arry = district.filter(v => v.disp_local_id === code);
    // console.log(arry, 1111);
    data = arry.length > 0 ? arry[0].local_name : "";
  }
  return data || [];
};
// const district = store.session.get("district");
// const district = () => {
//   const data = store.session.get("district");
//   data.map(v => {
//     v.label = v.local_name;
//     v.value = v.disp_local_id;
//     // delete v.local_name;
//     // delete v.disp_local_id;
//     return true;
//   });
//   return data;
// };

const city = () => {
  const district = store.session.get("district");
  let dataName;
  if (district) {
    district.map(v => {
      v.label = v.local_name;
      v.value = v.disp_local_id;
      return true;
    });
    const first = district.filter(v => v.value === 1);
    const dd = (data) => {
      data.map(v => {
        const b = district.filter(va => va.pid === v.value);
        if (b.length > 0) {
          v.children = b;
          dd(b);
        }
        return true;
      });
      return data;
    };
    dd(first);
    dataName = [{ label: "全部", value: "" }].concat(first);
  }
  return dataName || [];
};
// console.log(district(), 1111111111);
// const codeMap = store.session.get("codeMap");
const getNamevalue = (pid) => {
  const codeMap = store.session.get("codeMap");
  if (codeMap) {
    const arryType = codeMap.filter(v => v.pid === pid);
    arryType.map(v => {
      v.label = v.value;
      v.value = v.code;
      delete v.code;
      return true;
    });
    return arryType;
  }
};
const TabPane = Tabs.TabPane;
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
    let url;
    if (num === 1) {
      url = "/wechat-house/list";
    } else {
      url = "//wechat-person/list";
    }
    if (data.district_id) {
      const arr = data.district_id.split(",");
      data.district_id = arr[arr.length - 1] + "";
    }
    fetch({
      // url: "/wx/account/login",
      // url: `${configURL.remoteServer.urlHome} + "/wechat-house/list"`,
      url, // : "/wechat-house/list",
      method: "POST",
      entity: Object.assign(data, { limit: "10" }),
      // entity: {
      //   district_id: "1212",
      //   housetype_id: "20301",
      //   limit: "10",
      //   page: `${_this.state.page}`,
      //   rental_id: "20402"
      // },
      success(res) {
        // console.log(11);
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
    this.props.form.resetFields();
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
  detail(id) {
    // store.set("product_id", id);
    history.push("/housingDetails", {
      id
    });
  }
  render() {
    const { data, dataroommates } = this.state;
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.body}>
        <div className={styles.search}>
          <div className="search-s">
            <div>
              <Picker
                extra="按片区"
                data={city()}
                // cols={1}
                {...getFieldProps("district_id")}
                onOk={() => this.getFormValues()}
              >
                <List.Item arrow="horizontal">按片区</List.Item>
              </Picker>
            </div>
            <div>
              <Picker
                extra="按户型"
                data={getNamevalue(10003)}
                cols={1}
                {...getFieldProps("housetype_id")}
                onOk={() => this.getFormValues()}
              >
                <List.Item arrow="horizontal">按户型</List.Item>
              </Picker>
            </div>
            <div>
              <Picker
                extra="按价格"
                data={getNamevalue(10004)}
                cols={1}
                {...getFieldProps("rental_id")}
                onOk={() => this.getFormValues()}
              >
                <List.Item arrow="horizontal">按价格</List.Item>
              </Picker>
            </div>
          </div>
        </div>
        <Tabs
          defaultActiveKey="1"
          className="tabs-body"
          swipeable={!true}
          onChange={this.callback}
        // className={styles.tabss}
        >
          <TabPane key="1" tab="搜房源" >
            <div style={{ backgroundColor: "#fff", padding: "100px 0 60px 0" }} onTouchEnd={this.onScroll} onTouchMove={this.onTouchMove}>
              {data.length > 0 && data.map((v, i) => <div
                key={i}
                className={styles.detail}
                onClick={() => this.detail(v.id)}
              >
                <div className={styles.goods}>
                  <img src={v.image_id.split(",")[0]} alt="icon" />
                  <div className={styles.Introduction}>
                    <div>
                      <div>{v.title}</div>
                    </div>
                    <div><span>{getName(v.housetype_id)}</span>-{getDistrictName(v.district_id)}-{v.house_name}</div>
                    <div><text>{v.rental}元</text><text>{getName(v.payment_id)}</text></div>
                  </div>
                </div>
              </div>)}
            </div>
          </TabPane>
          <TabPane key="2" tab="找人一起租">
            <div style={{ backgroundColor: "#fff", padding: "100px 0 60px 0" }} onTouchEnd={this.onScroll} onTouchMove={this.onTouchMove}>
              {dataroommates.length > 0 && dataroommates.map((v, i) => <div
                key={i}
                className={styles.detail}
              >
                <div className={styles.roommates}>
                  <div>
                    <img src={imgHeader} alt="icon" />
                  </div>
                  <div>
                    <div className={styles.introduction}>
                      <div className={styles.intro}>
                        <div>
                          <div>求合租</div>
                        </div>
                        <div><span>{getName(v.housetype_id)}</span>-{getDistrictName(v.district_id)}-{v.house_name}</div>
                        <div><text>{v.rental}元</text><text>{v.checkin_time.split(" ")[0]}</text></div>
                      </div>
                      <div>
                        <div onClick={() => this.load(v.username)}>
                          <div className="anticon-phone"></div>
                          <div>电话</div>
                        </div>
                      </div>
                    </div>
                    <div>{v.description}</div>
                  </div>
                </div>
              </div>)
              }
            </div>
          </TabPane>
        </Tabs>
        <Nav checked={1} />
      </div>
    );
  }
}
const TestWrapper = createForm()(View);
export { TestWrapper as default };
