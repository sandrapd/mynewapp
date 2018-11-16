var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var itemSchema = new Schema({
  item:    {type: String},
  amount: {type: Number},
  price: {type: Number},
  category: {type: String},
  supermarket:  {type: String},
});

module.exports = mongoose.model('itemModel', itemSchema);