import React from "react";
import OrganizationList from "srcDir/common/view/organizationList/index";

// 创建react组件
const View = (props) => {
  console.info("organization/index/index");
  console.log(props);

  return (
    <OrganizationList data={props.results} actions={props.actions} router={props.router} />
  );
};

export { View as default };
