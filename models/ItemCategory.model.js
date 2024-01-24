const mongoose = require("mongoose");

const itemCategorySchema = mongoose.Schema({ 
  title: String,
  categoryId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Category'
  }
});

const ItemCategory = mongoose.model('ItemCategory', itemCategorySchema);

module.exports = ItemCategory;