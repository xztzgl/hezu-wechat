import React from "react";
// import { render } from "react-dom";
import { Flex, Picker } from "antd-mobile";
import styles from "./style.less";
import EnterpriseInput from "srcDir/common/viewform/enterpriseInput/view";
// import EnterpriseY from "srcDir/common/viewform/enterpriseY/view";
// import SelectTree from "srcDir/common/viewform/selectTree/view";
// import Select from "srcDir/common/viewform/select/view";
import fetch from "srcDir/common/ajax/index";
// import fetchbody from "srcDir/common/ajax/indexWithBody";
// import fetchUpload from "srcDir/common/ajax/upload";
import history from "srcDir/common/router/history";
// import LoginInput from "srcDir/common/viewform/loginInput/view";
// import LoginInput from "srcDir/common/viewform/loginInput/view";
import store from "store2";
// import fetch from "srcDir/common/ajax/indexWithBody";
// 创建react组件
const CustomChildren = props => (
  <div
    onClick={props.onClick}
    style={{ backgroundColor: "#fff", paddingLeft: "0.3rem" }}
  >
    <div style={{ display: "flex", height: "0.9rem", lineHeight: "0.9rem", borderRadius: "0 10px 10px 0" }}>
      {/* <div style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>1{props.children}</div> */}
      <div style={{ flex: 1, color: "#888", }}>{props.extra}</div>
    </div>
  </div>
);
const codeMap = store.session.get("codeMap");
const citys = store.session.get("citys");
const positions = store.session.get("positions");
const genderCode = codeMap.filter((x) => /M_012\S+/.test(x.code) === true);

