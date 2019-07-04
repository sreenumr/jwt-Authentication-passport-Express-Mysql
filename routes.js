var express = require("express");
var app = express();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();

router.post(
  "/signup",
  passport.authenticate("signup", { session: false }),
  async (req, res, next) => {
    res.json({
      message: "signup success",
      user: req.user
    });
  }
);

// router.post("/login", async (req, res) => {
//   res.json({
//     message: "hello"
//   });
// });

// router.post("/login", async (req, res, next) => {
//   passport.authenticate("login", async (err, user, info) => {
//     console.log("hello");
//     try {
//       if (err || !user) {
//         const error = new Error("An Error occured");
//         return next(error);
//       }

//       req.login(user, { session: false }, async error => {
//         if (error) return next(error);

//         const body = { username: user.username };
//         const token = sjwt.sign({ user: body }, "secret");

//         return res.json({ token });
//       });
//     } catch (error) {
//       return next(error);
//     }
//   });
// });

router.post("/login", function(req, res, next) {
  passport.authenticate("login", { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: "Something is not right",
        user: user
      });
    }
    req.login(user, { session: false }, err => {
      if (err) {
        res.send(err);
      }
      // generate a signed son web token with the contents of user object and return it in the response
      const token = jwt.sign(user, "your_jwt_secret");
      return res.json({ user, token });
    });
  })(req, res);
});

module.exports = router;
