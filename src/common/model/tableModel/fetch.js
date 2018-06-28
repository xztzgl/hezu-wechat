import ajax from "srcDir/common/ajax/indexWithBody";

const fetch = function ({ url, method, params, q, entity }) {
  const paramsAll = Object.assign({}, params, q, entity);
  return ajax({
    method,
    url,
    params: paramsAll,
    entity: paramsAll,
  });
};

export { fetch as default };
