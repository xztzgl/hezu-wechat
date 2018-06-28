/*
 * Created Date: Thursday June 21st 2018 5:21:28 pm
 * Author: gumingxing
 * -----
 * Last Modified:Tuesday June 26th 2018 3:06:19 pm
 * Modified By: gumingxing
 * -----
 * Copyright (c) 2018 MagCloud
 */

import React from "react";
import styles from "./style.less";
import { createForm } from "rc-form";
import { Carousel, InputItem, Picker, List, DatePicker, TextareaItem } from "antd-mobile";

// import history from "srcDir/common/router/history";
import TakePictures from "srcDir/common/viewform/takePictures/view";
import store from "store2";
import fetch from "srcDir/common/ajax/indexWithBody";
// import moment from "moment";
// const maxDate = moment("2016-12-03 +0800", "YYYY-MM-DD Z").utcOffset(8);
// const minDate = moment("2015-08-06 +0800", "YYYY-MM-DD Z").utcOffset(8);

const district = store.session.get("district");
district.map(v => {
  v.label = v.local_name;
  v.value = v.disp_local_id;
  delete v.local_name;
  delete v.disp_local_id;
  return true;
});

// const codeMap = store.session.get("codeMap");
const getName = (pid) => {
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

// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      promptText: "",
      imgdata: [],
      moneyfocused: false,
      areafocused: false,
    };
    this.getimg = this.getimg.bind(this);
    this.submit = this.submit.bind(this);
    // console.log(props, 2222);
  }
  componentDidMount() {
    // console.log(this.props.prompt, 888);
  }
  getimg(e) {
    // alert(111);
    const dd = [...this.state.imgdata, ...[e]];
    // console.log(dd, e);
    this.props.form.setFieldsValue({
      image_id: dd.join(","),
    });
    this.setState({
      imgdata: dd,
    });
  }
  submit() {
    // console.log(this.props.form, 11111);
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values, 12121); // /wechat-house/add
        const key = Object.keys(values);
        key.map(v => {
          if (typeof (values[v]) !== "string" && typeof (values[v]) !== "undefined") {
            values[v] = values[v].join(",");
          }
          return true;
        });
        fetch({
          // url: "/wx/account/login",
          // url: `${configURL.remoteServer.urlHome} + "/wechat-house/list"`,
          url: "/wechat-house/add",
          method: "POST",
          entity: values,
          success(res) {
            console.log(res, 13413214);
            // if () {
            // _this.setData(_this, res.entity.content, res.entity.content.lenght - 1);
            // }
          }
        });
      }
    });
  }
  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div className={styles.nav}>
        {
          this.state.imgdata.length > 0 &&
            <div>
              <Carousel
                className={styles.Carousel}
              // vertical
                dots={!false}
                dragging={false}
                swiping={false}
                autoplay
                infinite={this.state.imgdata.length !== 1}
            // speed={200}
            // autoplayInterval={300}
            // resetAutoplay={false}
              >
              {this.state.imgdata.map((type, index) => (
                <div key={index}><img src={type} alt="img" style={{ height: "200px", width: "100%" }} /></div>
              ))}
              </Carousel>
              {/* <InputItem {...getFieldProps("image_id")} value={this.state.imgdata.join(",")} placeholder="单行输入" style={{ display: "none" }} /> */}
            </div>
        }
        <InputItem
          {...getFieldProps("image_id", {
            rules: [{
              required: true,
              message: "请上传图片",
            }],
          })}
          value={this.state.imgdata.join(",")}
          placeholder="单行输入"
          style={{ display: "none" }}
        />
        <TakePictures getImg={this.getimg} />
        <div style={{ marginTop: 6 }}>
          <div className={`${styles.fromStyle} style`}>
            <div>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题</div><div><InputItem {...getFieldProps("title")} placeholder="单行输入" /></div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>片&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区</div>
            <div>
              <Picker data={district} cols={1} {...getFieldProps("district_id")} className="forss">
                <List.Item arrow="horizontal">片区</List.Item>
              </Picker>
            </div>
          </div>
          {/* <div className={`${styles.fromStyle} style`}>
            <div>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题</div><div><InputItem placeholder="单行输入" /></div>
          </div> */}
          <div className={`${styles.fromStyle} style`}>
            <div>小区名称</div><div><InputItem {...getFieldProps("house_name")} placeholder="单行输入" /></div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>合租类型</div>
            <div>
              <Picker data={getName(10005)} cols={1} {...getFieldProps("renttype_id")}>
                <List.Item arrow="horizontal">合租</List.Item>
              </Picker>
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>楼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;层</div>
            <div className="floor">
              <div>第<InputItem {...getFieldProps("floor_layer")} type="number" />层   公<InputItem type="number" {...getFieldProps("floor_total")} />层</div>
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>建筑面积</div>
            <div className="numberStyle">
              <InputItem
                {...getFieldProps("built_area", {
                  normalize: (v, prev) => {
                    if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                      if (v === ".") {
                        return "0.";
                      }
                      return prev;
                    }
                    return v;
                  },
                })}
                type="money"
                placeholder="房屋面积"
                onFocus={() => {
                  this.setState({
                    areafocused: false,
                  });
                }}
                focused={this.state.areafocused}
              >
                面积
              </InputItem>
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>租&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;金</div>
            <div className="numberStyle">
              <InputItem
                {...getFieldProps("rental", {
                  normalize: (v, prev) => {
                    if (v && !/^(([1-9]\d*)|0)(\.\d{0,2}?)?$/.test(v)) {
                      if (v === ".") {
                        return "0.";
                      }
                      return prev;
                    }
                    return v;
                  },
                })}
                type="money"
                placeholder="价格"
                onFocus={() => {
                  this.setState({
                    moneyfocused: false,
                  });
                }}
                focused={this.state.moneyfocused}
              >
                元/月
              </InputItem>
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</div>
            <div>
              <Picker data={getName(10001)} cols={1} {...getFieldProps("gender_id")} className="forss">
                <List.Item arrow="horizontal">性别</List.Item>
              </Picker>
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>入住时间</div>
            <div>
              <DatePicker
                mode="date"
                title="选择日期"
                extra="可选,小于结束日期"
                // format="YYYY-MM-DD"
                {...getFieldProps("checkin_time", {

                })}
                // minDate={minDate}
                // maxDate={maxDate}
              >
                <List.Item arrow="horizontal">日期(CST)</List.Item>
              </DatePicker>
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>朝&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;向</div>
            <div>
              <Picker data={getName(10006)} cols={1} {...getFieldProps("orientation_id")} className="forss">
                <List.Item arrow="horizontal">朝向</List.Item>
              </Picker>
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>装&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;修</div>
            <div>
              <Picker data={getName(10007)} cols={1} {...getFieldProps("decoration_id")} className="forss">
                <List.Item arrow="horizontal">装修</List.Item>
              </Picker>
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>支付方式</div>
            <div>
              <Picker data={getName(10008)} cols={1} {...getFieldProps("payment_id")} className="forss">
                <List.Item arrow="horizontal">支付方式</List.Item>
              </Picker>
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>信息可见</div>
            <div>
              <Picker data={getName(10009)} cols={1} {...getFieldProps("seentime_id")} className="forss">
                <List.Item arrow="horizontal">信息可见</List.Item>
              </Picker>
            </div>
          </div>
          <div className={`${styles.fromStyle} ${styles.textarea}`}>
            <div>描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述</div>
            <div>
              <TextareaItem
                {...getFieldProps("description")}
                // title="高度自适应"
                autoHeight
                rows={3}
                placeholder="描述"
              />
            </div>
          </div>
          <div className={styles.ggg} onClick={() => this.submit()}>发布</div>
        </div>
      </div>
    );
  }
}
const TestWrapper = createForm()(View);
export { TestWrapper as default };
