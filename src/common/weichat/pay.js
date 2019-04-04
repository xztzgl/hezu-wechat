// import React from "react";
import fetch from "srcDir/common/ajax/index";
import store from "store2";
import { Toast } from "antd-mobile";


// 创建react组件
const View = (orderId, callback, cancelfun) => {
  const openId = store.session.get("openId");
  fetch({
    url: "/wx/pay/wepay",
    method: "POST",
    params: {
      orderId: orderId,
      openId: openId
      // _index: _index,
      // longitude,
      // latitude,
      // _size: "4",
    },
    success(res) {
      const data = JSON.parse(res.entity);
      // console.log(data.obj);
      // alert(JSON.stringify(data.obj));
      // alert(JSON.stringify({
      //   appId: data.obj.appId, // 公众号名称，由商户传入
      //   timeStamp: data.obj.timeStamp, // 时间戳，自1970年以来的秒数
      //   nonceStr: data.obj.nonceStr, // 随机串
      //   package: data.obj.package,
      //   signType: data.obj.signType, // 微信签名方式：
      //   paySign: data.obj.paySign // 微信签名
      // }));
      if (data && data.obj) {
        // alert("微信jssdk支付");
        // window.wx.chooseWXPay({
        //   timestamp: data.obj.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
        //   nonceStr: data.obj.nonceStr, // 支付签名随机串，不长于 32 位
        //   package: data.obj.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
        //   signType: data.obj.signType, // 签名方式，默认为"SHA1"，使用新版支付需传入"MD5"
        //   paySign: data.obj.paySign, // 支付签名
        //   success: function (result) {
        //     // 支付成功后的回调函数
        //     alert("支付成功__~", result);
        //   }
        // });
        // alert("微信支付demo");
        const onBridgeReady = () => {
          window.WeixinJSBridge.invoke(
            "getBrandWCPayRequest", {
              appId: data.obj.appId, // 公众号名称，由商户传入
              timeStamp: data.obj.timeStamp, // 时间戳，自1970年以来的秒数
              nonceStr: data.obj.nonceStr, // 随机串
              package: data.obj.package,
              signType: data.obj.signType, // 微信签名方式：
              paySign: data.obj.paySign // 微信签名
            },
            function (result) {
              if (result.err_msg === "get_brand_wcpay_request:ok") {
                Toast.success("支付成功");
                if (callback && typeof callback === "function") {
                  callback();
                }
              } else if (result.err_msg === "get_brand_wcpay_request:cancel") {
                if (cancelfun && typeof cancelfun === "function") {
                  cancelfun();
                }
              } else if (result.err_msg === "get_brand_wcpay_request:fail") {
                // console.log(12);
                Toast.info("支付失败");
                if (cancelfun && typeof cancelfun === "function") {
                  cancelfun();
                }
              }
            }
          );
        };
        if (typeof window.WeixinJSBridge === "undefined") {
          if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
          } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
            document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
          }
        } else {
          onBridgeReady();
        }
      }
    }
  });

  return null;
};

export { View as default };
