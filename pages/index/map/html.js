const content = require("./content.ejs");
const layout = require("layout-without-nav");

module.exports = layout.init({
  pageTitle: "入职体检服务系统",
}).run(content());
