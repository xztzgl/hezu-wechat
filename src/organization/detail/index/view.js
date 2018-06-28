import React from "react";
import store from "store2";
import { Toast } from "antd-mobile";
import history from "srcDir/common/router/history";
import Information from "srcDir/organization/detail/information/index";
import Datepicker from "srcDir/organization/detail/datepicker/index";
import FooterBottom from "srcDir/common/viewform/footerBottom/view";
import fetch from "srcDir/common/ajax/indexWithBody";

// // 创建react组件
// const View = (props) => {
//   console.info("organization/detail/index");
//   console.log(props);
//   let price = "0";
//   fetch({
//     url: "/wx/hc/pc/getTJAmount",
//     method: "GET",
//     params: {
//       healthCenterId: props.pid,
//     },
//     success(res) {
//       const data = res.entity;
//       // console.log(data);
//       if (data.success) {
//         // console.log(data);
//         price = data.obj;
//         // _this.setState({
//         //   price: data.obj
//         // });
//       }
//     }
//   });
//   const pay = () => {
//     const chosenDetail = store.get("chosenDetail");
//     console.log(chosenDetail);
//     if (Object.values(chosenDetail).filter(v => !v).length === 0) {
//       history.push("/personalBooking/");
//     } else {
//       Toast.fail("请选择日期和时间");
//     }
//   };

//   return (
//     <div>
//       <Information data={props.results && props.results.obj} />
//       <Datepicker pid={props.pid} />
//       <FooterBottom price={price} displayed="1" buttonName="立即预约" onClickFun={pay} />
//     </div>
//   );
// };

// export { View as default };
class View extends React.Component {
  constructor(props) {
    super(props);
    console.log(props, 11111);
    this.state = {
      id: props.pid,
      price: 0,
    };
  }
  componentDidMount() {
    const _this = this;
    fetch({
      url: "/wx/hc/pc/getTJAmount",
      method: "GET",
      params: {
        healthCenterId: _this.state.id,
      },
      success(res) {
        const data = res.entity;
        // console.log(data);
        if (data.success) {
          // console.log(data);
          // price = data.obj;
          _this.setState({
            price: data.obj
          });
        }
      }
    });
  }
  pay() {
    const chosenDetail = store.get("chosenDetail");
    // console.log(chosenDetail);
    if (Object.values(chosenDetail).filter(v => !v).length === 0) {
      history.push("/personalBooking/");
    } else {
      Toast.fail("请选择日期和时间");
    }
  }
  render() {
    // const datadd = "";
    const { props } = this;
    // console.log(this.props, 23232);
    return (
      <div >
        <Information data={props.results && props.results.obj} />
        <Datepicker pid={props.pid} />
        <FooterBottom price={this.state.price} displayed="1" buttonName="立即预约" onClickFun={() => this.pay()} />
      </div>
    );
  }
}
export { View as default };
