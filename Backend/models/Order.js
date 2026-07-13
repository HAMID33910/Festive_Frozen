// const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema(
//   {
//     firstName: {
//       type: String,
//       required: true,
//     },

//     lastName: {
//       type: String,
//       required: true,
//     },

//     email: {
//       type: String,
//       required: true,
//     },

//     phone: {
//       type: String,
//       required: true,
//     },

//     address: {
//       type: String,
//       required: true,
//     },

//     postalCode: {
//       type: String,
//       required: true,
//     },

//     paymentMethod: {
//       type: String,
//       default: "Cash On Delivery",
//     },

//     items: [
//       {
//         productId: String,

//         productTitle: String,

//         productImage: String,

//         quantity: Number,

//         price: Number,
//       },
//     ],

//     totalPrice: {
//       type: Number,
//       required: true,
//     },

//     status: {
//       type: String,
//       enum: [
//         "Pending",
//         "Processing",
//         "Shipped",
//         "Delivered",
//         "Cancelled",
//       ],
//       default: "Pending",
//     },
//   },
//   {
//     timestamps: true,
//   }
// );

// module.exports = mongoose.model("Order", orderSchema);

const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    postalCode: {
      type: String,
      required: true,
      trim: true,
    },

    paymentMethod: {
      type: String,
      default: "Cash On Delivery",
    },

    items: [
      {
        productId: {
          type: String,
          required: true,
        },

        productTitle: {
          type: String,
          required: true,
        },

        productImage: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);