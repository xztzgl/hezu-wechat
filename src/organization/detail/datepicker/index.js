import React from "react";
import moment from "moment";
import numeral from "numeral";

import { Carousel, Flex } from "antd-mobile";
// import history from "srcDir/common/router/history";
import store from "store2";
import fetch from "srcDir/common/ajax/index";
import styles from "./style.less";

const codeMap = store.session.get("codeMap");
const gender = codeMap.filter(x => /M_003\S+/.test(x.code) === true);
const genderData = [];
gender.map(x => genderData.push({
  value: x.code,
  label: x.name
}));
console.log(genderData);

const dotImage = require("srcDir/images/mark_next@3x.png");
const dotActiveImage = require("srcDir/images/mark_now@3x.png");

const dotStyle = {
  width: "20px",
  height: "4px",
  marginBottom: "5px",
  borderRadius: "0",

  background: `url(${dotImage}) center no-repeat /contain`
};
const dotActiveStyle = Object.assign({}, dotStyle, {
  background: `url(${dotActiveImage}) center no-repeat /contain`
});


// 创建react组件
class View extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    const thisWeek = [];
    const nextWeek = [];
    for (let i = 0; i < 7;) {
      thisWeek.push({
        date: moment().add(i, "days").date(),
        day: moment().add(i, "days").locale("zh-cn")
          .format("dddd")
          .replace("星期", "周")
      });
      i += 1;
    }
    for (let i = 7; i < 14;) {
      nextWeek.push({
        date: moment().add(i, "days").date(),
        day: moment().add(i, "days").locale("zh-cn")
          .format("dddd")
          .replace("星期", "周")
      });
      i += 1;
    }
    console.info(thisWeek);
    console.log(nextWeek);
    this.state = {
      thisWeek: thisWeek,
      nextWeek: nextWeek,
      chooseDate: null,
      chooseTime: null,
      timeArr: null
    };
    this.checkeDate = this.checkeDate.bind(this);
    this.chooseDate = this.chooseDate.bind(this);
    this.checkeTime = this.checkeTime.bind(this);
    this.chooseTime = this.chooseTime.bind(this);
    // console.log(this.state);
  }
  componentDidMount() {
    this.chooseDate(this.state.thisWeek[0].date);
  }
  componentDidUpdate() {
    const { state, props } = this;
    console.info("state");
    console.info(state);
    store.set("chosenDetail", {
      month: state.chooseMonth,
      date: state.chooseDate,
      time: state.chooseTime,
      organizationId: props.pid
    });
  }
  checkeDate(date) {
    const { chooseDate } = this.state;
    const classNameArr = [];
    // 判断选择日期是否可用
    if (chooseDate === date) {
      classNameArr.push(styles.checked);
    }
    return classNameArr.join(" ");
  }
  chooseDate(v) {
    const _this = this;
    const { props } = this;
    console.log(moment().format("YYYY-MM"));
    const month = moment().add(window.Math.abs(v - moment().date()), "days").format("YYYY-MM");
    fetch({
      url: "/mb/health/center/date",
      // method: "POST",
      params: {
        date: `${month}-${v}`,
        centerId: props.pid
        // orderBy,
        // _index: _index,
        // longitude,
        // latitude,
        // _size: "4",
      },
      success(res) {
        const data = JSON.parse(res.entity);
        console.log(data.obj);
        if (data && data.obj) {
          _this.setState({
            chooseMonth: month,
            timeArr: data.obj,
            chooseDate: v,
            chooseTime: null
          });
          _this.forceUpdate();
        }
      }
    });
  }
  checkeTime(time) {
    const { chooseTime, chooseDate } = this.state;
    const classNameArr = [];
    console.log(chooseTime);
    // 判断选择时间是否可用
    if (chooseTime && chooseTime.endTime === time) {
      classNameArr.push(styles.checked);
    }
    if ((time.split(":")[0] * 1 <= moment().format("H:mm").split(":")[0] * 1) && (chooseDate === moment().date())) {
      classNameArr.push(styles.passed);
    }
    return classNameArr.join(" ");
  }
  chooseTime(v) {
    if (v.endTime.split(":")[0] * 1 > moment().format("H:mm").split(":")[0] * 1 || (this.state.chooseDate !== moment().date() && v.number > 0)) {
      this.setState({
        chooseTime: v
      });
    }
    // console.log(this.state);
  }
  render() {
    const _this = this;
    const { state } = this;

    const renderDatePicker = (week, whichWeek) => (
      <div key={whichWeek}>
        <Flex
          className={`${styles.flex} ${styles.month}`}
        >
          <Flex.Item>
            {
              whichWeek === "thisWeek" ?
                moment().locale("zh-cn")
                  .format("YYYY年MM月") :
                moment().add(7, "days").locale("zh-cn")
                  .format("YYYY年MM月")
            }
          </Flex.Item>
        </Flex>
        <Flex
          className={`${styles.flex} ${styles.week}`}
        >
          {
            week.map((v, k) => {
              if (k === 0 && whichWeek === "thisWeek") {
                return <Flex.Item>今天</Flex.Item>;
              }
              if (k === 1 && whichWeek === "thisWeek") {
                return <Flex.Item>明天</Flex.Item>;
              }
              return (<Flex.Item>
                {v.day}
              </Flex.Item>);
            })
          }
        </Flex>
        <Flex
          className={`${styles.flex} ${styles.day}`}
        >
          {
            week.map(v => (
              <Flex.Item
                className={_this.checkeDate(v.date)}
                onClick={() => _this.chooseDate(v.date)}
              >
                {numeral(v.date).format("00")}
              </Flex.Item>
            ))
          }
        </Flex>
        {
          state.timeArr && (state.timeArr.length > 0) && state.timeArr.map((v) => {
            const physicalExaminationInformation = store.get("physicalExaminationInformation");
            let chargeGender = true;
            if (physicalExaminationInformation) {
              chargeGender = (physicalExaminationInformation.gender === v.gender) || (v.gender === "M_003_03");
              if (!physicalExaminationInformation.gender) {
                chargeGender = true;
              }
            }
            return (
              chargeGender && <Flex
                className={`${styles.flex} ${styles.time} ${(v.number === 0) && styles.passed} ${_this.checkeTime(v.endTime)}`}
                onClick={() => _this.chooseTime({
                  beginTime: v.beginTime,
                  endTime: v.endTime,
                  number: v.number,
                  id: v.id
                })}
              >
                <Flex.Item>
                  {`${v.beginTime}-${v.endTime}`}
                </Flex.Item>
                <Flex.Item>
                  {genderData.filter(x => x.value === v.gender)[0].label}
                </Flex.Item>
                {
                  v.number === 0 ? <Flex.Item className={styles.red}>约满</Flex.Item> : <Flex.Item>剩余{v.number}</Flex.Item>
                }
              </Flex>
            );
          }
          )
        }

      </div>
    );
    return (
      <div className={styles.datepicker}>
        <Carousel
          className={styles.carousel}
          autoplay={0}
          // infinite
          selectedIndex={0}
          dotStyle={dotStyle}
          dotActiveStyle={dotActiveStyle}
          // dots={false}
          // beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
          // afterChange={index => console.log("slide to", index)}
        >
          {
            renderDatePicker(state.thisWeek, "thisWeek")
          }
          {
            renderDatePicker(state.nextWeek, "nextWeek")
          }
        </Carousel>
      </div>
    );
  }
}

export { View as default };
