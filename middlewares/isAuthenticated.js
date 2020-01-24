const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

function isAuthenticated(req, res, next) {
  // Get auth header
  const bearerHeader = req.headers.authorization;
  // check if bearerHeader is undefined
  if (!bearerHeader) {
    res.status(401).json({
      message: "Please login to access the resource."
    });
    return;
  }

  const bearer = bearerHeader.split(" ");
  const accessToken = bearer[1];

  jwt.verify(accessToken, process.env.SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ message: "Please login to access the resource." });
      return;
    }
    if (Date.now() > decoded.exp * 1000) {
      res.status(401).json({ expired: true, message: "Token expired." });
      return;
    }
    // Check if the found user is valid.
    Admin.findById(decoded.user._id)
      .then(() => {
        req.user = decoded.user;
        next();
      })
      .catch(err => {
        res
          .status(401)
          .json({ err, message: "Please login to access the resource." });
      });
  });
}

module.exports = isAuthenticated;
