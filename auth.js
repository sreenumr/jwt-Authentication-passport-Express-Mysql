const passport = require("passport");
const User = require("./User");

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "top_secret",
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    },
    (jwtPayload, callBack) => {
      return User.findUser(jwtPayload.username)
        .then(user => {
          return callBack(null, user);
        })
        .catch(err => {
          return callBack(err);
        });
    }
  )
);
