import React from "react";
// import { render } from "react-dom";

import PersonalInformation from "srcDir/common/viewform/personalInformation/view";
import styles from "./style.less";
import store from "store2";
import fetch from "srcDir/common/ajax/indexWithBody";
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

// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenOrganizationName: "",
      chosenTime: "",
      memberId: "",
      person: {},
    };
    // this.inquire = this.inquire.bind(this);
    this.getStore = this.getStore.bind(this);
    // console.log(props, 2222);
  }
  componentDidMount() {
    // console.log(this.props.prompt, 888);
    // console.log(222);
    this.getStore();
  }
  getStore() {
    // console.log(1111);
    const _this = this;
    const chosenDetail = store.get("chosenDetail");
    const persondata = store.get("physicalExaminationInformation");
    // console.log(persondata);
    const userInfo = store.get("garage-wechat-user");
    const chosen = store.get("chosenOrganizationName");
    // console.log(dataii);
    // let chosenOrganizationName = "";
    // let chosenTime = "";
    if (persondata) {
      this.setState({
        person: persondata,
      });
    } else {
      fetch({
        url: "wx/user/selfInfo",
        method: "GET",
        // entity: values,
        success(res) {
          const data = res.entity.obj;
          // console.log(data, 1111);
          const dataPerson = {
            phone: data.mobile,
            cardid: data.cardId,
            name: data.name,
          };
          _this.setState({
            person: dataPerson
          });
        }
      });
    }
    // console.log(111);
    if (chosenDetail && chosenDetail.date && chosenDetail.time) {
      // console.log(chosenDetail);
      this.setState({
        chosenOrganizationName: chosen,
        chosenTime: `${chosenDetail.month}-${chosenDetail.date} ${chosenDetail.time.beginTime}--${chosenDetail.time.endTime}`,
        memberId: userInfo.id,
        chosenDetail: chosenDetail,
      });
      // chosenOrganizationName = store.get("chosenOrganizationName");
      // chosenTime = `${chosenDetail.month}-${chosenDetail.date} ${chosenDetail.time.beginTime}--${chosenDetail.time.endTime}`;
      // values.appointDate = `${chosenDetail.month}-${chosenDetail.date}`;
      // values.healthRuleId = chosenDetail.time.id;
      // values.mbHealthCenterId = chosenDetail.organizationId;
      // values.payPaymentMethodId = 1;
      // values.offsetAmount = 150;
      // values.memberId = userInfo.id;
    }
  }
  // inquire(e) {
  //   e.preventDefault();
  //   const values = $(this.props.id).val();
  //   // console.log(values, 6666);
  //   this.props.onchangeFun(values);
  // }
  render() {
    return (
      <div className={styles.bg}>
        <PersonalInformation
          chosenOrganizationName={this.state.chosenOrganizationName}
          chosenTime={this.state.chosenTime}
          memberId={this.state.memberId}
          person={this.state.person}
          chosenDetail={this.state.chosenDetail}
          // function={() => { this.getStore(); }}
        />
      </div>
    );
  }
}

export { View as default };
