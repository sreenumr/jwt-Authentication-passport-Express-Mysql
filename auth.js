const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const createUser = require("./User");

passport.use(
  "signup",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, callBack) => {
      try {
        const user = await createUser({ email, password });

        return callBack(null, user);
      } catch (error) {
        callBack(error);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, callBack) => {
      try {
        const user = await UserModel.findOne({ email });

        if (!user) {
          return callBack(null, false, { message: "User not found" });
        }

        // const validate = await user.isValidPassword(password)

        return callBack(null, user, { messaeg: "Logged In Successfully" });
      } catch (error) {
        return callBack(error);
      }
    }
  )
);

const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;

passport.use(
  new JWTstrategy(
    {
      secretOrKey: "top_secret",
      jwtFromRequest: ExtractJWT.fromUrlQueryParameter("secret_token")
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);
