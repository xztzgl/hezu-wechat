import tableModel from "srcDir/common/model/tableModel";
import Cookies from "js-cookie";

const { longitude, latitude } = JSON.parse(Cookies.get("location"));

const data = tableModel({
  url: "/mb/health/center/list",
  // method: "POST",
  params: {
    longitude,
    latitude,
    _size: "4",
    sort: "t.lastModifiedDate desc"
  }
});

export { data as default };

