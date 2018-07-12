const content = require("./content.ejs");
const layout = require("layout-without-nav");

module.exports = layout.init({
  pageTitle: "好合租",
}).run(content());
