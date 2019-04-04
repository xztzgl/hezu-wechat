// import tableModel from "srcDir/common/model/tableModel";

// const data = tableModel({
//   url: "/driver/knowledge/homePage",
//   method: "POST",
//   params: {
//     _index: "1",
//     sort: "t.lastModifiedDate desc"
//   }
// });
import noFetchModel from "srcDir/common/model/noFetchModel";

const data = noFetchModel({});
export { data as default };

