const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("Category", CategorySchema);
