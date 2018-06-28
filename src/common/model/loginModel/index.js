// map: 循环匹配
// filter:过滤
// comp: 函数组合
// mapcat: 合并集合
import { map, filter, comp } from "transducers-js";
import * as most from "most";
import fetch from "./fetch";

const loginModel = ({ url, method, params }) => {
  if (!url || url === "") {
    console.error("url参数不正确");
  }
  // 利用rest发请求
  const sendApiRequest = comp(
  // 获取输入框的值
    map(i => i.value),

  // 使用rest发送请求，处理返回值
  // rest({ method: "DELETE", path: "/sf", entity: "hello world" })
    // map(url=>rest({ method: "GET", path: url }).then(resp=>({
    map(q => fetch({ url, method, params, q }))
  );

  // 处理返回的数据
  // 并返回一个新的state
  // {results:[]}
  const generateStateFromResp = comp(
    filter(i => i.type === "dataUpdate"),
    map(data => JSON.parse(data.value).obj),
  // 把结果映射成state 到新的 state
    map(items => state => ({ results: items }))
  );

  const Data = function (intent$) {
  // 构建数据流并让数据流中的类型为‘login’的值debounce去抖500ms(500ms内只执行一次)
    const updateSink$ = intent$.filter(i => i.type === "login")
                             .debounce(300) //  延时500ms

  //  发送API请求
                             .transduce(sendApiRequest)
  // flatMap 结果到流上
                             .flatMap(most.fromPromise)
  // 处理返回的数据
                             .transduce(generateStateFromResp)
  // 发生错误时
                             .flatMapError(error => {
                               console.log("[ERROR]:", error);
  // most.of(x) 创建一个之包含x的流
                               return most.of({ message: error.error, className: "display" })
                                    .merge(most.of({ className: "hidden" })
                                    .delay(3000))
                                    .map(error => state => ({ error }));
                             });


    return {
      // 绑定操作到props.action里
      login: value => ({ type: "login", value }),
      //  generateStateFromResp返回的新state数组{results:[]}
      updateSink$,

    };
  };

  return Data;
};

export { loginModel as default };
