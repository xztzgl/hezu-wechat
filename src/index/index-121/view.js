import React from "react";
import Router from "srcDir/common/router/route";
import Home from "srcDir/homepage/index/index/route";
// import Home from "srcDir/organization/index/index/route";
import store from "store2";
import ModalFrame from "srcDir/common/modalFrame/route";
import ChooseLocation from "srcDir/common/navigatorGeolocation/chooseLocation";
// 发送请求时添加Spin
import Spin from "srcDir/common/spin/index";
// 获取码表并存入seesionStorage以提供给select组件数据
import getCodeMap from "srcDir/common/model/codeMapModel/index";
import styles from "./style.less";

// getCodeMap({
//   url: "/common/code-map",
//   success: (res) => {
//     // console.log(res, 13121312);
//     const codeMap = res.entity;
//     // console.log(codeMap);
//     // const newCodeMap = JSON.stringify(codeMap);
//     // const oldCodeMap = JSON.stringify(store.session.get("codeMap"));
//     // if (newCodeMap !== oldCodeMap) {
//     store.session.set("codeMap", codeMap);
//     // }
//   }
// });
// getCodeMap({
//   url: "/common/district",
//   method: "GET",
//   success(res) {
//     const data = res.entity;
//     store.session.set("district", data);
//     // _this.setState({
//     //   district: data.obj
//     // });
//   }
// });
// getCodeMap({
//   url: "/sys/area/tree",
//   method: "GET",
//   // params: {
//   //   phoneNumber: phonelength,
//   // },
//   success(res) {
//     const data = res.entity.obj;
//     // console.log(data);
//     store.session.set("citys", data);
//   }
// });
// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
    this.getSession = this.getSession.bind(this);
  }
  componentWillMount() {
    getCodeMap({
      url: "/common/code-map",
      success: (res) => {
        // console.log(res, 13121312);
        const codeMap = res.entity;
        // console.log(codeMap);
        // const newCodeMap = JSON.stringify(codeMap);
        // const oldCodeMap = JSON.stringify(store.session.get("codeMap"));
        // if (newCodeMap !== oldCodeMap) {
        store.session.set("codeMap", codeMap);
        // }
      }
    });
    getCodeMap({
      url: "/common/district",
      method: "GET",
      success(res) {
        const data = res.entity;
        store.session.set("district", data);
        // _this.setState({
        //   district: data.obj
        // });
      }
    });
  }
  componentDidMount() {
    // const district = store.session.get("district");
    // const codeMap = store.session.get("district");
    this.getSession();
  }
  getSession() {
    const _this = this;
    const o = setInterval(() => {
      const district = store.session.get("district");
      const codeMap = store.session.get("district");
      if (district && codeMap) {
        clearInterval(o);
        _this.setState({
          open: false,
        });
      }
    }, 500);
  }

  // $passing(id) {
  //   if (!id) {
  //     return Promise.resolve({});
  //   }
  //   return new Promise(resolve => {
  //     fetch({
  //       url: configURL.remoteServer.basisUrl + "/enterprise/approval?id=" + id,
  //       // params: { id },
  //       method: "POST",
  //       success({ entity }) {
  //         if (!entity.success) {
  //           message.error(entity.msg || "数据获取错误");
  //         }
  //         resolve(entity.data || entity.msg);
  //       },
  //       error() {
  //         resolve({});
  //       },
  //     });
  //   });
  // }
  render() {
    return (
      <ModalFrame>
        <Router>
          <div className={styles.container}>
            <Spin />
            <nav className={styles.nav} />
            <article id="contentContainer" className={styles.content} >
              {this.state.open ? <Home /> : ""}
            </article>
            <ChooseLocation />
          </div>
        </Router>
      </ModalFrame>
    );
  }
}
// const View = () => (
//   <ModalFrame>
//     <Router>
//       <div className={styles.container}>
//         <Spin />
//         <nav className={styles.nav} />
//         <article id="contentContainer" className={styles.content} >
//           <Home />
//         </article>
//         <ChooseLocation />
//       </div>
//     </Router>
//   </ModalFrame>
// );

export { View as default };
