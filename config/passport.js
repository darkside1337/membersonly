const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

const passportSetup = (passport) => {
  const authenticateUser = async (email, password, done) => {
    // Search user in db

    const user = await User.findOne({ email });

    // no user found

    if (!user) {
      return done(null, false, { message: "No user with that email" });
    }
    try {
      // password check

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, {
          message: "Invalid Credentials, Try Again!",
        });
      }

      // convert user to a plain js object

      const userObject = user.toObject();

      // Send All user data exept password

      const { password: userPassword, ...userData } = userObject;

      /*   console.log("Inside AuthUser: ", userData); */

      return done(null, userData);
    } catch (err) {
      done(err);
    }
  };

  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
      },
      authenticateUser
    )
  );

  // Serialize user by ID

  passport.serializeUser((user, done) => {
    /*  console.log("Inside serializeUser: ", user._id); */
    done(null, user._id);
  });

  // Deserialize User

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    /*  console.log("Inside deserializeUser: ", user); */
    return done(null, user);
  });
};

module.exports = passportSetup;
