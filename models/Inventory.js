const mongoose = require('mongoose');

// Item itself will be increased or decreased when bought from the sellers/ sold to buyers.
const InventorySchema = mongoose.Schema({
  _id: {
    type: Number,
    required: true
  },
  // Probably make a separate schema and will be able to add or delete it too.
  // Select from the arrays of category -> Dropdown menu
  category: {
    type: String,
    required: true
  },
  cost_price: {
    type: Number,
    // required: true
  },
  marked_price: {
    type: Number,
    // required: true
  },
  description: {
    type: String
  },
  // Will be reduced when it's sold and increased when bought.
  volume: {
    type: Number,
    // required: true
  },
  // Will come from the supplier table.
  // Probably will be able to add or delete it too.
  // Select from the arrays of suppliers -> Dropdown menu
  // May letter keep a reference or a subdoc, need to check.
  seller: {
    type: String,
    // required: true
  },
  image: {
    type: String
  },
  // Will come from the branch table || or constants somewhere?
  // Select from the arrays of branch -> Dropdown menu
  branch: {
    type: String,
    // required: true,
    default: 'Godown'
  }
});

module.exports = mongoose.model('Inventory', InventorySchema);
