const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: String,
        productTitle: String,
        productImage: String,
        productPrice: Number,
        quantity: {
          type: Number,
          default: 1,
        },
        imageType: {
          type: String,
          default: "product",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Wishlist", wishlistSchema);
