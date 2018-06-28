import tableModel from "srcDir/common/model/tableModel/subTable";

const data = id => tableModel({
  id,
  url: "/wx/report/detail/sn",
  method: "POST",
  params: {
    sn: id,
  },
  entity: {
    sn: id,
  }
});


export { data as default };

