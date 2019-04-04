import React from "react";
import { Icon } from "antd-mobile";
import styles from "./style.less";

// 创建react组件

const View = (props) => {
  const { addRoute } = props.router;
  const onClick = (id) => {
    console.log(id);
    addRoute({ keyName: "电子健康证详情", path: `/certification/detail/${id}`, name: "体检点详情", title: `/certification/detail/${id}`, component: "myCenter/electronicHealthCertificate/detail", paramId: id });
  };
  return (
    <ul className={styles.bg}>
      {
        props.data && props.data.map((v) => {
          // console.log(v, k);
          const expireDate = v.expireDate.split(" ")[0];
          // const meDate = v.meDate.split(" ")[0];
          return (
            <li className={styles.listChild} onClick={() => onClick(v.id)} role="menuitem">
              <div>
                <div
                  className={styles.headimg}
                  style={{
                    backgroundImage: `url(data:image/png;base64,${v.avatar})`
                  }}
                />
              </div>
              <div>
                <div>{v.name}</div>
                <div>体检日期：{expireDate}</div>
                <div>{v.resultName}</div>
              </div>
              <div style={{ paddingTop: 30 }}>
                <Icon type="right" />
              </div>
            </li>
          );
        })
      }
    </ul>
  );
};

export { View as default };
