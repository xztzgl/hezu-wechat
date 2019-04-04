/*
 * Created Date: Thursday June 21st 2018 5:21:28 pm
 * Author: gumingxing
 * -----
 * Last Modified:Thursday July 5th 2018 3:29:30 pm
 * Modified By: gumingxing
 * -----
 * Copyright (c) 2018 MagCloud
 */

import React from "react";
import styles from "./style.less";
import { createForm } from "rc-form";
import { Picker, List, DatePicker, Toast } from "antd-mobile";
import history from "srcDir/common/router/history";
// import history from "srcDir/common/router/history";
// import TakePictures from "srcDir/common/viewform/takePictures/view";
import store from "store2";
import fetch from "srcDir/common/ajax/indexWithBody";
// import moment from "moment";
// const maxDate = moment("2016-12-03 +0800", "YYYY-MM-DD Z").utcOffset(8);
// const minDate = moment("2015-08-06 +0800", "YYYY-MM-DD Z").utcOffset(8);
const customerid = store.get("customerId");
const getcity = (id) => {
  const district = store.session.get("district");
  const pid = district.filter(v => v.disp_local_id === id)[0].pid;
  // console.log(pid, 11);
  return district.filter(v => v.disp_local_id === pid)[0].disp_local_id;
};
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
// const fontName = [
//   { label: "电视", value: "anticon-tv" },
//   { label: "冰箱", value: "anticon-refrigerator" },
//   { label: "洗衣机", value: "anticon-washing" },
//   { label: "空调", value: "anticon-air" },
//   { label: "热水器", value: "anticon-water" },
//   { label: "床", value: "anticon-bed" },
//   { label: "暖气", value: "anticon-heating" },
//   { label: "宽带", value: "anticon-broadband" },
//   { label: "衣柜", value: "anticon-wardrobe" },
//   { label: "天然气", value: "anticon-natural" },
// ];
// const getClassName = (value) => {
//   const classname = fontName.filter(v => v.label === value);
//   return classname.length > 0 ? classname[0].value : "";
// };
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
      id: null,
      data: {},
      height: document.documentElement.clientHeight
    };
    this.getimg = this.getimg.bind(this);
    this.submit = this.submit.bind(this);
    this.checkBox = this.checkBox.bind(this);
    this.getData = this.getData.bind(this);
    // console.log(props, 2222);
  }
  componentDidMount() {
    // const id = this.props.router.history.location.state;
    // // console.log(id, 111);
    // if (id) {
    //   this.getData(id.id);
    // }
  }
  getData(id) {
    const _this = this;
    fetch({
      url: "/wechat-house/get",
      method: "POST",
      entity: {
        customer_id: customerid,
        product_id: id
      },
      success(res) {
        if (res.entity.success) {
          const data = res.entity.data;
          _this.setState({
            data,
            imgdata: data.image_id.split(","),
            // : data.infrastructure_id.
            renttypeArry: data.infrastructure_id.split(","),
            renttype: data.infrastructure_id,
            id
            // customerMobile: res.entity.customer_mobile,
            // favorited: res.entity.favorited
          });
        }
      }
    });
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
    const _this = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values, 12121); // /wechat-house/add
        if (values.birth_year) {
          const date = new Date(values.birth_year._d);
          values.birth_year = date.getFullYear(); // + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        }
        const key = Object.keys(values);
        key.map(v => {
          if (typeof (values[v]) !== "string" && typeof (values[v]) !== "undefined" && typeof (values[v]) !== "number") {
            values[v] = values[v].join(",");
          }
          return true;
        });
        values.creator_id = customerid + "";
        values.username = _this.props.router.history.location.state.username;
        fetch({
          // url: "/wx/account/login",
          // url: `${configURL.remoteServer.urlHome} + "/wechat-house/list"`,
          url: "/wechat-login/sign",
          method: "POST",
          entity: values,
          success(res) {
            // console.log(res, 13413214);
            if (res.entity) {
              history.push("/homepage");
            }
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
    const { data } = this.state;
    return (
      <div className={styles.nav}>
        <div style={{ height: this.state.height, display: "flex", flexDirection: "column" }}>
          <div className={`${styles.fromStyle} style`}>
            <div>性&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别</div>
            <div>
              <Picker
                data={getName(10001)}
                cols={1}
                {...getFieldProps("gender", {
                  // initialValue: objKey(data) ? [data.gender_id] : [],
                  rules: [{
                    required: true,
                    message: "请选择评价",
                  }],
                })}
              >
                <List.Item arrow="horizontal">性别</List.Item>
              </Picker>
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>出生年份</div>
            <div>
              <DatePicker
                mode="date"
                title="选择日期"
                // extra="可选,小于结束日期"
                // format="YYYY-MM-DD"
                {...getFieldProps("birth_year", {
                  // initialValue: objKey(data) ? moment(data.sign_time, "YYYY-MM-DD") : "",
                  rules: [{
                    required: true,
                    message: "请选择时间",
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
            <div>职&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;业</div>
            <div>
              <Picker
                data={getName(10002)}
                cols={1}
                {...getFieldProps("vocation", {
                  rules: [{
                    required: true,
                    message: "请选择朝向",
                  }],
                })}
              >
                <List.Item arrow="horizontal">职业</List.Item>
              </Picker>
            </div>
          </div>
          <div className={`${styles.fromStyle} style`}>
            <div>所在区域</div>
            <div>
              <Picker
                data={city()}
                // cols={1}
                {...getFieldProps("district", {
                  initialValue: objKey(data) ? [1, getcity(data.district_id), data.district_id] : [],
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
          <div className={styles.submit} style={{ marginTop: "auto" }} onClick={() => this.submit()}>提交</div>
        </div>
      </div>
    );
  }
}
const TestWrapper = createForm()(View);
export { TestWrapper as default };
