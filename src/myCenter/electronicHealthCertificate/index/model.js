import tableModel from "srcDir/common/model/tableModel";
import noFetchModel from "srcDir/common/model/noFetchModel";
// const data = noFetchModel({});
import store from "store2";
const userType = store.get("userType");
// console.log(userType, 1233);
// let url;
// if (userType === "U_001_03") {
//   url = "/wx/employee/info/healthList";
// } else {
//   url = "/wx/report/list";
// }
const data = userType !== "U_001_03" ? tableModel({
  url: "/wx/report/list",
  method: "POST",
  params: {
    _index: "1",
    // sort: "t.lastModifiedDate desc"
  }
}) : noFetchModel({});

export { data as default };
// import noFetchModel from "srcDir/common/model/noFetchModel";

// const data = noFetchModel({});
// export { data as default };
