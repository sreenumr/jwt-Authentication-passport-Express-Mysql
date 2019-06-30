const passport = require("passport");
const LocalStrategy = require("passport-local");

passport.use(
  new LocalStrategy(
    {
      username: "email",
      password: "password"
    },
    () => {
      email, password;
    }
  )
);
