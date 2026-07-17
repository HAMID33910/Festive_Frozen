const express = require("express");
const Order = require("../models/Order");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pendingOrders = await Order.countDocuments({ status: "Pending" });

    const lowStockProducts = await Product.find({ stock: { $lte: 5 } })
      .select("productTitle stock productImage")
      .sort({ stock: 1 });

    const outOfStockProducts = await Product.find({ stock: 0 })
      .select("productTitle stock productImage");

    res.status(200).json({
      pendingOrders,
      lowStockProducts,
      outOfStockProducts,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
