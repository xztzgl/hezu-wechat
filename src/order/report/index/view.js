import React from "react";
import QRCode from "qrcode.react";
import FooterButton from "srcDir/common/viewform/footerBottom/view";
import store from "store2";
import moment from "moment";
import styles from "./style.less";

const codeMap = store.session.get("codeMap");
// const gender = codeMap.filter(x => /M_003\S+/.test(x.code) === true);

// 创建react组件
const View = (props) => {
  // console.log("/src/verify/index/searchSuccess/view.js");
  console.log(props);
  // console.log(moment);
  // const { obj } = props.results;
  return (
    <div>
      <article id="myCertification" className={styles.result}>
        <h3>从业人员健康证明</h3>
        <QRCode className={styles.QRCode} value={props.results && props.results.obj.meSn} />
        <div className={styles.avatar} style={{ backgroundImage: `url(${props.results && props.results.obj.avatar})` }} />
        <div className={styles.meSn}>{props.results && props.results.obj.meSn}</div>
        <div className={styles.name}>{props.results && props.results.obj.name}</div>
        <div className={styles.gender}>{props.results && props.results.obj.gender && props.results.obj.gender.name}</div>
        <div className={styles.cardid}>{props.results && props.results.obj.cardid}</div>
        <div className={styles.meDate}>{props.results && props.results.obj.meDate && moment(props.results.obj.meDate).format("YYYY-MM-DD")}</div>
        <ul>
          {
            props.results && props.results.obj.items && Object.keys(props.results.obj.items).map(v => (
              <li
                className={styles.no}
                // className={obj.items[v].itemValue === "Y" ? styles.yes : styles.no}
                dataName={props.results.obj.items[v].itemName}
                dataValue={props.results.obj.items[v].itemValue}
                dataRemark={props.results.obj.items[v].remark}
              >
                <span>
                  {
                    /*
                    "\u2713"
                    */
                  }
                  {
                    props.results.obj.items[v].itemValue === "Y" ? "合　格" : "不合格"
                  }
                </span>
                <span className={styles.remark}>{props.results.obj.items[v].remark}</span>
              </li>
            ))
          }
        </ul>

        <div className={styles.signature} style={{ backgroundImage: `url(${props.results && props.results.obj.signature})` }} />
        <div className={styles.resultCode}>{
          props.results && props.results.obj.resultCode && codeMap.filter(x => RegExp(props.results.obj.resultCode).test(x.code) === true)[0].name
        }</div>
        <div className={styles.meOrg}>{props.result && props.results.obj.meOrg}</div>
      </article>
      <FooterButton
        className={styles.buttonCenter}
        displayed="0"
        buttonName={props.buttonTitle || "继续查询"}
        onClickFun={(e) => {
          if (props.callback && typeof props.callback === "function") {
            props.callback(e);
          }
        }}
      />
    </div>
  );
};

export { View as default };
