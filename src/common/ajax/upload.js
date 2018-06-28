import ajaxGlobal from "./globalUpload";
import { Toast } from "antd-mobile";
import store from "store2";

const fetch = function ({ url, method, params, success, error, entity }) {
  // 过滤空值
  if (params) {
    Object.keys(params).filter((v) => params[v] === "").map((v) => {
      delete params[v];
      return params;
    });
  }
  return ajaxGlobal({
    method: method || "GET",
    path: url,
    params,
    entity,
  }).then(resp => {
    // 从header获取新的token,重新存至cookie
    const authToken = resp.headers.auth_token;
    // console.log(authToken);
    if (authToken) {
      store.set("Authorization", authToken);
    }
    const code = resp.status.code;
    switch (code) {
    case 401:
      Toast.fail("登录超时，请重新登录！");
      // window.location.href = "/login/login/page.html";
      if (error) {
        error(resp);
      }
      break;

    case 404:
      Toast.fail("请求接口不存在！");
      break;

    case 500:
      Toast.fail("服务器内部错误！");
      break;

    default:
      if (success) {
        success(resp);
      }
      return {
        type: "dataUpdate",
        value: resp.entity
      };
    }
  }, resp => {
    Toast.fail(resp.error + "-code:[" + resp.status.code + "]");
    if (error) {
      error(resp);
    }
    return {
      type: "dataUpdate",
      value: JSON.stringify({ rows: [] })
    };
  });
};

export { fetch as default };
