const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Category", CategorySchema);
