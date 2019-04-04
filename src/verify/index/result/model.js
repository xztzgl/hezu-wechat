import tableModel from "srcDir/common/model/tableModel/subTable";

const data = value => tableModel({
  value,
  url: "/wx/report/detail/snCardId",
  method: "POST",
  params: value,
  entity: value
});


export { data as default };

