import React from "react";
import store from "store2";
import { Toast } from "antd-mobile";
import history from "srcDir/common/router/history";
import FooterBottom from "srcDir/common/viewform/footerBottom/view";
import styles from "srcDir/personalBooking/result/style.less";

// 创建react组件
const View = (props) => {
  console.info("personalBooking/result/fail");
  console.log(props);

  const pay = () => {
    const chosenDetail = store.get("chosenDetail");
    console.log(chosenDetail);
    if (Object.values(chosenDetail).filter(v => !v).length === 0) {
      history.push("/personalBooking/");
    } else {
      Toast.fail("请选择日期和时间");
    }
  };

  return (
    <div className={styles.fail}>
      <h6 className={styles.content}>剩余支付时间</h6>
      <time className={styles.time}>18:45</time>
      <section className={styles.section}>
        <h4 className={styles.title}>支付失败！</h4>
        <p className={styles.remark}>支付过程中用户取消！</p>
      </section>
      <FooterBottom className={styles.button} displayed="0" buttonName="继续支付" onClickFun={pay} />
    </div>
  );
};

export { View as default };
