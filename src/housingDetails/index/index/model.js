// import tableModel from "srcDir/common/model/tableModel";

// const data = tableModel({
//   url: "/wx/enterprise/info/view",
//   method: "GET",
//   params: {
//     // _index: "1",
//     // sort: "t.lastModifiedDate desc"
//   }
// });
import noFetchModel from "srcDir/common/model/noFetchModel";

const data = noFetchModel({});
export { data as default };

// import tableModel from "srcDir/common/model/tableModel/subTable";

// const data = id => tableModel({
//   id,
//   get: console.log(id, 121321),
//   url: "/wechat-house/get",
//   // select: {
//   //   url: id === "16" ? "wx/refund/refundDetail" : "wx/order/orderDetail",
//   // },
//   // url: /O_003/.test(id.code) ? "wx/refund/refundDetail" : "wx/order/orderDetail",
//   method: "POST",
//   body: id
// });
// export { data as default };
