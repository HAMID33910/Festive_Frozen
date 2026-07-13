const mongoose = require("mongoose");

const dealSchema = new mongoose.Schema(
  {
    dealName: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    originalPrice: {
      type: Number,
      required: true,
    },

    discountedPrice: {
      type: Number,
      required: true,
    },

    discount: {
      type: Number,
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },

    endDate: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      default: "Active",
    },

    dealImage: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Deal", dealSchema);