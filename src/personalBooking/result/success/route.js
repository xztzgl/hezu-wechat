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
    <div className={styles.success}>
      <section className={styles.section}>
        <h4 className={styles.title}>您已预约成功</h4>
      </section>
      <section className={styles.record}>
        <h6 className={styles.content}><span>公共卫生从业人员健康体检</span><span>x1</span></h6>
        <h6 className={styles.content}>150.00元</h6>
        <p className={styles.remark}>体检日期：2017年08月04日</p>
        <p className={styles.remark}>体检时间：09:00——10:00</p>
        <p className={styles.remark}>体检地点：健康护照望京体检中心</p>
      </section>
      <FooterBottom className={styles.button} displayed="0" buttonName="立即预约" onClickFun={pay}>
        <button>查看订单</button>
      </FooterBottom>
    </div>
  );
};

export { View as default };
