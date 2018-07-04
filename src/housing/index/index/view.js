/*
 * Created Date: Thursday June 21st 2018 5:21:28 pm
 * Author: gumingxing
 * -----
 * Last Modified:Friday June 29th 2018 5:14:22 pm
 * Modified By: gumingxing
 * -----
 * Copyright (c) 2018 MagCloud
 */

import React from "react";
import styles from "./style.less";
import { createForm } from "rc-form";
import { Carousel, InputItem, Picker, List, DatePicker, TextareaItem, Toast } from "antd-mobile";

import history from "srcDir/common/router/history";
import TakePictures from "srcDir/common/viewform/takePictures/view";
import store from "store2";
import fetch from "srcDir/common/ajax/indexWithBody";
// import moment from "moment";
// const maxDate = moment("2016-12-03 +0800", "YYYY-MM-DD Z").utcOffset(8);
// const minDate = moment("2015-08-06 +0800", "YYYY-MM-DD Z").utcOffset(8);

const city = () => {
  const district = store.session.get("district");
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
  return first;
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
const objKey = (value) => {
  const arry = Object.keys(value).length > 0;
  // console.log(value, Object.keys(value), 1111111);
  return arry;
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
      renttype: "",
      renttypeArry: [],
      values: {},
      // renttype: "",
    };
    this.getimg = this.getimg.bind(this);
    this.submit = this.submit.bind(this);
    this.checkBox = this.checkBox.bind(this);
    // console.log(props, 2222);
  }
  componentDidMount() {
    // console.log(this.props.prompt, 888);
    // this.props.form.setFields({
    //   infrastructure_id: {
    //     // value: values.user,
    //     errors: [new Error("请选择配套设施")],
    //   },
    // });
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
        if (values.checkin_time) {
          const date = new Date(values.checkin_time._d);
          values.checkin_time = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        }
        const key = Object.keys(values);
        key.map(v => {
          if (typeof (values[v]) !== "string" && typeof (values[v]) !== "undefined") {
            values[v] = values[v].join(",");
          }
          return true;
        });
        // console.log(values, 111);
        fetch({
          // url: "/wx/account/login",
          // url: `${configURL.remoteServer.urlHome} + "/wechat-house/list"`,
          url: "/wechat-house/add",
          method: "POST",
          entity: values,
          success(res) {
            // console.log(res, 13413214);
            if (res.entity) {
              history.push("/homepage");
            }
            // if () {
            // _this.setData(_this, res.entity.content, res.entity.content.lenght - 1);
            // }
          }
        });
      } else {
        // console.log(err, 1111);
        this.setState({
          values,
        });
        Toast.info(Object.values(err)[0].errors[0].message, 1.5);
      }
    });
  }
  checkBox(e, value) {
    // splice
    // console.log(e, 1111);
    const ele = e.target.parentElement;
    const a = this.state.renttypeArry;
    const index = a.indexOf(value);
    let arry;
    if (index > -1) {
      a.splice(index, 1);
      ele.style.color = "";
      arry = a;
    } else {
      ele.style.color = "green";
      arry = [...this.state.renttypeArry, ...[value]];
    }
    // console.log(arry, arry.join(","), index);
    this.setState({
      renttypeArry: arry,
      renttype: arry.join(","),
    });
    // this.props.form.setFieldsValue({
    //   infrastructure_id: arry.join(",")
    // });
  } // checkBox
  render() {
    const { getFieldProps } = this.props.form;
    const { renttype } = this.state;
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
          style={{ display: "none" }}
        />
        <TakePictures getImg={this.getimg} />
        <div style={{ marginTop: 6 }}>
          <div className={`${styles.fromStyle} style`}>
            <div>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题</div>
            <div>
              <InputItem
                error={objKey(this.state.values) ? !this.state.values.title : false}
                {...getFieldProps("title", {
                  // initialValue: objKey(this.state.values) ? "请输入标题" : "",
                  rules: [{
                    required: true,
                    message: "请输入标题",
                  }],
                })}
                placeholder="请输入标题"
              />
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>片&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;区</div>
            <div>
              <Picker
                data={city()}
                // cols={1}
                {...getFieldProps("district_id", {
                  rules: [{
                    required: true,
                    message: "请选择片区",
                  }],
                })}
              >
                <List.Item arrow="horizontal">片区</List.Item>
              </Picker>
            </div>
          </div>
          {/* <div className={`${styles.fromStyle} style`}>
            <div>标&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;题</div><div><InputItem placeholder="单行输入" /></div>
          </div> */}
          <div className={`${styles.fromStyle} style`}>
            <div>小区名称</div>
            <div>
              <InputItem
                {...getFieldProps("house_name", {
                  rules: [{
                    required: true,
                    message: "请输入小区名称",
                  }],
                })}
                placeholder="请输入小区名称"
              />
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>合租类型</div>
            <div>
              <Picker
                data={getName(10005)}
                cols={1}
                {...getFieldProps("renttype_id", {
                  rules: [{
                    required: true,
                    message: "请选择合租类型",
                  }],
                })}
              >
                <List.Item arrow="horizontal">合租</List.Item>
              </Picker>
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>楼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;层</div>
            <div className="floor">
              <div>
                第<InputItem
                  {...getFieldProps("floor_layer", {
                    rules: [{
                      required: true,
                      message: "请输入所在楼层",
                    }],
                  })}
                  type="number"
                />层   公
                <InputItem
                  type="number"
                  {...getFieldProps("floor_total", {
                    rules: [{
                      required: true,
                      message: "请输入楼层总数",
                    }],
                  })}
                />层
              </div>
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
                  rules: [{
                    required: true,
                    message: "请输入建筑面积",
                  }],
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
                  rules: [{
                    required: true,
                    message: "请输入租金",
                  }],
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
          <div className={`${styles.fromStyle} ${styles.textarea}`}>
            <div>配套设施</div>
            <div>
              <input
                style={{ display: "none" }}
                {...getFieldProps("infrastructure_id", {
                  initialValue: renttype,
                  rules: [{
                    required: true,
                    message: "请选择配套设施",
                  }],
                })}
                // value={this.state.renttype}
              />
              <div className={styles.facilities}>
                {
                  getName(10014).map((v, i) => <div key={i} onClick={(e) => this.checkBox(e, v.value)}>
                    <div className={getClassName(v.label)}></div>
                    <div>{v.label}</div>
                  </div>)
                }
              </div>
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>户&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;型</div>
            <div>
              <Picker
                data={getName(10003)}
                cols={1}
                {...getFieldProps("housetype_id", {
                  rules: [{
                    required: true,
                    message: "请选择户型",
                  }],
                })}
              >
                <List.Item arrow="horizontal">户型</List.Item>
              </Picker>
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</div>
            <div>
              <Picker
                data={getName(10001)}
                cols={1}
                {...getFieldProps("gender_id", {
                  rules: [{
                    required: true,
                    message: "请选择性别",
                  }],
                })}
              >
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
                // extra="可选,小于结束日期"
                // format="YYYY-MM-DD"
                {...getFieldProps("checkin_time", {
                  rules: [{
                    required: true,
                    message: "请选择入住时间",
                  }],
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
              <Picker
                data={getName(10006)}
                cols={1}
                {...getFieldProps("orientation_id", {
                  rules: [{
                    required: true,
                    message: "请选择朝向",
                  }],
                })}
              >
                <List.Item arrow="horizontal">朝向</List.Item>
              </Picker>
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>装&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;修</div>
            <div>
              <Picker
                data={getName(10007)}
                cols={1}
                {...getFieldProps("decoration_id", {
                  rules: [{
                    required: true,
                    message: "请选择装修",
                  }],
                })}
              >
                <List.Item arrow="horizontal">装修</List.Item>
              </Picker>
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>支付方式</div>
            <div>
              <Picker
                data={getName(10008)}
                cols={1}
                {...getFieldProps("payment_id", {
                  rules: [{
                    required: true,
                    message: "请选择支付方式",
                  }],
                })}
              >
                <List.Item arrow="horizontal">支付方式</List.Item>
              </Picker>
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>信息可见</div>
            <div>
              <Picker
                data={getName(10009)}
                cols={1}
                {...getFieldProps("seentime_id", {
                  rules: [{
                    required: true,
                    message: "请选择信息可见",
                  }],
                })}
              >
                <List.Item arrow="horizontal">信息可见</List.Item>
              </Picker>
            </div>
          </div>
          <div className={`${styles.fromStyle} ${styles.textarea}`}>
            <div>描&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;述</div>
            <div>
              <TextareaItem
                {...getFieldProps("description", {
                  rules: [{
                    required: true,
                    message: "请编写描述",
                  }],
                })}
                // title="高度自适应"
                autoHeight
                rows={3}
                placeholder="描述"
              />
            </div>
          </div>
          <div className={styles.submit} onClick={() => this.submit()}>发布</div>
        </div>
      </div>
    );
  }
}
const TestWrapper = createForm()(View);
export { TestWrapper as default };
