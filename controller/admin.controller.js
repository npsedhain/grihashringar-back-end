const Admin = require("../models/Admin");
const assignId = require("../helper/assignId");
const bcrypt = require("bcryptjs");

const getAdmins = (req, res) => {
  Admin.find()
    .then(admins => {
      res.status(200).json(admins);
    })
    .catch(error => {
      res.status(404).json(error);
    });
};

const postAdmin = async (req, res) => {
  const { username, password, mobile } = req.body;
  if (!username || !password) {
    res.json({ message: "Username or password or both not entered." });
    return;
  }
  const user = await Admin.find({ username });
  if (user.length) {
    res.json({ message: "User already exists." });
    return;
  }

  const _id = await assignId(Admin);
  if (_id !== null) {
    const admin = new Admin({
      _id,
      username,
      password,
      mobile
    });

    //hash password
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(admin.password, salt, (err, hash) => {
        if (err) {
          console.log(err);
        }
        admin.password = hash;
        admin
          .save()
          .then(success => {
            res.status(200).json(success);
          })
          .catch(error => {
            res.status(400).json(error);
          });
      })
    );
  } else {
    res
      .status(500)
      .json({ message: "Error while generating id, please try again." });
  }
}

const deleteAdmin = (req, res) => {
  const _id = req.params._id;
  Admin.deleteOne({ _id })
    .then(success => {
      if (!success.deletedCount) {
        res.status(400).json({ message: "No entries found to be deleted." });
        return;
      }
      res.status(200).json(success);
    })
    .catch(error => {
      res.status(400).json(error);
    });
}

module.exports = {
  getAdmins,
  postAdmin,
  deleteAdmin
};