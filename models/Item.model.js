const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({ 
  title: String,
  description: String,
  articul: String,
  price: String,
  image: String,
  left: Number,
  inStok: Boolean,
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  categoryId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  },
  itemCategoryId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'ItemCategory'
  }
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;