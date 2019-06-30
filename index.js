var express = require("express");
var app = express();
var jwt = require("jsonwebtoken");
var passport = require("passport");
var bodyParser = require("body-parser");

const Sequelize = require("sequelize");
const sequelize = new Sequelize("sys", "sreenu", "password", {
  dialect: "mysql",
  port: "3306",
  host: "127.0.0.1"
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

class Users extends Sequelize.Model {}
Users.init(
  {
    username: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    password: Sequelize.STRING
  },
  { sequelize, modelName: "Users", timestamps: false }
);

// sequelize.define("Users", {
//   username: {
//     type: Sequelize.STRING,
//     primaryKey: true
//   },
//   password: Sequelize.STRING
// });

Users.build({
  username: "Jane Doe",
  password: "password"
})
  .save()
  .then(() => {
    console.log("Data saved");
  })
  .catch(e => {
    console.log(e);
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
