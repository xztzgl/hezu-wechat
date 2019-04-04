import React from "react";
import SearchSuccess from "srcDir/verify/index/searchSuccess/view";
import Conment from "srcDir/common/viewform/searchFail/view";
import { Modal, Toast } from "antd-mobile";
import fetch from "srcDir/common/ajax/indexWithBody";

import styles from "./style.less";

const prompt = Modal.prompt;


// 创建react组件
const View = (props) => {
  const callback = () => {
    // console.log("xiazai");
    prompt("下载健康证明", "请输入邮箱地址以便收取健康证明",
      [
        { text: "取消" },
        {
          text: "提交",
          onPress: (value) => {
            // console.log(`输入的内容:${value}`);
            fetch({
              url: "http://47.95.43.79/health/me/report/sendMail",
              method: "POST",
              entity: {
                sn: props.results && props.results.obj.meSn,
                email: value,
              },
              success(res) {
                // console.log(res.entity);
                if (res.entity && res.entity.success) {
                  Toast.success(res.entity.msg);
                } else {
                  Toast.fail(res.entity.msg);
                }
              }
            });
          }
        },
      ],
      "default",
      ""
    );
  };
  return (
    <div className={styles.bg}>
      {
        props.results && props.results.obj ?
          <SearchSuccess results={props.results} callback={callback} buttonTitle="PDF下载" /> :
          <Conment
            dataaction="暂无健康证明！"
            datatitle="您还没有健康证明，快去体检吧！"
            disabled="0"
            features={() => { this.takePictures(); }}
            classname={styles.certificate}
            bottonName="开始拍摄"
          />
      }
    </div>
  );
};

export { View as default };
