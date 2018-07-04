import tableModel from "srcDir/common/model/noFetchModel";

const data = tableModel({
  url: "/driver/knowledge/homePage",
  method: "POST",
  params: {
    _index: "1",
    sort: "t.lastModifiedDate desc"
  }
});

export { data as default };

