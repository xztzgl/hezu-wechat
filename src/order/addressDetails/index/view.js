import React from "react";
// import store from "store2";
// import { Toast } from "antd-mobile";
// import history from "srcDir/common/router/history";
import Information from "srcDir/order/addressDetails/information/index";
// import Datepicker from "srcDir/organization/detail/datepicker/index";
// import FooterBottom from "srcDir/common/viewform/footerBottom/view";

// 创建react组件
// const View = (props) => {
//   console.info("organization/detail/index");
//   // console.log(props, 342143);

//   // const pay = () => {
//   //   const chosenDetail = store.get("chosenDetail");
//   //   console.log(chosenDetail);
//   //   if (Object.values(chosenDetail).filter(v => !v).length === 0) {
//   //     history.push("/personalBooking/");
//   //   } else {
//   //     Toast.fail("请选择日期和时间");
//   //   }
//   // };
//   // const organizationDetail = store.get("organizationDetail");
//   const { data } = props;
//   if (data && data.name) {
//     store.set("chosenOrganizationName", data.name);
//   }
//   const getViewportSize = () => ({
//     width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
//     height: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 284,
//   });
//   const { width, height } = getViewportSize();
//   const mapIframe = window.$("#js-map");
//   mapIframe.css({
//     width: `${width}px`,
//     height: `${height}px`,
//     border: "0",
//   })
//     .attr("src", "/index/map/page.html");
//   const address = (date) => {
//     if (date && date.name) {
//       console.log(date, 43214314123);
//       mapIframe.show(500);
//       const arr = [];
//       const back = "this.parent.$('#js-map').hide()";
//       arr.push({
//         position: [date.longitude, date.latitude],
//         title: date.name,
//         content: [
//           `<img src=${date.headImage}>地址：${date.address}`,
//           "电话：010-64733333",
//           `<a href="javascript:${back}">返回</a>`
//         ]
//       });
//       // console.log(arr);
//       window.iframeMap.makeMarker(arr);
//     }
//   };
//   return (
//     <div>
//       <Information data={props.results && props.results.obj} />
//       {
//         (props.results && props.results.obj) ? address(props.results.obj) : ""
//       }
//     </div>
//   );
// };
const getViewportSize = () => ({
  width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
  height: (window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight) - 284,
});
const { width, height } = getViewportSize();
const mapIframe = window.$("#js-map");
mapIframe.css({
  width: `${width}px`,
  height: `${height}px`,
  border: "0",
});

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // phonetext: "",
      // verificationCode: "",
      // phone: "",
      // code: "",
      // switch: true,
    };
    // this.getVerificationCode = this.getVerificationCode.bind(this);
    // this.verifyThePhone = this.verifyThePhone.bind(this);
    // this.setSwitch = this.setSwitch.bind(this);
    // this.loginfunction = this.loginfunction.bind(this);
    // this.verifyVerficationcode = this.verifyVerficationcode.bind(this);
    // this.onTabClick = this.onTabClick.bind(this);
    // console.log(props, 2222);
  }
  // componentDidMount() {
  // }
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps, 123123);
    this.address(nextProps.results.obj);
  }
  address(date) {
    // console.log(height);
    setTimeout(function () {
      // console.log(date, 12333);
      if (date && date.name) {
        // console.log(date, 43214314123);
        $("#js-map").css({
          position: "inherit",
          height: `${height}px`,
        });
        mapIframe.show();
        const arr = [];
        const back = "this.parent.$('#js-map').hide()";
        arr.push({
          position: [date.longitude, date.latitude],
          title: date.name,
          content: [
            `<img src=${date.headImage}>地址：${date.address}`,
            "电话：010-64733333",
            `<a href="javascript:${back}">返回</a>`
          ]
        });
        // console.log(arr);
        window.iframeMap.makeMarker(arr);
      }
    }, 1000);
  }
  render() {
    return (
      <div>
        <Information data={this.props.results && this.props.results.obj} />
      </div>
    );
  }
}
export { View as default };
