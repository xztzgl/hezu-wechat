import tableModel from "srcDir/common/model/tableModel/subTable";

const data = id => tableModel({
  id,
  url: "/mb/health/center/info",
  // method: "GET",
  params: {
    // _index: "1",
    // sort: "t.lastModifiedDate desc",
    centerId: id,
  }
});


export { data as default };

