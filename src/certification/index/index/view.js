import React from "react";
import { render } from "react-dom";

// import { Icon } from "antd-mobile";
import fetch from "srcDir/common/ajax/index";
// // import openMap from "srcDir/common/weichat/openMap";
// // import Cookies from "js-cookie";
// import navigatorGeolocation from "./navigatorGeolocation";
// import history from "srcDir/common/router/history";
// import store from "store2";
import store from "store2";
const userType = store.get("userType");
import Conment from "srcDir/common/viewform/searchFail/view";
import List from "srcDir/common/viewform/list/view";
import Listb from "srcDir/common/viewform/listb/view";
import styles from "./style.less";

// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    // console.log(data);
    this.state = {
      takePictures: false,
      name: "",
      mobile: "",
      move: false,
      idnum: 2,
      page: 2,
    };
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onScroll = this.onScroll.bind(this);
    // this.headerimg = this.headerimg.bind(this);
    // console.log(props, 2222);
  }
  // componentDidMount() {
  //   // console.log(this.props.results && this.props.results.rows, 111);
  // }
  onTouchMove() {
    this.setState({
      move: true,
    });
  }
  // onTouchStart(e) {
  //   console.log(333, e.touches);
  // }
  onScroll() {
    // console.log(this.state.page);
    const _this = this;
    const { props } = this;
    if (this.state.move) {
      // console.log(2222);
      fetch({
        url: "/wx/report/list",
        method: "POST",
        params: {
          // orderStatusCode,
          _index: _this.state.page,
          // sort: "t.lastModifiedDate desc"
        },
        // entity: {
        //   orderStatusCode,
        //   _index: props.results.page + 1,
        //   // sort: "t.lastModifiedDate desc"
        // }
        success(res) {
          // console.log(res.entity);
          // const idname = "list" + _this.state.idnum;
          // console.log(idname, $.parseJSON(res.entity));
          const datalist = $.parseJSON(res.entity);
          if (datalist.rows.length > 0) {
            const iddiv = "list" + (_this.state.idnum + 1);
            $(`#list${_this.state.idnum}`).parent().append("<div id='" + iddiv + "'></div>");
          }
          render(
            <div>
              {
                datalist.rows.length > 0 ? <List router={props.router} data={datalist.rows} /> : <div className={styles.noMore}>
                  <div></div><div>没有更多了</div><div></div>
                </div>
              }
            </div>
            , document.getElementById(`list${_this.state.idnum}`)
          );
          // console.log(_this.state.page + 1);
          _this.setState({
            move: false,
            idnum: _this.state.idnum + 1,
            page: _this.state.page + 1,
          });
        }
      });
    }
  }
  render() {
    // console.log(this.props.results && (this.props.results.rows));
    const { props } = this;
    return (
      <div>
        {
        userType === "U_001_03" ? <div>
          <Listb router={props.router} />
        </div> : <div>
          {
            (this.props.results && (this.props.results.rows.length > 0)) ? <div
              onTouchMove={(e) => { this.onTouchMove(e); }}
              // onTouchStart={(e) => { this.onTouchStart(e); }}
              onTouchEnd={(e) => { this.onScroll(e); }}
            >
              <List router={props.router} data={this.props.results.rows} />
              <div id="list2"></div>
            </div> : <Conment
              dataaction="暂无健康证明！"
              datatitle="您还没有健康证明，快去体检吧！"
              disabled="0"
              features={() => { this.takePictures(); }}
              classname={styles.certificate}
              bottonName="开始拍摄"
            />
          }
        </div>
      }
      </div>
    );
  }
}

export { View as default };
