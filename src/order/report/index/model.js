// import tableModel from "srcDir/common/model/noFetchModel";
// import tableModel from "srcDir/common/model/tableModel/subTable";
import tableModel from "srcDir/common/model/tableModel";
import history from "srcDir/common/router/history";
const id = history.location.state.id;
console.log(id);
const data = tableModel({
  url: "/wx/report/detail/byOrder",
  method: "POST",
  params: {
    orderId: id,
  }
});

export { data as default };