const employeeArry = [];
genderCode.map(v => {
  const obj = {
    value: v.code,
    label: v.name
  };
  employeeArry.push(obj);
  return true;
});
// console.log(genderCode, 111111, employeeArry);
// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenOrganizationName: "",
      chosenTime: "",
      memberId: "",
      phonetext: "",
      city: [],
      pickerValue: [],
      district: [],
      url: "",
      name: "",
      socialCreditCode: "",
      businessLicense: "",
      employnumCode: [],
      industry: [],
      address: "",
      email: "",
      province: [],

    };
    this.setdata = this.setdata.bind(this);
    this.onChange = this.onChange.bind(this);
    this.cityName = this.cityName.bind(this);
  }
  componentDidMount() {
    this.setdata();
  }
  onChange(e) {
    this.setState({ pickerValue: e });
  }
  setdata() {
    // console.log()
    const _this = this;
    fetch({
      url: "/wx/enterprise/info/view",
      method: "GET",
      // params: {
      //   phoneNumber: phonelength,
      // },
      success(res) {
        const obj = JSON.parse(res.entity).obj;
        // console.log(obj);
        const province = [];
        if (obj.province) {
          province.push(obj.province);
        }
        if (obj.city) {
          province.push(obj.city);
        }
        if (obj.county) {
          province.push(obj.county);
        }
        // console.log(province);
        _this.setState({
          name: obj.name || "",
          socialCreditCode: obj.socialCreditCode || "",
          url: obj.businessLicense || "",
          employnumCode: obj.employnumCode ? [obj.employnumCode] : [],
          industry: obj.industry ? [obj.industry] : [],
          address: obj.address || "",
          email: obj.email || "",
          province: province,
          mobile: obj.mobile || ""
        });
      }
    });
  }
  cityName() {
    const cc = [];
    this.state.province.map(v => {
      const ww = (e) => {
        e.map(c => {
          // let dd;
          if (v === (c.value + "")) {
            cc.push(c.label);
          } else {
            if (c.children.length > 0) {
              ww(c.children);
            }
          }
          return true;
        });
      };
      ww(citys);
      return true;
    });
    let dd;
    cc.map(v => {
      if (dd) {
        dd = dd + "," + v;
      } else {
        dd = v;
      }
      return true;
    });
    // console.log(dd);
    return dd;
  }
  back(e) {
    e.preventDefault();
    history.go(-1);
  }
  render() {
    const _this = this;
    const urlimg = `url(${this.state.url})`;
    return (
      <div className={styles.bg}>
        <Flex>
          <EnterpriseInput
            label="企业名称"
            types="text"
            prompt={this.state.nametext}
            val={this.state.name}
            placeholder="请输入企业名称"
            disabled="0"
            id="textinput1"
            open={this.state.opencardid}
            onchangeFun={(e) => { this.verifyName(e); }}
          />
        </Flex>
        <Flex>
          <EnterpriseInput
            label="社会信用代码"
            types="text"
            prompt={this.state.socialCreditText}
            val={this.state.socialCreditCode}
            placeholder="请输入18位社会信用代码"
            id="textinput2"
            disabled="0"
            open={this.state.opencardid}
            onchangeFun={(e) => { this.verifySocial(e); }}
          />
        </Flex>
        <Flex>
          <div className={styles.inputBody}>
            <div className={styles.inputPos}>
              <div className={styles.inputCss}>
                <label
                  style={{ width: "" }}
                >
                  <span>所属行业</span>
                </label>
                <Picker
                  // title="选择地区"
                  extra={this.props.placeholder}
                  data={positions}
                  value={this.state.industry}
                  cols={1}
                  disabled
                  // onChange={v => this.onChange(v)}
                >
                  <CustomChildren>所属行业</CustomChildren>
                </Picker>
              </div>
              <div className={styles.getVerificationCode} style={this.props.disabledCode === "1" ? {} : { display: "none" }}>
              </div>
            </div>
            <div className={styles.prompt}>{this.props.prompt}</div>
          </div>
        </Flex>
        <Flex>
          {/* <Select
            label="员工人数"
            types="text"
            data={employeeArry}
            prompt={this.state.employnumCodetext}
            val={this.state.employnumCode}
            placeholder="请选择员工人数"
            id="textinput2"
            disabled="0"
            open={this.state.opencardid}
            onchangeFun={(e) => { this.verifyEmploynumCode(e); }}
          /> */}
          <div className={styles.inputBody}>
            <div className={styles.inputPos}>
              <div className={styles.inputCss}>
                <label
                  style={{ width: "" }}
                >
                  <span>员工人数</span>
                </label>
                <Picker
                  // title="选择地区"
                  extra={this.props.placeholder}
                  data={employeeArry}
                  value={this.state.employnumCode}
                  cols={1}
                  disabled
                  // onChange={v => this.onChange(v)}
                >
                  <CustomChildren>员工人数</CustomChildren>
                </Picker>
              </div>
              <div className={styles.getVerificationCode} style={this.props.disabledCode === "1" ? {} : { display: "none" }}>
              </div>
            </div>
            <div className={styles.prompt}>{this.props.prompt}</div>
          </div>
        </Flex>
        <Flex>
          <EnterpriseInput
            label="邮箱"
            types="text"
            prompt={this.state.emailtext}
            val={this.state.email}
            placeholder="请输入邮箱号"
            id="textinput3"
            disabled="0"
            open={this.state.opencardid}
            onchangeFun={(e) => { this.emailaddress(e); }}
          />
        </Flex>
        <Flex>
          {/* <SelectTree
            label="所在地区"
            types="text"
            prompt={this.state.provincetext}
            val={this.state.province}
            // placeholder=""
            id="textinput2"
            open={this.state.opencardid}
            // onchangeFun={(e) => { this.verifyprovince(e); }}
          /> */}
          <EnterpriseInput
            label="所在地区"
            types="text"
            prompt={this.state.socialCreditText}
            val={this.cityName()}
            placeholder=""
            id="textinput2"
            disabled="0"
            open={this.state.opencardid}
            onchangeFun={(e) => { this.verifySocial(e); }}
          />
        </Flex>
        <Flex>
          <EnterpriseInput
            label="详细地址"
            types="text"
            prompt={this.state.addresstext}
            val={this.state.address}
            placeholder="请输入详细地址"
            id="textinput4"
            disabled="0"
            open={this.state.opencardid}
            onchangeFun={(e) => { this.verifyAddress(e); }}
          />
        </Flex>
        <Flex>
          <div className={styles.uploadImage}>
            {
              _this.state.url.length < 1 ? <div className={styles.upload} onTouchEnd={(e) => this.onAddImageClick(e)}>
                <div><span>+</span></div>
                <div>文件大小不超过5M</div>
                <div>支持.JPG.JPEG.PNG</div>
              </div> : <div className={styles.img} style={{ backgroundImage: urlimg }}>
                {/* <div className={styles.delete} onTouchEnd={(e) => this.delete(e)}></div> */}
              </div>
            }
          </div>
        </Flex>
        <Flex>
          <EnterpriseInput
            label="手机号码"
            types="text"
            prompt={this.state.phonetext}
            val={this.state.mobile}
            placeholder="请输入11位手机号"
            id="textinput5"
            disabled="0"
            open={this.state.opencardid}
            onchangeFun={(e) => { this.verifyThePhone(e); }}
          />
        </Flex>
        {/* <Flex>
          <EnterpriseY
            label="验证码"
            types="tel"
            prompt={this.state.verificationCode}
            // val={this.state.name}
            placeholder="请输入验证码"
            id="textinput6"
            // url={numberImage}
            phonenum={this.state.phone}
            switch={this.state.switch}
            onchangeFun={(e) => { this.verifyVerficationcode(e); }}
            verificationCode={(e) => { this.getVerificationCode(e); }}
            setSwitch={(e) => { this.setSwitch(e); }}
            disabledCode="1"
          />
        </Flex> */}
        <div className={styles.loginButton}>
          <button onClick={(e) => { this.back(e); }}>返回</button>
        </div>
      </div>
    );
  }
}

export { View as default };
