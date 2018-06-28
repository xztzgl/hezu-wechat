import ajax from "srcDir/common/ajax/indexWithBody";

const fetch = function ({ url, method, params, success }) {
  return ajax({
    method,
    url,
    params,
    success,
    entity: params
  });
};

export { fetch as default };
