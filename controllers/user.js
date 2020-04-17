const User = require("../models/auth");

// to restrict user accessing others data
userById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      console.log("problem not here");
      return res.status(400).json({
        error: "user not found",
      });
    }
    user.hashed_password = null;
    user.salt = null;
    req.profile = user;

    next();
  });
};

module.exports = userById;
