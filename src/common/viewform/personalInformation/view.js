import React from "react";
import { Flex, Icon, Tabs, Toast } from "antd-mobile";
import LabelInput from "srcDir/common/viewform/labelInput/labelInput";
import LabelButton from "srcDir/common/viewform/menAndWomen/view";
import FooterBottom from "srcDir/common/viewform/footerBottom/view";
import fetch from "srcDir/common/ajax/indexWithBody";
import history from "srcDir/common/router/history";
import store from "store2";
import moment from "moment";
import pay from "srcDir/common/weichat/pay";
import styles from "./style.less";
// 创建react组件
const TabPane = Tabs.TabPane;
const values = {};
const skin = require("srcDir/images/skin@3x.png");
const stoolSampling = require("srcDir/images/stoolSampling@3x.png");
const chestRadiograph = require("srcDir/images/chestRadiograph@3x.png");
// const skin = require("srcDir/images/skin@3x.png");
const precautions = require("srcDir/images/precautions@3x.png");
const blood = require("srcDir/images/blood@3x.png");
const Sputum = require("srcDir/images/Sputum@3x.png");
let pay1 = "0";
class View extends React.Component {
  constructor(props) {
    super(props);
    // const chosenDetail = store.get("chosenDetail");
    // const dataii = store.get("physicalExaminationInformation");
    // const userInfo = store.get("garage-wechat-user");
    // let chosenOrganizationName = "";
    // let chosenTime = "";
    // if (chosenDetail && chosenDetail.date) {
    //   // console.log(chosenDetail);
    //   chosenOrganizationName = store.get("chosenOrganizationName");
    //   chosenTime = `${chosenDetail.month}-${chosenDetail.date} ${chosenDetail.time.beginTime}--${chosenDetail.time.endTime}`;
    //   values.appointDate = `${chosenDetail.month}-${chosenDetail.date}`;
    //   values.healthRuleId = chosenDetail.time.id;
    //   values.mbHealthCenterId = chosenDetail.organizationId;
    //   values.payPaymentMethodId = 1;
    //   values.offsetAmount = 150;
    //   values.memberId = userInfo.id;
    // }
    // values.appointDate = chosenTime;
    this.state = {
      prompt: "",
      idNumber: "",
      phone: "",
      sex: "",
      // chosenDetail: chosenDetail,
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
      price: ""
      // pay1: "0",
      // initialization: true,

      // a: "1",
      // b: "1",
      // c: "1",
    };
    this.physicalExamination = this.physicalExamination.bind(this);
    this.verifyTheIdentityCard = this.verifyTheIdentityCard.bind(this);
    this.getsex = this.getsex.bind(this);
    this.verifyThePhone = this.verifyThePhone.bind(this);
    this.setprops = this.setprops.bind(this);
    this.organization = this.organization.bind(this);
    this.setidCard = this.setidCard.bind(this);
    // this.getsex = this.getsex.bind(this);
    // console.log(props, 1111);
  }
  // componentDidMount() {
  // }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps, 123123, v);
    const idcardtrue = store.get("IdcardTrue");
    const idcard = store.get("IDcard");
    if (idcardtrue) {
      this.setidCard(idcard);
    } else {
      this.setprops(nextProps);
    }
    // console.log(idcard);
    // this.setprops(nextProps);
  }
  // componentWillUpdate(nextProps, nextState) {
  //   // console.log(nextProps, nextState, 12233);
  //   const idcardtrue = store.get("IdcardTrue");
  //   const idcard = store.get("IDcard");
  //   if (idcardtrue) {
  //     this.setidCard(idcard);
  //   } else {
  //     this.setprops(nextProps);
  //   }
  //   // if (nextState.name.length < 1) {
  //   //   this.setprops(nextProps);
  //   // }
  // }
  setidCard(e) {
    this.setState({
      name: e.name,
      cardid: e.cardId,
    });
    if (e.name) {
      this.physicalExamination(e.name, true);
    }
    if (e.cardId) {
      this.verifyTheIdentityCard(e.cardId, true);
    }
    // localStorage.removeItem("IdcardTrue");
    // localStorage.removeItem("IDcard");
  }
  setprops(nextProps) {
    // console.log(nextProps, "测试数据");
    const _this = this;
    this.setState({
      name: (nextProps.person && nextProps.person.name) || "",
      cardid: (nextProps.person && nextProps.person.cardid) || "",
      phoneNum: (nextProps.person && nextProps.person.phone) || "",
      chosenTime: nextProps.chosenTime || "",
      chosenDetail: nextProps.chosenDetail || "",
      chosenOrganizationName: nextProps.chosenOrganizationName || "",
    });
    if (nextProps.chosenDetail && nextProps.chosenDetail.organizationId) {
      fetch({
        url: "/wx/hc/pc/getTJAmount",
        method: "GET",
        params: {
          healthCenterId: nextProps.chosenDetail.organizationId,
        },
        success(res) {
          const data = res.entity;
          // console.log(data);
          if (data.success) {
            // console.log(data);
            _this.setState({
              price: data.obj
            });
          }
        }
      });
    }
    if (nextProps.person) {
      if (nextProps.person.name) {
        this.physicalExamination(nextProps.person.name, true);
      }
      if (nextProps.person.cardid) {
        this.verifyTheIdentityCard(nextProps.person.cardid, true);
        // this.getsex(nextProps.person.cardid);
      }
      if (nextProps.person.phone) {
        this.verifyThePhone(nextProps.person.phone, true);
      }
    }
  }
  getsex(psidno) {
    let sexno;
    // let sex;
    if (psidno.length === 18) {
      sexno = psidno.substring(16, 17);
    } else if (psidno.length === 15) {
      // sexno = psidno.substring(14, 15);
    } else {
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
  }
  physicalExamination(e, v) {
    if (v !== true) {
      this.setState({
        openname: false,
      });
    }
    if (e.length < 1) {
      // console.log("不能为空");
      this.setState({
        prompt: "体检人不能为空",
      });
      delete values.name;
    } else {
      values.name = e;
      this.setState({
        prompt: "",
      });
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
      // console.log("不能为空");
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
        // console.log(e, "身份证");
        this.getsex(e);
      }
    }
  }
  verifyThePhone(e, v) {
    // console.log(1);
    if (v !== true) {
      this.setState({
        openphoneNum: false,
      });
    }
    const phoneNum = /^1\d{10}$/;
    if (e.length < 1) {
      this.setState({
        phone: "手机号不能为空。",
      });
      delete values.phone;
    } else if (e.length > 11) {
      this.setState({
        phone: "手机号最大长度为11位。",
      });
      delete values.phone;
    } else {
      if (!phoneNum.test(e)) {
        this.setState({
          phone: "请输入正确的手机号",
        });
        delete values.phone;
      } else {
        values.phone = e;
        this.setState({
          phone: "",
        });
      }
    }
  }
  verifyTheAddress(e) {
    // console.log(1);
    if (e.length < 1) {
      // console.log("不能为空");
      this.setState({
        address: "请选择体检点及体检时间",
      });
      // delete values.name;
    } else {
      // values.name = e;
      this.setState({
        address: "",
      });
    }
  }
  organization() {
    // console.log(values);
    this.setState({
      openname: true,
      opencardid: true,
      openphoneNum: true,
    });
    store.set("physicalExaminationInformation", values);
    localStorage.removeItem("IdcardTrue");
    localStorage.removeItem("IDcard");
    history.push("/organization");
  }
  payImmediately() {
    // const _this = this;
    const ary = [];
    // fetch({
    //   url: "/wx/order/createSelfOrder",
    //   method: "POST",
    //   params: values,
    //   success(res) {
    //     const data = JSON.parse(res.entity);
    //     console.log(data.obj);
    //   }
    // });
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
    if (!values.phone) {
      this.verifyThePhone("");
      // return false;
      ary.push("0");
    }
    if (this.state.chosenOrganizationName.length < 1) {
      this.verifyTheAddress("");
      ary.push("0");
    }
    if (ary.indexOf("0") > -1) {
      // console.log(333);
    } else {
      // console.log(123);
      // console.log(values);
      // $.ajax({
      //   url: "/mb/health/center/date",
      //   success: function (re) {
      //     console.log(re);
      //   }
      // });
      if (pay1 === "0") {
        // console.log(pay1, 12314);
        pay1 = "1";
        // console.log(pay1);
        // _this.forceUpdate();
        values.appointDate = moment(`${this.state.chosenDetail.month}-${this.state.chosenDetail.date}`.replace(/-/g, "/")).format("YYYY-MM-DD hh:mm:ss");
        values.healthRuleId = this.state.chosenDetail.time.id;
        values.mbHealthCenterId = this.state.chosenDetail.organizationId;
        values.memberId = this.state.memberId;
        values.payPaymentMethodId = 1;
        // values.offsetAmount = 150;
        values.offsetAmount = this.state.price;
        // values.memberId = userInfo.id;

        fetch({
          url: "/wx/order/createSelfOrder",
          method: "POST",
          entity: values,
          success(res) {
            const data = res.entity;
            // console.log(data);
            if (data.success) {
              localStorage.removeItem("chosenDetail");
              localStorage.removeItem("chosenOrganizationName");
              localStorage.removeItem("physicalExaminationInformation");
              localStorage.removeItem("IdcardTrue");
              localStorage.removeItem("IDcard");
              // localStorage.removeItem("chosenDetail");
              // _this.setState({
              //   pay: true,
              // });
              // alert("预约成功");
              pay(data.obj.id, () => {
                // console.log("222222");
                // history.push("/personalBooking/success");
                const defaultKey = "1";
                history.push("/orderList/", {
                  defaultKey,
                });
              }, () => {
                const defaultKey = "1";
                history.push("/orderList/", {
                  defaultKey,
                });
              });
            } else {
              Toast.fail(data.msg);
            }
          }
        });
      }
    }
    // console.log(1);
  }
  render() {
    // const datadd = "";
    const { props } = this;
    // console.log(this.props, 23232);
    return (
      <div style={{ paddingTop: 20 }}>
        <LabelInput
          label="体检人"
          types="text"
          prompt={this.state.prompt}
          val={this.state.name}
          placeholder="请输入体检人姓名"
          id="textinput"
          open={this.state.openname}
          onchangeFun={(e) => { this.physicalExamination(e); }}
        />
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
        <Flex>
          <LabelButton label="性别" sex={this.state.sex} val={this.state.cardid} sexCardid={(e) => { this.getsex(e); }} />
          {
            // this.state.cardid.length > 0 && this.getsex(this.state.cardid)
          }
        </Flex>
        <Flex>
          <LabelInput
            label="联系电话"
            types="tel"
            prompt={this.state.phone}
            val={this.state.phoneNum}
            placeholder="请输入11位手机号"
            id="textinput2"
            classname="fourFont"
            open={this.state.openphoneNum}
            onchangeFun={(e) => { this.verifyThePhone(e); }}
          />
        </Flex>
        <div>
          <div className={styles.reservation}>
            <h5>预约信息</h5>
            <div
              onClick={() => { this.organization(); }}
              role="button"
              tabIndex="0"
            >
              <span>
                <input
                  type="text"
                  placeholder="请选择体检点及体检时间"
                  value={`${this.state.chosenOrganizationName}`}
                />
                <input
                  type="text"
                  value={`${this.state.chosenTime}`}
                />
              </span>
              <span> <Icon type="right" /> </span>
            </div>
          </div>
          <div className={styles.promptText}>{this.state.address}</div>
        </div>
        <div className={styles.borderDown} />
        {
          !props.reBooking && (
            <Flex>
              <div className={styles.tab}>
                <Tabs defaultActiveKey="1" className={styles.tabs} swipeable={false} >
                  <TabPane tab="服务内容" key="1">
                    <div className={styles.content}>
                      <article>
                        <h5>核心项目：</h5>
                        <p>皮肤病检查、痰抗杆菌检查、大便采样、胸片检查、抽血检查</p>
                      </article>
                      <img className={styles.skin} src={skin} alt="" />
                      <img className={styles.Sputum} src={Sputum} alt="" />
                      <img className={styles.stoolSampling} src={stoolSampling} alt="" />
                      <img className={styles.chestRadiograph} src={chestRadiograph} alt="" />
                      <img className={styles.blood} src={blood} alt="" />
                    </div>
                  </TabPane>
                  <TabPane tab="注意事项" key="2">
                    <div className={styles.content}>
                      <img className={styles.precautions} src={precautions} alt="" />
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </Flex>
          )
        }
        {
          /*
          <div className={styles.Pay}>
            <div>
              <span>¥150.00 ／人</span> <span><button onClick={() => { this.payImmediately(); }}>立即支付</button></span>
            </div>
          </div>
          */
        }
        <FooterBottom price={this.state.price} displayed="1" buttonName="立即支付" onClickFun={() => { this.payImmediately(); }} />
      </div>
    );
  }
}
export { View as default };
