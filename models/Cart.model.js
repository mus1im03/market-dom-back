const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  totalCash: String,
  // userId: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: "User",
  // },
  products: [
    {
      productId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Item",
      },
      amount: String,
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
