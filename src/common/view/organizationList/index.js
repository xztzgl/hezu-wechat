import React from "react";
// import { render } from "react-dom";

import { Button, Popover, Toast } from "antd-mobile";
import fetch from "srcDir/common/ajax/index";
// // import openMap from "srcDir/common/weichat/openMap";
import Cookies from "js-cookie";
import store from "store2";
// import navigatorGeolocation from "./navigatorGeolocation";
import history from "srcDir/common/router/history";
import FilterSelect from "srcDir/common/view/filterSelect/index";
import CityModel from "srcDir/common/model/cityModel/index";
import OrganizationListItem from "./organizationListItem";
import styles from "./style.less";

const locationAddress = Cookies.get("locationAddress");
const { longitude, latitude } = JSON.parse(Cookies.get("location"));
// console.log(locationAddress);
// console.log(CityModel);

const nearbyData = [
  {
    label: "附近",
    value: ""
  }
];
CityModel.filter(v => RegExp(v.label).test(locationAddress))
  .map(v => v.children.map(
    x => nearbyData.push(x)
  ));

const rankingData = [
  {
    label: "离我最近",
    value: "NEAR"
  },
  {
    label: "人气最高",
    value: "HEAT"
  },
];

const Item = Popover.Item;

let oldState = {};
let _index = 1;
// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selected: "",
      selectedName: "",
      areaId: "",
      orderBy: "",
      getMore: []
    };
    this.nearby = this.nearby.bind(this);
    this.ranking = this.ranking.bind(this);
    this.getMore = this.getMore.bind(this);
    this.chooseLocation = this.chooseLocation.bind(this);
    _index = 1;
    // console.log(this.state);
  }
  componentDidMount() {
    // const windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    // const bodyh = $("#root").height();
    // const height = windowH - bodyh;
    // console.log(height);
    // if (height) {
    //   $(".bottomHieght").css({ height: `${height}px`, backgroundColor: "#e9e9e9" });
    // }
    $("html,body").css("backgroundColor", "#e9e9e9");
  }
  componentWillUpdate() {
    oldState = this.state;
  }
  componentDidUpdate() {
    // console.log(this.props.actions);
    const { areaId, orderBy } = this.state;
    if (areaId !== oldState.areaId || orderBy !== oldState.orderBy) {
      this.props.actions.search({
        areaId,
        orderBy,
      });
    }
  }
  componentWillUnmount() {
    oldState = null;
    $("html,body").css("backgroundColor", "#fff");
  }
  getMore() {
    const _this = this;
    const { totalPage } = this.props.data;
    // console.log("131312");
    // console.log(this.props);
    const { areaId, orderBy } = this.state;
    _index += 1;
    if (_index > totalPage) {
      Toast.fail("已经到底啦");
      return false;
    }
    fetch({
      url: "/mb/health/center/list",
      // method: "POST",
      params: {
        areaId,
        orderBy,
        _index: _index,
        longitude,
        latitude,
        _size: "4",
      },
      success(res) {
        const data = JSON.parse(res.entity);
        console.log(data);
        if (data && data.rows && data.rows.length > 0) {
          const arr = _this.state.getMore;
          data.rows.map(v => arr.push(v));
          _this.setState({
            getMore: arr
          });
        }
      }
    });
  }
  chooseLocation() {
    // const _this = this;
    const { addRoute } = this.props.router;
    // console.log(this.props.router, 11111);
    const { areaId, orderBy } = this.state;
    const getViewportSize = () => ({
      width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
      height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    });
    const { width, height } = getViewportSize();
    history.push("/gis");
    const mapIframe = window.$("#js-map");
    mapIframe.css({
      width: `${width}px`,
      height: `${height}px`,
      border: "0",
    })
      .attr("src", "/index/map/page.html")
      .show(500);
    fetch({
      url: "/mb/health/center/list",
      // method: "POST",
      params: {
        areaId,
        orderBy,
        // _index: _index,
        longitude,
        latitude,
        _size: "10",
      },
      success(res) {
        const data = JSON.parse(res.entity);
        // console.log(data);
        if (data && data.rows && data.rows.length > 0) {
          const arr = [];
          window.map2detail = ({ id, position, distance, area }) => {
            store.set("organizationDetail", {
              position,
              distance,
              area,
            });
            addRoute({ keyName: "体检点详情", path: `/organization/detail/${id}`, name: "体检点详情", title: `/organization/detail/${id}`, component: "organization/detail/index", paramId: id });
            window.$("#js-map").hide();
          };
          data.rows.map(v => arr.push({
            position: [v.longitude, v.latitude],
            title: v.name,
            content: [
              `<img src=${v.headImage}>地址：${v.address}`,
              // "电话：010-64733333",
              `<a href='javascript:this.parent.map2detail({
                id: ${v.id},
                position: [${v.longitude}, ${v.latitude}],
                distance: ${v.distance},
                area: "${v.area}"
              })'>详细信息</a>`
            ]
          })
          );
          console.log(arr);
          window.iframeMap.onload = function () {
            this.makeMarker(arr);
          };
        }
      }
    });
  }
  nearby() {
    const { state } = this;
    return nearbyData.map(v =>
      (<Item
        className={`${styles.popoverItem} ${(state.areaId === v.value) && styles.yellow}`}
        key={`ranking-${v.value}`}
        value={v.value}
      >{v.label}</Item>)
    );
  }
  ranking() {
    const { state } = this;
    return rankingData.map(v =>
      (<Item
        className={`${styles.popoverItem} ${(state.orderBy === v.value) && styles.yellow}`}
        key={`ranking-${v.value}`}
        value={v.value}
      >{v.label}</Item>)
    );
  }

  render() {
    const _this = this;
    const { props, state } = this;
    return (
      <div>
        <filter className={styles.filter}>
          <FilterSelect
            title="附&emsp;近"
            placement="bottomLeft"
            className={styles.filterSelect}
            data={_this.nearby()}
            parentThis={_this}
            paramsName="areaId"
          />
          <FilterSelect
            title="综合排名"
            placement="bottomLeft"
            className={styles.filterSelect}
            data={_this.ranking()}
            parentThis={_this}
            paramsName="orderBy"
          />
          <div className={styles.location} onClick={() => _this.chooseLocation()} role="button" tabIndex="0" />
        </filter>
        {
          props.data && props.data.rows && props.data.rows.map(v => <OrganizationListItem className={styles.organizationListItem} data={v} router={props.router} />)
        }
        {
          state.getMore && state.getMore.map(v => <OrganizationListItem className={styles.organizationListItem} data={v} router={props.router} />)
        }
        {
          props.data && props.data.rows && props.data.rows.length > 0 && <div className={styles.wrapper}>
            <Button className={`btn ${styles.button}`} type="primary" onClick={_this.getMore}>
              查看更多
            </Button>
          </div>
        }
        <div className="bottomHieght"></div>
      </div>
    );
  }
}

export { View as default };
