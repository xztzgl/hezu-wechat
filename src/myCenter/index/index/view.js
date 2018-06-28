import React from "react";
// import { render } from "react-dom";

// import styles from "./style.less";
// import { Carousel, Flex, Button, List, Toast } from "antd-mobile";
// import fetch from "srcDir/common/ajax/index";
// // import openMap from "srcDir/common/weichat/openMap";
// // import Cookies from "js-cookie";
// import navigatorGeolocation from "./navigatorGeolocation";
// import history from "srcDir/common/router/history";
import CenterContent from "srcDir/myCenter/index/myCenterContent/view";


// 创建react组件
// const View = (props) => {
//   // console.info("myCenter/index/index");
//   // console.log(props);
//   return (
//     <div>
//       <CenterContent data={props.results && props.results.obj} />
//     </div>
//   );
// };
const View = props => <div><CenterContent data={props.results && props.results.obj} modal={props.modal} /></div>;

export { View as default };
