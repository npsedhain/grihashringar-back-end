const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

const getRefreshToken = (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    res
      .status(401)
      .json({ message: "Couldn't refresh the token. Please login again." });
    return;
  }

  jwt.verify(refreshToken, process.env.GRIHA_SECRET, (err, decoded) => {
    if (err) {
      res
        .status(401)
        .json({ message: "Invalid refresh token. Please login again." });
      return;
    }
    if (Date.now() > decoded.exp * 1000) {
      res
        .status(401)
        .json({ message: "Refresh token expired. Please login again." });
      return;
    }
    // Check if the found user is valid.
    Admin.findById(decoded.user._id)
      .then(user => {
        let accessToken;
        let refreshToken;
        jwt.sign(
          { user },
          process.env.GRIHA_SECRET,
          { expiresIn: "1h" },
          (err, token) => {
            if (err) {
              throw err;
            }

            accessToken = token;

            jwt.sign(
              { user },
              process.env.GRIHA_SECRET,
              { expiresIn: "30d" },
              (err, token) => {
                if (err) {
                  throw err;
                }

                refreshToken = token;

                res.status(200).json({
                  accessToken,
                  refreshToken
                });
                return;
              }
            );
          }
        );
      })
      .catch(err => {
        res.status(401).json({ err, message: "Please login first." });
      });
  });
};

module.exports = {
  getRefreshToken
};
