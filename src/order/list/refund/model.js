import tableModel from "srcDir/common/model/tableModel";

const data = tableModel({
  url: "wx/refund/listRefund",
  method: "POST",
  params: {
    // _index: "1",
    // sort: "t.lastModifiedDate desc",
    // orderStatusCode:
  }
});

export { data as default };
