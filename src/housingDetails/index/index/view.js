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
import { Carousel, } from "antd-mobile";
import fetch from "srcDir/common/ajax/indexWithBody";

import store from "store2";
const customerid = store.get("customerId");
const productid = store.get("product_id");
// import history from "srcDir/common/router/history";
// import { Carousel, InputItem, Picker, List, DatePicker, TextareaItem, Toast } from "antd-mobile";
// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: false
    };
    // console.log(props, 2222);
    this.getData = this.getData.bind(this);
    this.collection = this.collection.bind(this);
  }
  componentDidMount() {
    this.getData();
  }
  getData() {
    const _this = this;
    fetch({
      // url: "/wx/account/login",
      // url: `${configURL.remoteServer.urlHome} + "/wechat-house/list"`,
      url: "/wechat-house/get",
      method: "POST",
      entity: {
        customer_id: customerid,
        product_id: productid
      },
      success(res) {
        console.log(res, 13413214);
        // if (res.entity) {
        //   history.push("/homepage");
        // }
        // if () {
        // _this.setData(_this, res.entity.content, res.entity.content.lenght - 1);
        // }
        if (res.entity.success) {
          _this.setState({
            data: res.entity.data
          });
        }
      }
    });
  }
  collection(e) {
    const _this = this;
    let url;
    if (e) {
      url = "/wechat-favorite/add";
    } else {
      url = "/wechat-favorite/delete";
    }
    fetch({
      // url: "/wx/account/login",
      // url: `${configURL.remoteServer.urlHome} + "/wechat-house/list"`,
      url,
      method: "POST",
      entity: {
        customer_id: customerid,
        product_id: productid,
        product_type: e,
      },
      success(res) {
        // console.log(res, 13413214);
        // if (res.entity) {
        //   history.push("/homepage");
        // }
        // if () {
        // _this.setData(_this, res.entity.content, res.entity.content.lenght - 1);
        // }
        if (res.entity.success) {
          _this.setState({
            data: res.entity.data
          });
        }
      }
    });
  }
  render() {
    const { data } = this.state;
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
              <div onClick={() => this.collection(data.housetype_id)}>收藏</div>
            </div>
          </div>
        }
      </div>
    );
  }
}
export { View as default };
