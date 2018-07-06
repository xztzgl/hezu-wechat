import React from "react";
// import { render } from "react-dom";
import { Flex, Toast } from "antd-mobile";
import styles from "./style.less";
import EnterpriseInput from "srcDir/common/viewform/enterpriseInput/view";
import EnterpriseY from "srcDir/common/viewform/enterpriseY/view";
import SelectTree from "srcDir/common/viewform/selectTree/view";
import Select from "srcDir/common/viewform/select/view";
import fetch from "srcDir/common/ajax/index";
import fetchbody from "srcDir/common/ajax/indexWithBody";
import fetchUpload from "srcDir/common/ajax/upload";
import history from "srcDir/common/router/history";
// import LoginInput from "srcDir/common/viewform/loginInput/view";
// import LoginInput from "srcDir/common/viewform/loginInput/view";
import store from "store2";
// import fetch from "srcDir/common/ajax/indexWithBody";
// 创建react组件
// const View = (props) => {
//   console.info("personalBooking/index/index");
//   console.log(props);
//   return (
//     <div className={styles.bg}>
//       <PersonalInformation />
//     </div>
//   );
// };
const codeMap = store.session.get("codeMap");
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
const values = {};
// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenOrganizationName: "",
      chosenTime: "",
      memberId: "",
      phonetext: "",
      person: {},
      switch: true,
      district: [],
      url: ""
    };
    // this.inquire = this.inquire.bind(this);
    this.getStore = this.getStore.bind(this);
    this.verifyThePhone = this.verifyThePhone.bind(this);
    this.onAddImageClick = this.onAddImageClick.bind(this);
    this.loginfunction = this.loginfunction.bind(this);
    this.verifyIndustry = this.verifyIndustry.bind(this);
    this.verifyEmploynumCode = this.verifyEmploynumCode.bind(this);
    this.setSwitch = this.setSwitch.bind(this);
  }
  componentDidMount() {
    // console.log(this.props.prompt, 888);
    const _this = this;
    fetch({
      url: "/wx/position/list?pid=1",
      method: "GET",
      // params: {
      //   phoneNumber: phonelength,
      // },
      success(res) {
        const data = JSON.parse(res.entity);
        _this.setState({
          district: data.obj
        });
      }
    });
    this.getStore();
  }
  onAddImageClick(e) {
    e.preventDefault();
    const _this = this;
    const file = window.document.createElement("input");
    file.id = "js-file";
    file.type = "file";
    file.accept = "image/*";
    console.log(file.size, 122222, file);
    // if (e) {
    //   file.capture = "camera";
    // }
    window.$(file).change(function () {
      const data = new FormData();
      const size = (file.files[0].size / 1024 / 1024) < 5;
      console.log(size);
      if (size) {
        data.append("file", file.files[0]);
        // console.log(data.values);
        fetchUpload({
          url: "/file/upload2",
          method: "POST",
          entity: data,
          success(res) {
            // console.log(res, "测试");
            values.businessLicense = res.entity.obj;
            _this.setState({
              url: res.entity.obj,
            });
          }
        });
      } else {
        Toast.success("图像不能超过5M");
      }
    });
    file.click();
  }
  // onChange(files, type, index) {
  //   console.log(files, type, index);
  //   this.setState({
  //     files,
  //   });
  // }
  getStore() {
    // console.log(1111);
  }
  getVerificationCode() {
    // console.log(this.state.phone, 111);
    const phonelength = this.state.mobile;
    // console.log(phonelength, 12333);
    if (phonelength && phonelength.length < 1) {
      this.verifyThePhone("");
    } else {
      // console.log(111);
      fetch({
        url: "/wx/user/sendCode",
        method: "POST",
        params: {
          phoneNumber: phonelength,
        },
        success(res) {
          // console.log("成功");
          const data = JSON.parse(res.entity);
          // Toast.success(data.msg);
          if (!data.obj) {
            return false;
          }
        }
      });
    }
    // console.log(111);
  }
  setSwitch(e) {
    if (e) {
      // console.log(e);
      this.setState({
        switch: false,
      });
    } else {
      this.setState({
        switch: true,
      });
    }
  }
  verifyVerficationcode(e) {
    // const phoneNum = /^1(3|4|5|7|8)\d{9}$/;
    if (e.length < 1) {
      this.setState({
        verificationCode: "验证码不能为空。",
        code: e,
      });
      // delete values.phone;
    } else if (e.length > 6 || e.length < 6) {
      this.setState({
        verificationCode: "验证长度为6位。",
        code: e,
      });
      // delete values.phone;
    } else {
      values.code = e;
      this.setState({
        verificationCode: "",
        code: e,
      });
    }
  }
  verifyThePhone(e) {
    const phoneNum = /^1\d{10}$/;
    if (e.length < 1) {
      this.setState({
        phonetext: "手机号不能为空。",
        mobile: e,
        // switch: ,
      });
      // delete values.phone;
    } else if (e.length > 11) {
      this.setState({
        phonetext: "手机号最大长度为11位。",
        mobile: e,
        switch: false,
      });
      // delete values.phone;
    } else {
      if (!phoneNum.test(e)) {
        this.setState({
          phonetext: "请输入正确的手机号",
          mobile: e,
          switch: false,
        });
        // delete values.phone;
      } else {
        values.mobile = e;
        this.setState({
          phonetext: "",
          mobile: e,
          switch: true,
        });
      }
    }
  }
  verifyName(e) {
    // const phoneNum = /^1\d{10}$/;
    if (e.length < 5) {
      this.setState({
        nametext: "企业名称至少5字符。",
        name: e,
        // switch: ,
      });
      // delete values.phone;
    } else if (e.length > 60) {
      this.setState({
        nametext: "企业名称不能超过为60字符。",
        switch: false,
        name: e,
      });
      // delete values.phone;
    } else {
      values.name = e;
      this.setState({
        nametext: "",
        name: e,
        switch: true,
      });
    }
  }
  verifyAddress(e) {
    // const phoneNum = /^1\d{10}$/;
    if (e.length < 1) {
      this.setState({
        addresstext: "详细地址不能为空。",
        address: e,
        // switch: ,
      });
      // delete values.phone;
    } else if (e.length > 50) {
      this.setState({
        addresstext: "详细地址不能超过为50位。",
        address: e,
        switch: false,
      });
      // delete values.phone;
    } else {
      values.address = e;
      this.setState({
        addresstext: "",
        address: e,
        switch: true,
      });
    }
  }
  verifySocial(e) {
    const socialNum = /(?=^.*?\d)(?=^.*?[a-zA-Z])^[0-9a-zA-Z]/;
    if (e.length < 1) {
      this.setState({
        socialCreditText: "社会信用代码不能为空。",
        socialCreditCode: e,
      });
      // delete values.phone;
    } else if (e.length > 18) {
      this.setState({
        socialCreditText: "社会信用代码只能为18位。",
        switch: false,
        socialCreditCode: e,
      });
      // delete values.phone;
    } else if (e.length < 18) {
      this.setState({
        socialCreditText: "社会信用代码只能为18位。",
        switch: false,
        socialCreditCode: e,
      });
      // delete values.phone;
    } else {
      if (socialNum.test(e)) {
        values.socialCreditCode = e;
        this.setState({
          socialCreditText: "",
          socialCreditCode: e,
          switch: true,
        });
      } else {
        this.setState({
          socialCreditText: "社会信用代码必须有数字和字母组成",
          switch: false,
        });
        // delete values.phone
      }
    }
  }
  verifyIndustry(e) {
    // values.industry = e;
    if (e.length < 1) {
      this.setState({
        industrytext: "所属行业不能为空。",
        // industry: e,
        // switch: ,
      });
      // delete values.phone;
    } else {
      values.industry = e;
      this.setState({
        industrytext: "",
        industry: e,
        switch: true,
      });
    }
    // console.log(e, "传递");
  }
  verifyEmploynumCode(e) {
    if (e.length < 1) {
      this.setState({
        employnumCodetext: "员工人数不能为空。",
        // switch: ,
      });
      // delete values.phone;
    } else {
      values.employnumCode = e;
      this.setState({
        employnumCodetext: "",
        employnumCode: e,
        switch: true,
      });
    }
    // console.log(e, "传递");
  }
  emailaddress(e) {
    const re = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
    if (e.length < 1) {
      this.setState({
        emailtext: "邮箱不能为空",
        emailOpen: false,
      });
    } else {
      if (re.test(e)) {
        values.email = e;
        this.setState({
          emailtext: "",
          // emailOpen: false,
        });
      } else {
        this.setState({
          emailtext: "请输入正确的邮箱地址",
          emailOpen: false,
        });
      }
    }
  }
  verifyprovince(e) {
    // console.log(e, 111111);
    if (e.length < 1) {
      this.setState({
        provincetext: "所在地区不能为空。",
        // switch: ,
      });
      // delete values.phone;
    } else {
      values.province = e[0];
      values.city = e[1];
      values.county = e[2] ? e[2] : "";
      this.setState({
        provincetext: "",
        // employnumCode: e,
        switch: true,
      });
    }
  }
  delete() {
    delete values.businessLicense;
    this.setState({
      url: "",
    });
  }
  loginfunction(e) {
    e.preventDefault();
    // console.log(values, "数据");
    const ary = [];
    if (!values.name) {
      this.verifyName("");
      ary.push("0");
    }
    if (!values.socialCreditCode) {
      this.verifySocial("");
      ary.push("0");
    }
    if (!values.industry) {
      this.verifyIndustry("");
      ary.push("0");
    }
    if (!values.employnumCode) {
      this.verifyEmploynumCode("");
      ary.push("0");
    }
    if (!values.province) {
      this.verifyprovince("");
      ary.push("0");
    }
    if (!values.address) {
      this.verifyAddress("");
      ary.push("0");
    }
    if (!values.mobile) {
      this.verifyThePhone("");
      ary.push("");
    }
    if (!values.code) {
      this.verifyVerficationcode("");
      ary.push("0");
    }
    if (ary.indexOf("0") > -1) {
      // console.log("1");
    } else {
      fetchbody({
        url: "/wx/enterprise/info/register",
        method: "POST",
        entity: values,
        success(res) {
          // console.log("成功");
          const data = res.entity;
          if (data.success) {
            history.push("/registeredsuccess");
            Toast.success(data.msg);
          } else {
            Toast.fail(data.msg);
          }
        }
      });
    }
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
            open={this.state.opencardid}
            onchangeFun={(e) => { this.verifySocial(e); }}
          />
        </Flex>
        <Flex>
          <Select
            label="所属行业"
            types="text"
            prompt={this.state.industrytext}
            val={this.state.cardid}
            data={this.state.district}
            placeholder="请选择行业"
            id="textinput2"
            open={this.state.opencardid}
            onchangeFun={(e) => { this.verifyIndustry(e); }}
          />
        </Flex>
        <Flex>
          <Select
            label="员工人数"
            types="text"
            data={employeeArry}
            prompt={this.state.employnumCodetext}
            val={this.state.cardid}
            placeholder="请选择员工人数"
            id="textinput2"
            open={this.state.opencardid}
            onchangeFun={(e) => { this.verifyEmploynumCode(e); }}
          />
        </Flex>
        <Flex>
          <EnterpriseInput
            label="邮箱"
            types="text"
            prompt={this.state.emailtext}
            val={this.state.cardid}
            placeholder="请输入邮箱号"
            id="textinput3"
            open={this.state.opencardid}
            onchangeFun={(e) => { this.emailaddress(e); }}
          />
        </Flex>
        <Flex>
          <SelectTree
            label="所在地区"
            types="text"
            prompt={this.state.provincetext}
            val={this.state.cardid}
            // placeholder=""
            id="textinput2"
            open={this.state.opencardid}
            onchangeFun={(e) => { this.verifyprovince(e); }}
          />
        </Flex>
        <Flex>
          <EnterpriseInput
            label="详细地址"
            types="text"
            prompt={this.state.addresstext}
            val={this.state.cardid}
            placeholder="请输入详细地址"
            id="textinput4"
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
                <div className={styles.delete} onTouchEnd={(e) => this.delete(e)}></div>
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
            open={this.state.opencardid}
            onchangeFun={(e) => { this.verifyThePhone(e); }}
          />
        </Flex>
        <Flex>
          <EnterpriseY
            label="验证码"
            types="tel"
            prompt={this.state.verificationCode}
            // val={this.state.name}
            placeholder="请输入验证码"
            id="textinput6"
            // url={numberImage}
            phonenum={this.state.mobile}
            switch={this.state.switch}
            yphone={(e) => this.verifyThePhone(e)}
            onchangeFun={(e) => { this.verifyVerficationcode(e); }}
            verificationCode={(e) => { this.getVerificationCode(e); }}
            setSwitch={(e) => { this.setSwitch(e); }}
            disabledCode="1"
          />
        </Flex>
        <div className={styles.loginButton}>
          <button onClick={(e) => { this.loginfunction(e); }}>注册</button>
        </div>
      </div>
    );
  }
}

export { View as default };
