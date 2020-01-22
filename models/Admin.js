const mongoose = require('mongoose');

const AdminSchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Admin', AdminSchema);
