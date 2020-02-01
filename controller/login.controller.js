const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const loginUser = (req, res) => {
  let errors = [];
  const { username, password } = req.body;
  if (!username) {
    errors.push("Please enter your username.");
  }
  if (!password) {
    errors.push("Please enter your password.");
  }
  if (errors.length) {
    res.json({ message: errors });
    return;
  } else {
    //validation passed
    Admin.findOne({ username })
      .then(found => {
        if (!found) {
          res.json({
            message: "You are not the administrator of GrihaShringar. BACK OFF!"
          });
          return;
        }

        // Compare the password.
        bcrypt.compare(password, found.password, (err, success) => {
          if (success) {
            const { _id, username, date } = found;
            let user = { _id, username, date };

            // Implement JWT
            let accessToken;
            let refreshToken;
            jwt.sign(
              { user },
              process.env.SECRET,
              { expiresIn: "1h" },
              (err, token) => {
                if (err) {
                  throw err;
                }

                accessToken = token;

                jwt.sign(
                  { user },
                  process.env.SECRET,
                  { expiresIn: "30d" },
                  (err, token) => {
                    if (err) {
                      throw err;
                    }

                    refreshToken = token;

                    res.status(200).json({
                      accessToken,
                      refreshToken,
                      message: "You are successfully logged in."
                    });
                    return;
                  }
                );
              }
            );
          }
          if (!success) {
            res.status(200).json({ message: "Password doesn't match." });
            return;
          } else if (err) {
            res.json({ err, message: "Couldn't log you in." });
          }
        });
      })
      .catch(err => {
        res.json({ err, message: "Sorry, can't find the username." });
      });
  }
};

module.exports = {
  loginUser
};
