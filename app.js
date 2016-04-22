var express = require("express");
var app = express();
console.log("express dir name:" + __dirname);
  app.use("/app", express.static('../app'));
  app.use("/test", express.static('../test'));
  app.use("/dist", express.static('../dist'));


var server = app.listen(3000, function() {
    console.log('http://localhost:300 started');
});
