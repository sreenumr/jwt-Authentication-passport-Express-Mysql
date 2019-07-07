var express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

const Users = require("./User");

router.post("/signup", (req, res) => {
  Users.createUser({ username: req.body.username, password: req.body.password })
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.send(err);
    });
});

router.post("/login", (req, res) => {
  Users.findUser(req.body.username).then(user => {
    if (user) {
      const token = jwt.sign(user, "top_secret");
      res.json({ user, token });
    } else
      res.json({
        message: "No such user exists"
      });
  });
});

router.get(
  "/user/dashboard",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      user: req.user
    });
  }
);

module.exports = router;
