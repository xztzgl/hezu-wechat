/*
 * Created Date: Thursday June 21st 2018 5:21:28 pm
 * Author: gumingxing
 * -----
 * Last Modified:Sunday July 1st 2018 5:34:01 pm
 * Modified By: gumingxing
 * -----
 * Copyright (c) 2018 MagCloud
 */

import React from "react";
import styles from "./style.less";
// import Nav from "srcDir/common/viewform/navigation/index";
import { Carousel, Toast, Modal } from "antd-mobile";
import fetch from "srcDir/common/ajax/indexWithBody";
const alert = Modal.alert;
import store from "store2";
const customerid = store.get("customerId");
// const _this.state.id = store.get("product_id");
const getName = (code) => {
  const codeMap = store.session.get("codeMap");
  const arry = codeMap.filter(v => v.code === code);
  return arry.length > 0 ? arry[0].value : "";
};
const getArry = (pid) => {
  const codeMap = store.session.get("codeMap");
  const arryType = codeMap.filter(v => v.pid === pid);
  arryType.map(v => {
    v.label = v.value;
    v.value = v.code;
    delete v.code;
    return true;
  });
  return arryType;
};
const getColor = (data, code) => {
  const stutas = data ? data.includes(code) : false;
  // console.log(stutas, 111111);
  return stutas;
};
const fontName = [
  { label: "电视", value: "anticon-tv" },
  { label: "冰箱", value: "anticon-refrigerator" },
  { label: "洗衣机", value: "anticon-washing" },
  { label: "空调", value: "anticon-air" },
  { label: "热水器", value: "anticon-water" },
  { label: "床", value: "anticon-bed" },
  { label: "暖气", value: "anticon-heating" },
  { label: "宽带", value: "anticon-broadband" },
  { label: "衣柜", value: "anticon-wardrobe" },
  { label: "天然气", value: "anticon-natural" },
];
const getClassName = (value) => {
  const classname = fontName.filter(v => v.label === value);
  return classname.length > 0 ? classname[0].value : "";
};
// import history from "srcDir/common/router/history";
// import { Carousel, InputItem, Picker, List, DatePicker, TextareaItem, Toast } from "antd-mobile";
// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false,
      customerMobile: "",
      favorited: false,
    };
    // console.log(props, 2222);
    this.getData = this.getData.bind(this);
    this.collection = this.collection.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }
  componentDidMount() {
    // console.log(this.props, 1111111);
    const id = this.props.router.history.location.state;
    this.getData(id.id);
  }
  getData(id) {
    const _this = this;
    fetch({
      url: "/wechat-house/get",
      method: "POST",
      entity: {
        customer_id: customerid + "",
        product_id: id + ""
      },
      success(res) {
        if (res.entity.success) {
          _this.setState({
            data: res.entity.data,
            // customerMobile: res.entity.customer_mobile,
            favorited: res.entity.favorited,
            id
          });
        }
      }
    });
  }
  collection(e) {
    const _this = this;
    let url;
    if (!this.state.favorited) {
      url = "/wechat-favorite/add";
    } else {
      url = "/wechat-favorite/delete";
    }
    fetch({
      url,
      method: "POST",
      entity: {
        customer_id: customerid,
        product_id: _this.state.id,
        product_type: e,
      },
      success(res) {
        if (res.entity.success) {
          _this.setState({
            favorited: !_this.state.favorited,
          });
          // console.log(res);
        }
      }
    });
  }
  subscribe() {
    const _this = this;
    fetch({
      url: "/wechat-order/order",
      // url: `${configURL.remoteServer.urlHome} + "/wechat-house/list"`,
      // url,
      method: "POST",
      entity: {
        customer_id: customerid,
        product_id: _this.state.id,
        // product_type: e,
      },
      success(res) {
        const data = res.entity;
        if (data.success) {
          if (data.customer_mobile.length > 0) {
            alert(<div>{data.customer_mobile}</div>, "现在就联系吗？", [
              { text: "再看看", onPress: () => { } },
              { text: <div><a href={`tel:${data.customer_mobile}`}>马上联系</a></div>, onPress: () => { } },
            ]);
          } else {
            Toast.success("预约成功，房主设置两小时后才能联系他/她", 1.5);
          }
        }
        // console.log(res, 123123123);
      }
    });
  }
  render() {
    const { data, favorited } = this.state;
    return (
      <div>
        {
          data && <div>
            <Carousel
              className={styles.Carousel}
              // vertical
              dots={!false}
              dragging={false}
              swiping={false}
              autoplay
            // infinite={this.state.imgdata.length !== 1}
            // speed={200}
            // autoplayInterval={300}
            // resetAutoplay={false}
            >
              {
                data.image_id.split(",").map((v, i) => <div key={i}><img src={v} alt="img" style={{ height: "200px", width: "100%" }} /></div>)
              }
            </Carousel>
            <div className={styles.title}>
              <div>{data.title}</div>
              <div onClick={() => this.collection("1")} style={favorited ? { color: "#fdce01" } : {}}>
                <div className={favorited ? "anticon-collection-all" : "anticon-collection"}></div>
                <div>收藏</div>
              </div>
            </div>
            <div className={styles.roomPriceSize}>
              <div>
                <span>房租：</span>
                <span>{data.rental}元/月</span>
              </div>
              <div></div>
              <div>
                <span>房型：</span>
                <span>{getName(data.housetype_id)}</span>
              </div>
              <div></div>
              <div>
                <span>面积：</span>
                <span>{data.built_area}M²</span>
              </div>
            </div>
            <div className={styles.roomDetail}>
              <div>
                <span>发布：</span>
                <span>{data.create_time ? data.create_time.split(" ")[0] : ""}</span>
              </div>
              <div>
                <span>入住：</span>
                <span>{data.checkin_time ? data.checkin_time.split(" ")[0] : ""}</span>
              </div>
              {/* <div>
                <span>租期</span>
                <span>没有数据</span>
              </div>
              <div>
                <span>看房</span>
                <span>没有数据</span>
              </div> */}
              <div>
                <span>楼层：</span>
                <span>{data.floor_layer / data.floor_layer}层</span>
              </div>
              {/* <div>
                <span>电梯</span>
                <span></span>
              </div>
              <div>
                <span>用电</span>
                <span></span>
              </div>
              <div>
                <span>用水</span>
                <span></span>
              </div>
              <div>
                <span>采暖</span>
                <span></span>
              </div> */}
              <div>
                <span>朝向：</span>
                <span>{getName(data.orientation_id && (data.orientation_id * 1))}</span>
              </div>
              <div>
                <span>小区：</span>
                <span>{data.house_name}</span>
              </div>
              <div>
                <span>支付：</span>
                <span>{getName(data.payment_id)}</span>
              </div>
            </div>

            <div className={styles.fa}>
              <div>房源简介</div>
              <div className={styles.facilities}>
                {
                  getArry(10014).map((v, i) => <div key={i} style={getColor(data.infrastructure_id, v.value) ? { color: "green" } : {}}>
                    <div className={getClassName(v.label)}></div>
                    <div>{v.label}</div>
                  </div>)
                }
              </div>
            </div>
            {/* <div className={styles.contact}>
              <div>联系方式</div>
              <div>{customerMobile}</div>
            </div> */}

            <div className={styles.describe}>
              <div>描述</div>
              <div>{data.description}</div>
            </div>
            <div className={styles.submit} onClick={() => this.subscribe()}>
               预约
            </div>
          </div>
        }
      </div>
    );
  }
}
export { View as default };
