import React from "react";
import { Flex, Toast } from "antd-mobile";
import LabelInput from "srcDir/common/viewform/labelInput/labelInput";
import LabelButton from "srcDir/common/viewform/menAndWomen/view";
import FooterButton from "srcDir/common/viewform/footerBottom/view";
import fetch from "srcDir/common/ajax/indexWithBody";
import history from "srcDir/common/router/history";
import store from "store2";
import styles from "./style.less";
import fetchUpload from "srcDir/common/ajax/upload";
import Select from "srcDir/common/viewform/select/view";
// 创建react组件
const values = {};
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prompt: "",
      idNumber: "",
      phone: "",
      sex: "",
      chosenTime: "",
      chosenOrganizationName: "",
      name: "",
      cardid: "",
      phoneNum: "",
      chosenDetail: "",
      address: "",
      openname: true,
      opencardid: true,
      openphoneNum: true,
      rankingData: [],
      operationName: "添加员工",
      id: null
    };
    this.physicalExamination = this.physicalExamination.bind(this);
    this.verifyTheIdentityCard = this.verifyTheIdentityCard.bind(this);
    this.getsex = this.getsex.bind(this);
    // this.organization = this.organization.bind(this);
    this.verifyIndustry = this.verifyIndustry.bind(this);
    // this.getsex = this.getsex.bind(this);
    // console.log(props, 1111);
  }
  componentDidMount() {
    const _this = this;
    fetch({
      url: "/wx/position/myPosition",
      method: "GET",
      // params: {
      //   phoneNumber: phonelength,
      // },
      success(res) {
        const data = res.entity; // JSON.parse(res.entity);
        _this.setState({
          rankingData: data.obj
        });
        const id = store.set("employee");
        if (id !== "undefined" && id !== null) {
          localStorage.removeItem("employee");
          _this.setState({
            operationName: "修改员工",
            url: "/wx/employee/info/update",
            id: id,
          });
          _this.getData(id);
        } else {
          _this.setState({
            url: "/wx/employee/info/save",
          });
        }
      }
    });
  }
  // componentWillReceiveProps(nextProps) {
  //   this.setprops(nextProps);
  // }

  onAddImageClick(e) {
    e.preventDefault();
    const _this = this;
    const file = window.document.createElement("input");
    file.id = "js-file";
    file.type = "file";
    file.accept = "image/*";
    // if (e) {
    //   file.capture = "camera";
    // }
    window.$(file).change(function () {
      const data = new FormData();
      data.append("file", file.files[0]);
      // console.log(data.values);
      fetchUpload({
        url: "/wx/user/cardInfo",
        method: "POST",
        entity: data,
        success(res) {
          // console.log(res, "测试");
          // console.log(res, 111111);
          _this.setState({
            name: res.entity.obj.name,
            cardid: res.entity.obj.cardid,
          });
          _this.physicalExamination(res.entity.obj.name);
          _this.verifyTheIdentityCard(res.entity.obj.cardid);
        }
      });
    });
    file.click();
  }
  getData(id) {
    const _this = this;
    fetch({
      url: "/wx/employee/info/view",
      method: "GET",
      params: {
        id: id,
      },
      success(res) {
        // const data = res.entity; // JSON.parse(res.entity);
        _this.setState({
          name: res.entity.obj.name,
          cardid: res.entity.obj.cardid,
          position: res.entity.obj.position,
        });
        _this.physicalExamination(res.entity.obj.name);
        _this.verifyTheIdentityCard(res.entity.obj.cardid);
        // console.log(data, _this, "测试");
      }
    });
  }
  getsex(psidno) {
    let sexno;
    if (psidno.length === 18) {
      sexno = psidno.substring(16, 17);
    } else if (psidno.length === 15) {
      // sexno = psidno.substring(14, 15);
    } else {
      // alert("错误的身份证号码，请核对！")
      return false;
    }
    const tempid = sexno % 2;
    if (tempid === 0) {
      // console.log("女");
      this.setState({
        sex: "F",
      });
      values.gender = "M_003_02";
    } else {
      // console.log("男");
      this.setState({
        sex: "M",
      });
      values.gender = "M_003_01";
    }
    // return sex;
  }
  verifyIndustry(e) {
    if (e.length < 1) {
      this.setState({
        industrytext: "所属行业不能为空。",
        // switch: ,
      });
    } else {
      values.position = e;
      this.setState({
        industrytext: "",
        position: e,
        switch: true,
      });
    }
  }
  physicalExamination(e, v) {
    if (v !== true) {
      this.setState({
        openname: false,
      });
    }
    const reg = /^[\u4e00-\u9fa5]+$/gi;
    // console.log(!reg.test(e), 1233555);
    if (!reg.test(e)) {
      // console.log(reg.test(e), 1231222);
      this.setState({
        prompt: "姓名只能是汉字",
      });
      delete values.name;
    } else {
      // console.log(reg.test(e), 123);
      if (e.length < 2) {
        this.setState({
          prompt: "姓名最小长度2",
        });
        delete values.name;
      } else if (e.length > 6) {
        this.setState({
          prompt: "姓名最大长度6",
        });
        delete values.name;
      } else {
        values.name = e;
        this.setState({
          prompt: "",
        });
      }
    }
  }
  verifyTheIdentityCard(e, v) {
    if (v !== true) {
      this.setState({
        opencardid: false,
      });
    }
    const idCardNum = /(^\d{15}$)|(^\d{17}([0-9]|X)$)/;
    if (e.length < 1) {
      this.setState({
        idNumber: "身份证号不能为空。",
        sex: "",
      });
      delete values.cardid;
    } else if (e.length > 18) {
      this.setState({
        idNumber: "身份证号只能是18位。",
        sex: "",
      });
      delete values.cardid;
    } else {
      if (!idCardNum.test(e)) {
        this.setState({
          idNumber: "请输入正确的身份证号",
          sex: "",
        });
        delete values.cardid;
      } else {
        this.setState({
          idNumber: "",
        });
        values.cardid = e;
        this.getsex(e);
      }
    }
  }
  // organization() {
  //   this.setState({
  //     openname: true,
  //     opencardid: true,
  //     openphoneNum: true,
  //   });
  //   store.set("physicalExaminationInformation", values);
  //   history.push("/organization");
  // }
  payImmediately() {
    const _this = this;
    const ary = [];
    if (!values.name) {
      this.physicalExamination("");
      // return false;
      ary.push("0");
    }
    if (!values.cardid) {
      this.verifyTheIdentityCard("");
      // return false;
      ary.push("0");
    }
    if (!values.position) {
      this.verifyIndustry("");
      // return false;
      ary.push("0");
    }
    if (ary.indexOf("0") > -1) {
      // console.log(333);
    } else {
      // console.log(typeof(this.state.id));
      // const id = "" + this.state
      if (this.state.id) {
        values.id = _this.state.id;
      }
      fetch({
        // url: "/wx/employee/info/save",
        url: _this.state.url,
        method: "POST",
        entity: values,
        success(res) {
          const data = res.entity;
          if (data.success) {
            Toast.success(data.msg);
            history.go(-1);
          } else {
            Toast.fail(data.msg);
          }
        }
      });
    }
  }
  render() {
    return (
      <div style={{ paddingTop: 20 }} className={styles.bg}>
        <Flex>
          <button className={styles.btnUpload} onTouchEnd={(e) => this.onAddImageClick(e)}>上传身份证</button>
        </Flex>
        <Flex>
          <LabelInput
            label="身份证"
            types="text"
            prompt={this.state.idNumber}
            val={this.state.cardid}
            placeholder="请输入18位身份证号"
            id="textinput1"
            open={this.state.opencardid}
            onchangeFun={(e) => { this.verifyTheIdentityCard(e); }}
          />
        </Flex>
        <LabelInput
          label="姓名"
          types="text"
          prompt={this.state.prompt}
          val={this.state.name}
          placeholder="请输入姓名"
          id="textinput"
          open={this.state.openname}
          onchangeFun={(e) => { this.physicalExamination(e); }}
        />
        <Flex>
          <LabelButton label="性别" sex={this.state.sex} val={this.state.cardid} sexCardid={(e) => { this.getsex(e); }} />
          {
            // this.state.cardid.length > 0 && this.getsex(this.state.cardid)
          }
        </Flex>
        <Flex>
          <Select
            label="岗位"
            types="text"
            sizelabel="95"
            prompt={this.state.industrytext}
            val={this.state.position}
            data={this.state.rankingData}
            placeholder="请选择岗位"
            id="textinput2"
            open={this.state.opencardid}
            onchangeFun={(e) => { this.verifyIndustry(e); }}
          />
        </Flex>
        <div className={styles.borderDown} />
        <FooterButton
          className={styles.buttonCenter}
          displayed="0"
          buttonName={this.state.operationName}
          onClickFun={(e) => { this.payImmediately(e); }}
        />
      </div>
    );
  }
}
export { View as default };
