const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check

const User = require("../models/auth");
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
  console.log("req.body", req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    // hide salt and hashed_password
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user,
    });
  });
};

exports.signin = (req, res) => {
  // find user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "user with that email doesn't exist please signup",
      });
    }
    // if user is found

    // authenticate user
    if (!user.authenticate(password)) {
      // if the password is wrong
      return res.status(401).json({
        error: "email and password dont match",
      });
    }
    // generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    // persist the token as tkn in cookie with expiry date
    res.cookie("tkn", token, { expire: new Date() + 9999 });
    res.cookie("user", user.name, { expire: new Date() + 9999 });
    // return response with user and token to frontend client

    const { _id, name, email } = user;
    return res.json({ token, user: { _id, email, name } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("tkn");
  res.json({ message: "signout sucess" });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  userProperty: "auth",
});

exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!user) {
    return res.status(402).json({ error: "access deined" });
  }
  next();
};
