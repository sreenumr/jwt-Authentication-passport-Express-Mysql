var express = require("express");
var app = express();
var jwt = require("jsonwebtoken");
var passport = require("passport");
var bodyParser = require("body-parser");
var createUser = require("./User");

const user = {
  username: "james bond",
  password: "password"
};

createUser(user);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// app.post("/auth", (req, res) => {
//   res.json({
//     message: "message created"
//   });
// });

// app.post("/auth/login", (req, res) => {
//   //User
//   const user = {
//     username: "user@user.com",
//     password: "password"
//   };

//   jwt.sign({ user }, "secretkey", (err, token) => {
//     res.json({
//       token
//     });
//   });
// });

app.listen(3000);
