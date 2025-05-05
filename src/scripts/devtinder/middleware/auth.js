const jwt = require("jsonwebtoken");
const User = require("../model/user");

const auth = async (req, res, next) => {
  const jwtToken = req.cookies.jwt;
  if (!jwtToken) {
    return res.status(401).send("Unauthorized");
  }
  const verifyToken = jwt.verify(jwtToken, "Devtinder@#$123");

  if (!verifyToken) {
    return res.status(401).send("Unauthorized");
  }
  const userId = verifyToken._id;
  const profile = await User.findById(userId);
  console.log("user is:- " + profile);
  req.user = profile;
  if (!profile) {
    return res.status(401).send("User Not Found");
  }
  next();
};
module.exports = {
  auth,
};
