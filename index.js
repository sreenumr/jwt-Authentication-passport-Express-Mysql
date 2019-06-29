var express = require("express");
var app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
  //   res.send("hello");
});

app.listen(3000);
