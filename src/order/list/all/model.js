import tableModel from "srcDir/common/model/tableModel";

const data = tableModel({
  url: "wechat-order/list",
  method: "POST",
  entity: {
    // _index: "1",
    // sort: "t.lastModifiedDate desc",
    customer_id: 18
  }
});

export { data as default };
