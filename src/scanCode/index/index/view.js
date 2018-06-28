import React from "react";
import fetch from "srcDir/common/ajax/indexWithBody";

import Conment from "srcDir/common/viewform/searchFail/view";
import SearchSuccess from "srcDir/verify/index/searchSuccess/view";

// 创建react组件
const View = (props) => {
  console.info("scanCode/index/index");
  console.log(props);
  const { actions, pid } = props;
  const serach = `searchSub@${pid}`;
  const takePictures = () => {
    // actions[serach]({
    //   sn: "fdsgfgsdfgdfsg"
    // });
    const wx = window.wx;
    fetch({
      url: "/wx/manage/jssdk",
      method: "POST",
      params: {
        url: location.host + location.pathname
      },
      success(res) {
        const wxconfig = res.entity.obj.data;
        // wxconfig.debug = true;
        wxconfig.jsApiList = [
          "checkJsApi",
          "onMenuShareTimeline",
          "onMenuShareAppMessage",
          "onMenuShareQQ",
          "onMenuShareWeibo",
          "hideMenuItems",
          "showMenuItems",
          "hideAllNonBaseMenuItem",
          "showAllNonBaseMenuItem",
          "translateVoice",
          "startRecord",
          "stopRecord",
          "onRecordEnd",
          "playVoice",
          "pauseVoice",
          "stopVoice",
          "uploadVoice",
          "downloadVoice",
          "chooseImage",
          "previewImage",
          "uploadImage",
          "downloadImage",
          "getNetworkType",
          "openLocation",
          "getLocation",
          "hideOptionMenu",
          "showOptionMenu",
          "closeWindow",
          "scanQRCode",
          "chooseWXPay",
          "openProductSpecificView",
          "addCard",
          "chooseCard",
          "openCard",
          "translateVoice"
        ];
        wx.config(wxconfig);
        wx.ready(function () {
          window.wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
            success: function (res1) {
              const result = res1.resultStr; // 当needResult 为 1 时，扫码返回的结果
              actions[serach]({
                sn: result
              });
            }
          });
        });
      }
    });
  };

  return (
    <div>
      {
        (props.results && props.results.success) ? <SearchSuccess results={props.results} callback={takePictures} /> : (<Conment
          // dataaction="暂无健康证明！"
          // datatitle="您还没有健康证明，快去体检吧！"
          disabled="1"
          features={takePictures}
          // classname={styles.certificate}
          bottonName="查询更多"
        />)
      }
    </div>
  );
};

export { View as default };
