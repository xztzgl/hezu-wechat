import tableModel from "srcDir/common/model/tableModel/subTable";

const data = id => tableModel({
  id,
  url: "/wx/report/detail",
  method: "POST",
  params: {
    // _index: "1",
    // sort: "t.lastModifiedDate desc",
    id: id,
  }
});


export { data as default };

