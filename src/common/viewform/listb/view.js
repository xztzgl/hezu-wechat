import React from "react";
// import { render } from "react-dom";
import styles from "./style.less";
import { Popover, Toast } from "antd-mobile";
import FilterSelect from "srcDir/common/view/filterSelect/index";
import store from "store2";
// import history from "srcDir/common/router/history";
import fetch from "srcDir/common/ajax/index";
// 创建react组件
const codeMap = store.session.get("codeMap");
const genderCode = codeMap.filter((x) => /R_003\S+/.test(x.code) === true);
const result1 = [];
genderCode.map(v => {
  if (v.code !== "R_003_03" && v.code !== "R_003_04") {
    const obj = {
      value: v.code,
      label: v.name
    };
    result1.push(obj);
  }
  return true;
});
const document = {
  qualified() {
    return "合格";
  },
  unqualified() {
    return "不合格";
  },
  nolicense() {
    return "无";
  }
};
const keyname = {
  R_003_01: "qualified",
  R_003_02: "unqualified",
  R_003_03: "nolicense",
};
const Item = Popover.Item;
// const alert = Modal.alert;

let oldState = {};
// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenOrganizationName: "",
      chosenTime: "",
      memberId: "",
      person: {},
      rankingData: [],
      listData: [],
      height: 0,
      index: 1,
      size: 4,
      del: false,
      move: false,
      // ww: console.log(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
    };
    // this.more = this.more.bind(this);
    this.getStore = this.getStore.bind(this);
    // this.del = this.del.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.setheight = this.setheight.bind(this);
    this.setResult = this.setResult.bind(this);
  }
  componentDidMount() {
    // console.log(height, 12222);
    // const _this = this;
    // fetch({
    //   url: "/wx/position/myPosition",
    //   method: "GET",
    //   // params: {
    //   //   phoneNumber: phonelength,
    //   // },
    //   success(res) {
    //     const data = JSON.parse(res.entity);
    //     _this.setState({
    //       rankingData: data.obj,
    //       height: height,
    //     });
    //   }
    // });
    this.setheight();
    this.getStore({});
  }
  componentWillUpdate() {
    oldState = this.state;
    // console.log(this, "4444");
  }
  componentDidUpdate() {
    // console.log(this.state);
    const { result } = this.state;
    if (result !== oldState.result) {
      // console.log(position, oldState.position, result, oldState.result);
      this.getStore({ result: result });
      // if ( !result) {
      //   this.getStore({ position: position });
      // } else if (!position && result) {
      //   this.getStore({ result: result });
      // } else if (position && result) {
      //   this.getStore({ result: result, position: position });
      // }
    }
    // console.log(this, "333");
  }
  onTouchStart() {
    const list = this.list.scrollTop;
    const scroll = this.scroll.offsetHeight;
    const poorDistance = scroll - list <= this.state.height ? 1 : false;
    if (poorDistance) {
      const values = {
        // position: oldState.position,
        result: oldState.result,
        _index: this.state.index,
        // _size: this.state.size,
      };
      if (this.state.move) {
        this.getStore(values);
      }
    }
  }
  onTouchMove() {
    this.setState({
      move: true,
    });
  }
  setResult() {
    this.setState({
      _index: "1",
    });
  }
  setheight() {
    const windowbody = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const height = windowbody - 66;
    this.setState({
      height: height,
    });
  }
  getStore(values) {
    const _this = this;
    values._size = "6";
    if (!values.result) {
      delete values.result;
    }
    // console.log(values, 1323);
    fetch({
      url: "/wx/employee/info/healthList",
      method: "POST",
      params: values,
      // entity: values,
      success(res) {
        const data = JSON.parse(res.entity);
        // console.log(_this.state.listData.concat(data.rows));
        if (values.result) {
          _this.setState({
            listData: data.rows,
            index: _this.state.index + 1,
          });
        } else {
          if (data.rows.length > 0) {
            _this.setState({
              listData: _this.state.listData.concat(data.rows),
              index: _this.state.index + 1,
            });
          } else {
            Toast.info("没有更多数据");
          }
        }
        // console.log(data, 123333);
      }
    });
  }
  // nearby() {
  //   const { state } = this;
  //   return state.rankingData.map(v =>
  //     (<Item
  //       className={`${styles.popoverItem} ${(state.areaId === v.value) && styles.yellow}`}
  //       key={`ranking-${v.value}`}
  //       value={v.value}
  //     >{v.label}</Item>)
  //   );
  // }
  ranking() {
    const { state } = this;
    return result1.map(v =>
      (<Item
        className={`${styles.popoverItem} ${(state.orderBy === v.value) && styles.yellow}`}
        key={`ranking-${v.value}`}
        value={v.value}
      >{v.label}</Item>)
    );
  }
  render() {
    const _this = this;
    const { addRoute } = this.props.router;
    const onClick = (id) => {
      // console.log(id);
      addRoute({
        keyName: "电子健康证详情",
        path: `/electronicHealthCertificate/detail/${id}`,
        name: "体检点详情", title: `/certification/detail/${id}`,
        component: "myCenter/electronicHealthCertificate/detail",
        paramId: id
      });
    };
    return (
      <div className={styles.bg}>
        <filter className={styles.filter}>
          {/* <FilterSelect
            title="岗&emsp;位"
            placement="bottomLeft"
            className={styles.filterSelect}
            data={_this.nearby()}
            parentThis={_this}
            paramsName="position"
          /> */}
          <FilterSelect
            title="体检结果"
            placement="bottomLeft"
            className={styles.filterSelect}
            data={_this.ranking()}
            parentThis={_this}
            paramsName="result"
          />
        </filter>
        <div className={styles.list} style={{ height: _this.state.height + "px" }} id="list" ref={(e) => { this.list = e; }}>
          <div onTouchStart={(e) => this.onTouchStart(e)} onTouchMove={() => this.onTouchMove()} id="scroll" ref={(e) => { this.scroll = e; }}>
            {
              this.state.listData.map((v) => {
                const sex = v.gender === "M_003_01" ? require("srcDir/images/m.png") : require("srcDir/images/w.png");
                const key = v.resultCode ? v.resultCode : "R_003_03";
                return (
                  <div className={styles.staffList} onClick={() => onClick(v.id)}>
                    <div className={styles.content}>
                      <div>
                        <img src={v.head} alt="" />
                      </div>
                      <div className={styles.information} >
                        <div>
                          <span>{v.name}</span>
                          <span><img className={styles.sex} src={sex} alt="" /></span>
                          <span className={styles.line}> </span>
                          <span>{v.positionName}</span>
                        </div>
                        <div>身份证号：{v.cardid}</div>
                        <div>体检结果：<span style={v.resultCode === "R_003_01" ? { color: "#4175ff" } : { color: "#c20303" }}>{document[keyname[key]]()}</span></div>
                        <div>体检日期：<span>{v.meDate}</span></div>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export { View as default };
