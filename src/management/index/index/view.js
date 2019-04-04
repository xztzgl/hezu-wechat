import React from "react";
// import { render } from "react-dom";
import styles from "./style.less";
import { Popover, Modal, Toast } from "antd-mobile";
import FilterSelect from "srcDir/common/view/filterSelect/index";
import store from "store2";
import history from "srcDir/common/router/history";
import fetch from "srcDir/common/ajax/index";
// 创建react组件
const codeMap = store.session.get("codeMap");
const genderCode = codeMap.filter((x) => /R_003\S+/.test(x.code) === true);
const result1 = [];
genderCode.map(v => {
  if (v.code !== "R_003_03") {
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
    return require("srcDir/images/qualified.png");
  },
  unqualified() {
    return require("srcDir/images/Unqualified.png");
  },
  nolicense() {
    return require("srcDir/images/nolicense.png");
  }
};
const keyname = {
  R_003_01: "qualified",
  R_003_02: "unqualified",
  R_003_03: "nolicense",
};
// const nearbyData = [
//   {
//     label: "附近",
//     value: ""
//   }
// ];
// CityModel.filter(v => RegExp(v.label).test(locationAddress))
//   .map(v => v.children.map(
//     x => nearbyData.push(x)
//   ));

// const rankingData = [
//   {
//     label: "离我最近",
//     value: "NEAR"
//   },
//   {
//     label: "人气最高",
//     value: "HEAT"
//   },
// ];
const Item = Popover.Item;
const alert = Modal.alert;

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
      true: false,
      // ww: console.log(window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight)
    };
    this.more = this.more.bind(this);
    this.getStore = this.getStore.bind(this);
    this.del = this.del.bind(this);
    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    // console.log(props, 2222);
  }
  componentDidMount() {
    const windowbody = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const height = windowbody - 116;
    // console.log(height, 12222);
    const _this = this;
    fetch({
      url: "/wx/position/myPosition",
      method: "GET",
      // params: {
      //   phoneNumber: phonelength,
      // },
      success(res) {
        const data = JSON.parse(res.entity);
        _this.setState({
          rankingData: data.obj,
          height: height,
        });
      }
    });
    this.getStore({});
  }
  componentWillUpdate() {
    oldState = this.state;
    // console.log(this, "4444");
  }
  componentDidUpdate() {
    const { position, result } = this.state;
    if (position !== oldState.position || result !== oldState.result) {
      // console.log(position, oldState.position, result, oldState.result);
      if (position && !result) {
        this.getStore({ position: position });
      } else if (!position && result) {
        this.getStore({ result: result });
      } else if (position && result) {
        this.getStore({ result: result, position: position });
      }
    }
  }
  onTouchStart() {
    const list = this.list.scrollTop;
    const scroll = this.scroll.offsetHeight;
    const poorDistance = scroll - list <= this.state.height ? 1 : false;
    if (poorDistance) {
      const values = {
        position: oldState.position,
        result: oldState.result,
        _index: this.state.index,
        _size: this.state.size,
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
  getStore(values) {
    const _this = this;
    // console.log(this);
    // console.log(typeof(values.position));
    if (!values.position) {
      delete values.position;
    } else {
      values._index = 1;
    }
    if (!values.result) {
      delete values.result;
    } else {
      values.index = 1;
    }
    fetch({
      url: "/wx/employee/info/list",
      method: "POST",
      params: values,
      // entity: values,
      success(res) {
        const data = JSON.parse(res.entity);
        // console.log(_this.state.listData.concat(data.rows));
        if (_this.state.del) {
          _this.setState({
            listData: data.rows,
            // index: _this.state.index + 1,
          });
        } else {
          if (values.result || values.position) {
            _this.setState({
              listData: data.rows,
              // index: _this.state.index + 1,
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
        }
        // console.log(data, 123333);
      }
    });
  }
  nearby() {
    const { state } = this;
    return state.rankingData.map(v =>
      (<Item
        className={`${styles.popoverItem} ${(state.areaId === v.value) && styles.yellow}`}
        key={`ranking-${v.value}`}
        value={v.value}
      >{v.label}</Item>)
    );
  }
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
  addStaff() {
    history.push("/management/staff");
  }
  more(e) {
    this.setState({
      show: e,
      open: false
    });
  }
  personalBooking(name, cardId) {
    // console.log(name, cardId);
    store.set("IdcardTrue", true);
    store.set("IDcard", {
      name: name,
      cardId: cardId,
    });
    history.push("/personalBooking");
  }
  edit(e) {
    store.set("employee", e);
    this.setState({
      open: false,
    });
    history.push("/management/staff");
  }
  closed() {
    this.setState({
      open: true
    });
  }
  del(e) {
    const _this = this;
    // console.log(this);
    fetch({
      url: "/wx/employee/info/leave",
      method: "POST",
      params: {
        id: e
      },
      // entity: values,
      success(res) {
        const data = JSON.parse(res.entity);
        // console.log(data, _this);
        if (data.success) {
          _this.setState({
            del: true,
            open: true
          });
          _this.getStore({});
          Toast.success(data.msg);
        } else {
          Toast.fail(data.msg);
        }
        // console.log(data, 123333);
      }
    });
  }
  transferKong(e, id) {
    store.set("position", e);
    store.set("ide", id);
    history.push("/management/transferKong");
  }
  render() {
    const _this = this;
    return (
      <div className={styles.bg}>
        <filter className={styles.filter}>
          <FilterSelect
            title="岗&emsp;位"
            placement="bottomLeft"
            className={styles.filterSelect}
            data={_this.nearby()}
            parentThis={_this}
            paramsName="position"
          />
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
          <div onTouchStart={(e) => this.onTouchStart(e)} id="scroll" ref={(e) => { this.scroll = e; }}>
            {
              this.state.listData.map((v, index) => {
                const sex = v.gender === "M_003_01" ? require("srcDir/images/m.png") : require("srcDir/images/w.png");
                const key = v.resultCode ? v.resultCode : "R_003_03";
                return (
                  <div className={styles.staffList}>
                    <div className={styles.content}>
                      <div>
                        <img src={`data:image/png;base64,${v.head}`} alt="" />
                      </div>
                      <div className={styles.information} style={{ backgroundImage: "url(" + document[keyname[key]]() + ")" }}>
                        <div>
                          <span>{v.name}</span>
                          <span><img className={styles.sex} src={sex} alt="" /></span>
                          <span className={styles.line}> </span>
                          <span>{v.positionName}</span>
                        </div>
                        <div>身份证号：{v.cardid}</div>
                        <div>体检日期：<span>{v.meDate}</span>{v.meDate && <span style={{ color: "#f83d46" }}>已过期</span>}</div>
                      </div>
                    </div>
                    <div className={styles.staffOperating}>
                      <div onClick={() => this.personalBooking(v.name, v.cardid)}><div className={styles.public}><span></span><span>预约体检</span></div></div>
                      <div onClick={() => this.transferKong(v.position, v.id)}><div className={styles.public}><span></span><span>调岗</span></div></div>
                      <div onClick={() => this.more(index)} className={styles.more}><div className={styles.public}><span></span><span>更多</span></div>
                        {
                          _this.state.show === index && <div className={styles.operating} style={_this.state.open ? { display: "none" } : { display: "block" }}>
                            <div className={styles.operat}>
                              <div onClick={() => _this.edit(v.id)}>编辑</div>
                              <div
                                onClick={() => alert("离职", "确定要给" + v.name + "办离职？", [
                                { text: "取消", onPress: () => _this.closed() },
                                { text: "确定", onPress: () => _this.del(v.id) },
                                ])}
                              >离职</div>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
          {/* <div className={styles.staffList} >
            <div className={styles.content}>
              <div>
                <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3553127246,3035985027&fm=27&gp=0.jpg" alt="" />
              </div>
              <div className={styles.information}>
                <div>
                  <span>王金晓</span>
                  <span></span>
                  <span>1</span>
                  <span>服务员</span>
                </div>
                <div>身份证号：4202341199899999999</div>
                <div>体检日期：2017年8月18日<span style={{ color: "#f83d46" }}>已过期</span></div>
              </div>
            </div>
            <div className={styles.staffOperating}>
              <div>预约体检</div>
              <div>调岗</div>
              <div>更多</div>
            </div>
          </div> */}
        </div>
        <div className={styles.foot}>
          <button>批量导入员工</button>
          <button onTouchEnd={() => this.addStaff()}>员工登记</button>
        </div>
      </div>
    );
  }
}

export { View as default };
