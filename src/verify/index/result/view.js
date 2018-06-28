import React from "react";
import SearchSuccess from "srcDir/verify/index/searchSuccess/view";
import Conment from "srcDir/common/viewform/searchFail/view";

// import styles from "./style.less";

import history from "srcDir/common/router/history";

const search = () => {
  history.goBack();
};

// 创建react组件
const View = (props) => {
  console.info("scanCode/index/index");
  const results = props.results || {};
  console.log(results);
  const renderView = () => {
    if (results && results.success) {
      console.log("results.obj");
      console.log(results.obj);
      return <SearchSuccess results={results} callback={search} />;
    } else if (results && !results.success) {
      return (<Conment
        // dataaction="暂无健康证明！"
        // datatitle="您还没有健康证明，快去体检吧！"
        disabled="1"
        features={search}
        // classname={styles.certificate}
        bottonName="查询更多"
      />);
    }
  };

  return (<div>
    {
      renderView()
    }
  </div>);
};


export { View as default };
