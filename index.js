var express = require("express");
var app = express();
var jwt = require("jsonwebtoken");
var passport = require("passport");
var bodyParser = require("body-parser");
var createUser = require("./User");
require("./auth");

const routes = require("./routes");
const secureRoute = require("./secure-routes");

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.use("/", routes);

app.use("/user", passport.authenticate("jwt", { session: false }), secureRoute);

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(3000);
