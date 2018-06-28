var express = require("express");
var app = express();
var webpackServer = require("./webpack.dev.server");
var routes = require("./routes/api");
var url = require("./webpack-config/base/url.config.js");
const path = require("path");

webpackServer(app);

app.get("/", function (req, res) {
  res.send("Hello World!");
});

app.use("/", routes);

// // // catch 404 and forward to error handler
// // app.use(function(req, res, next) {
// //   var err = new Error("Not Found");
// //   err.status = 404;
// //   next(err);
// // });
// app.all("/", function(req, res) {
//   res.sendFile(path.resolve(__dirname, "./","index.html"));
// });

// app.all("/:page", function(req, res) {
//   res.sendFile(path.resolve(__dirname, "./","index.html"));
// });

// app.all("/core|react-component/:page", function(req, res) {
//   res.sendFile(path.resolve(__dirname, "./","index.html"));
// });

// app.all("/core|react-component/core|react-component/:page", function(req, res) {
//   res.sendFile(path.resolve(__dirname, "./","index.html"));
// });

app.all("/", function (req, res) {
  // console.log("/");
  console.log(req.query.token);
  // res.send(req);
  // res.sendFile(path.resolve(__dirname, "./pages/index/index", "index.html"));
  res.redirect("/index/index/page.html?token=" + req.query.token);
});
app.all("/garage.appcache", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./", "garage.appcache"));
});
app.all("/MP_verify_zm7joyhezj78uapj.txt", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./", "MP_verify_zm7joyhezj78uapj.txt"));
});
app.all("/debuggap.js", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./", "debuggap.js"));
});
app.all("/manifest.json", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./", "manifest.json"));
});
app.all("/:page", function (req, res) {
  res.redirect("/index/index/page.html?token=" + req.query.token + "&page=" + req.params.page + "&id=" + req.query.id + "&openId=" + req.query.openId);
});

app.all("/core|react-component/:page", function (req, res) {
  res.redirect("/index/index/page.html?token=" + req.query.token);
});

app.all("/core|react-component/core|react-component/:page", function (req, res) {
  res.redirect("/index/index/page.html?token=" + req.query.token);
});

app.listen(url.mockServer.port, function () {
  console.log("The app listening on port 3000 was started!");
});
