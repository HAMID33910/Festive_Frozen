// const express = require("express");

// const Product = require("../models/Product");
// const Category = require("../models/Category");
// const Order = require("../models/Order");

// const router = express.Router();

// router.get("/", async (req, res) => {
//   try {
//     const totalProducts = await Product.countDocuments();

//     const totalCategories = await Category.countDocuments();

//     const totalOrders = await Order.countDocuments();

//     const orders = await Order.find();

//     let totalSales = 0;

//     orders.forEach((order) => {
//       totalSales += order.totalPrice;
//     });

//     res.json({
//       totalSales,
//       totalProducts,
//       totalCategories,
//       totalOrders,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// module.exports = router;

const express = require("express");

const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");

const router = express.Router();

router.get("/", async (req, res) => {
  try {

    /* =========================
       TOTAL COUNTS
    ========================= */

    const totalProducts = await Product.countDocuments();

    const totalCategories = await Category.countDocuments();

    const totalOrders = await Order.countDocuments();

    /* =========================
       TOTAL SALES
    ========================= */

    const salesOrders = await Order.find({
      status: { $ne: "Cancelled" },
    });

    let totalSales = 0;

    salesOrders.forEach((order) => {
      totalSales += order.totalPrice;
    });

    /* =========================
       MONTHLY SALES GRAPH
    ========================= */

    const monthlyData = await Order.aggregate([
      {
        $match: {
          status: {
            $ne: "Cancelled",
          },
        },
      },
      {
        $group: {
          _id: {
            month: {
              $month: "$createdAt",
            },
          },
          sales: {
            $sum: "$totalPrice",
          },
        },
      },
      {
        $sort: {
          "_id.month": 1,
        },
      },
    ]);

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const salesGraph = months.map((month, index) => {

      const found = monthlyData.find(
        (item) => item._id.month === index + 1
      );

      return {
        month,
        sales: found ? found.sales : 0,
      };

    });

    /* =========================
       RECENT PENDING ORDERS
    ========================= */

    const pendingOrders = await Order.find({
      status: "Pending",
    })
      .sort({ createdAt: -1 })
      .limit(6)
      .select(
        "firstName lastName totalPrice status createdAt"
      );

    /* =========================
       RESPONSE
    ========================= */

    res.json({
      totalSales,
      totalProducts,
      totalCategories,
      totalOrders,
      salesGraph,
      pendingOrders,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }
});

module.exports = router;