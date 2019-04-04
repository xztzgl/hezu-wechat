import tableModel from "srcDir/common/model/tableModel/subTable";
// const data = id => tableModel({
//   id,
//   // url: "wx/order/orderDetail",
//   // select: {
//   //   url: id === "16" ? "wx/refund/refundDetail" : "wx/order/orderDetail",
//   // },
//   url: "wx/refund/refundDetail",
//   method: "POST",
//   params: {
//     // _index: "1",
//     // sort: "t.lastModifiedDate desc",
//     id: id,
//   }
// });

const data = id => tableModel({
  id,
  // url: "wx/order/orderDetail",
  // select: {
  //   url: id === "16" ? "wx/refund/refundDetail" : "wx/order/orderDetail",
  // },
  url: /O_003/.test(id.code) ? "wx/refund/refundDetail" : "wx/order/orderDetail",
  method: "POST",
  params: {
    // _index: "1",
    // sort: "t.lastModifiedDate desc",
    id: id.id,
  }
});
export { data as default };

