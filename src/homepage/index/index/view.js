import React from "react";
// import ReactDOM from "react-dom";


import { Tabs, RefreshControl, ListView } from "antd-mobile";
// import { StickyContainer, Sticky } from "react-sticky";
// import history from "srcDir/common/router/history";
// import store from "store2";
import fetch from "srcDir/common/ajax/indexWithBody";
// import fetchUpload from "srcDir/common/ajax/upload";
import Nav from "srcDir/common/viewform/navigation/index";
// import ListView from "srcDir/common/viewform/ListView/index";
// const userType = store.get("userType");
// import navigatorGeolocation from "srcDir/common/navigatorGeolocation";
import styles from "./style.less";
import store from "store2";
// const configURL = require("srcRootDir/webpack-config/base/url.config.js");
// navigatorGeolocation();
// const banner = require("srcDir/images/homepage-banner.png");

// const verify = () => {
//   history.push("/verify");
// };
// const myCenter = () => {
//   history.push("/myCenter");
// };
// console.log("FFFFFF");
// const data = [
//   {
//     img: "https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png",
//     title: "Meet hotel",
//     des: "不是所有的兼职汪都需要风吹日晒",
//   },
//   {
//     img: "https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png",
//     title: "McDonald\"s invites you",
//     des: "不是所有的兼职汪都需要风吹日晒",
//   },
//   {
//     img: "https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png",
//     title: "Eat the week",
//     des: "不是所有的兼职汪都需要风吹日晒",
//   },
// ];
// let index = data.length - 1;
const codeMap = store.session.get("codeMap");
const district = store.session.get("district");
const NUM_ROWS = 6;
// let pageIndex = 0;
const getName = (code) => {
  const arry = codeMap.filter(v => v.code === code);
  return arry[0].value;
};
const getDistrictName = (code) => {
  const arry = district.filter(v => v.disp_local_id === code);
  return arry[0].local_name;
};
function genData(pIndex = 0) {
  const dataArr = [];
  for (let i = 0; i < NUM_ROWS; i++) {
    dataArr.push(`row - ${(pIndex * NUM_ROWS) + i}`);
  }
  return dataArr;
}
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
      refreshing: true,
      height: document.documentElement.clientHeight,
    };
    this.onScroll = this.onScroll.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    this.crollingComplete = this.crollingComplete.bind(this);
    this.setData = this.setData.bind(this);
  }
  componentWillMount() {
    this.setheight(this);
  }
  componentDidMount() {
    const _this = this;
    fetch({
      // url: "/wx/account/login",
      // url: `${configURL.remoteServer.urlHome} + "/wechat-house/list"`,
      url: "/wechat-house/list",
      method: "POST",
      entity: {
        district_id: "1212",
        housetype_id: "20301",
        limit: "10",
        page: "0",
        rental_id: "20402"
      },
      success(res) {
        // console.log(res, 13413214);
        // if () {
        _this.setData(_this, res.entity.content, res.entity.content.lenght - 1);
        // }
      }
    });
    // navigatorGeolocation();
    // Set the appropriate height
    setTimeout(() => this.setState({
      height: this.state.height - 100,
    }), 0);

    // handle https://github.com/ant-design/ant-design-mobile/issues/1588
    // this.lv.getInnerViewNode().addEventListener("touchstart", this.ts = (e) => {
    //   this.tsPageY = e.touches[0].pageY;
    // });
    // // In chrome61 `document.body.scrollTop` is invalid
    // const scrollNode = document.scrollingElement ? document.scrollingElement : document.body;
    // this.lv.getInnerViewNode().addEventListener("touchmove", this.tm = (e) => {
    //   this.tmPageY = e.touches[0].pageY;
    //   if (this.tmPageY > this.tsPageY && this.scrollerTop <= 0 && scrollNode.scrollTop > 0) {
    //     console.log("start pull to refresh");
    //     this.domScroller.options.preventDefaultOnTouchMove = false;
    //   } else {
    //     this.domScroller.options.preventDefaultOnTouchMove = undefined;
    //   }
    // });
  }
  // componentWillUnmount() {
  //   this.lv.getInnerViewNode().removeEventListener("touchstart", this.ts);
  //   this.lv.getInnerViewNode().removeEventListener("touchmove", this.tm);
  // }
  onScroll(e) {
    this.scrollerTop = e.scroller.getValues().top;
    this.domScroller = e;
  }
  onRefresh() {
    // console.log("onRefresh");
    if (!this.manuallyRefresh) {
      this.setState({ refreshing: true });
    } else {
      this.manuallyRefresh = false;
    }

    // simulate initial Ajax
    setTimeout(() => {
      this.rData = genData();
      // console.log(this.rData, this.state.dataSource, "99999");
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        refreshing: false,
        showFinishTxt: true,
      });
      if (this.domScroller) {
        this.domScroller.scroller.options.animationDuration = 500;
      }
    }, 600);
  }

  onEndReached() {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    console.log("reach end", this.state.isLoading, !this.state.hasMore);
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = [...this.rData];
      // this.rData = [];
      // console.log(this.state.dataSource, "8888");
      // console.log(this.state.dataSource.cloneWithRows(this.rData), "00000");

      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  }
  setheight(_this) {
    const windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const heightDiv = windowH - 100 + "px";
    _this.setState({
      heightD: heightDiv
    });
  }
  setData(_this, data, index) {
    _this.setState({
      data,
      index,
      isLoading: true
    });
  }
  crollingComplete() {
    // In general, this.scrollerTop should be 0 at the end, but it may be -0.000051 in chrome61.
    if (this.scrollerTop >= -1) {
      this.setState({ showFinishTxt: false });
    }
  }
  callback(key) {
    console.log(key);
  }
  renderCustomIcon() {
    return [
      <div key="0" className="am-refresh-control-pull">
        <span>{this.state.showFinishTxt ? "刷新完毕" : "下拉可以刷新"}</span>
      </div>,
      <div key="1" className="am-refresh-control-release">
        <span>松开立即刷新</span>
      </div>,
    ];
  }
  render() {
    const { data, length } = this.state;
    let index = length;
    const separator = (sectionID, rowID) => (
      <div
        key={`${sectionID}-${rowID}`}
        style={{
          backgroundColor: "#F5F5F9",
          height: 8,
          borderTop: "1px solid #ECECED",
          borderBottom: "1px solid #ECECED",
        }}
      />
    );
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      // console.log(obj);
      return (
        <div
          key={rowID}
        >
          {/* <div style={{ height: "1rem", lineHeight: "1rem", color: "#888", fontSize: "0.36rem", borderBottom: "1px solid #ddd" }}>
            {obj.title}
          </div> */}
          <div className={styles.goods}>
            <img src={obj && obj.image_id.split(",")[0]} alt="icon" />
            <div className={styles.Introduction}>
              <div>
                <div>{obj && obj.title}</div>
              </div>
              <div><span>{obj && getName(obj.housetype_id)}</span>-{obj && getDistrictName(obj.district_id)}-{obj && obj.house_name}</div>
              <div><text>{obj && obj.rental}元</text><text>{obj && getName(obj.payment_id)}</text></div>
            </div>
          </div>
        </div>
      );
    };
    const roommates = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const obj = data[index--];
      // console.log(obj);
      return (
        <div
          key={rowID}
        >
          <div className={styles.roommates}>
            <div>
              <img src={obj.img} alt="icon" />
            </div>
            <div>
              <div className={styles.introduction}>
                <div className={styles.intro}>
                  <div>
                    <div>{obj.des}测试的</div>
                  </div>
                  <div><span>{rowID}</span> 元/任务</div>
                  <div><text>1000元</text><text>押一付一</text></div>
                </div>
                <div>
                  <div>1212</div>
                  <div>32432</div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      );
    };

    // console.info("home/index/index");
    const { addRoute } = this.props.router || {};
    console.log(addRoute);
    return (
      <div className={styles.body}>
        <Tabs
          defaultActiveKey="1"
          className="tabs-body"
          swipeable={!true}
          onChange={this.callback}
        // className={styles.tabss}
        >
          <TabPane key="1" tab="测试" >
            <div style={{ height: this.state.heightD, backgroundColor: "#fff", overflow: "hidden" }}>
              <ListView
                refs={e => { this.lv = e; }}
                dataSource={this.state.dataSource}
                // renderHeader={() => <span>Pull to refresh</span>}
                renderFooter={() => (<div style={{ padding: "0.3rem", textAlign: "center" }}>
                  {this.state.data.lenght < 1 ? "加载中..." : "加载完毕"}
                </div>)}
                renderRow={row}
                renderSeparator={separator}
                initialListSize={5}
                pageSize={5}
                style={{
                  height: this.state.height,
                  border: "1px solid #ddd",
                  margin: "0.1rem 0",
                }}
                scrollerOptions={{ scrollbars: true, scrollingComplete: this.scrollingComplete }}
                refreshControl={<RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                  icon={this.renderCustomIcon()}
                />}
                onScroll={this.onScroll}
                scrollRenderAheadDistance={200}
                scrollEventThrottle={20}
                // onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
              />
            </div>
          </TabPane>
          <TabPane key="2" tab="测试">
            <div style={{ height: this.state.heightD, backgroundColor: "#fff", overflow: "hidden" }}>
              <ListView
                ref="ld"
                dataSource={this.state.dataSource}
                // renderHeader={() => <span>Pull to refresh</span>}
                renderFooter={() => (<div style={{ padding: "0.3rem", textAlign: "center" }}>
                  {this.state.isLoading ? "加载中..." : "加载完毕"}
                </div>)}
                renderRow={roommates}
                renderSeparator={separator}
                initialListSize={5}
                pageSize={5}
                style={{
                  height: this.state.height,
                  border: "1px solid #ddd",
                  margin: "0.1rem 0",
                }}
                scrollerOptions={{ scrollbars: true, scrollingComplete: this.scrollingComplete }}
                refreshControl={<RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this.onRefresh}
                  icon={this.renderCustomIcon()}
                />}
                onScroll={this.onScroll}
                scrollRenderAheadDistance={200}
                scrollEventThrottle={20}
                // onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
              />
            </div>
          </TabPane>
        </Tabs>
        <Nav />
      </div>
    );
  }
}
export { View as default };
