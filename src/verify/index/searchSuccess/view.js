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
  console.log("/src/verify/index/searchSuccess/view.js");
  console.log(props);
  console.log(moment);
  const { obj } = props.results;
  const items = [
    "B_001_01",
    "B_001_02",
    "B_001_03",
    "B_001_04",
    "B_001_05",
    "B_001_06",
    "B_001_07",
    "B_001_08",
    "B_001_09",
    "B_001_10"
  ];
  return (
    <div>
      <article id="myCertification" className={styles.result}>
        <h3>从业人员健康证明</h3>
        <QRCode className={styles.QRCode} value={obj && obj.meSn} />
        <div className={styles.avatar} style={{ backgroundImage: `url(data:image/png;base64,${obj && obj.avatar})` }} />
        <div className={styles.meSn}>{obj && obj.meSn}</div>
        <div className={styles.name}>{obj && obj.name}</div>
        <div className={styles.gender}>{obj && obj.gender && obj.gender.name}</div>
        <div className={styles.cardid}>{obj && obj.cardid}</div>
        <div className={styles.meDate}>{obj && obj.meDate && moment(obj.meDate).format("YYYY-MM-DD")}</div>
        <ul>
          {
            obj && obj.items && items.map(v => (
              <li
                className={styles.no}
                // className={obj.items[v].itemValue === "Y" ? styles.yes : styles.no}
                data-key={v}
                data-name={obj.items[v].itemName}
                data-value={obj.items[v].itemValue}
                data-remark={obj.items[v].remark}
              >
                <span>
                  {
                    /*
                    "\u2713"
                    */
                  }
                  {
                    obj.items[v].itemValue === "Y" ? "合　格" : "不合格"
                  }
                </span>
                <span className={styles.remark}>{obj.items[v].remark}</span>
              </li>
            ))
          }
        </ul>

        <div className={styles.signature} style={{ backgroundImage: `url(${obj && obj.signature})` }} />
        <div className={styles.resultCode}>{
          obj && obj.resultCode && codeMap.filter(x => RegExp(obj.resultCode).test(x.code) === true)[0].name
        }</div>
        <div className={styles.meOrg}>{obj && obj.meOrg}</div>
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
