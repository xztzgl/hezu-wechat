import tableModel from "srcDir/common/model/tableModel";

const data = tableModel({
  url: "wx/order/listMyOrder",
  method: "POST",
  params: {
    // _index: "1",
    // sort: "t.lastModifiedDate desc",
    orderStatusCode: "O_001_02"
  }
});

export { data as default };
