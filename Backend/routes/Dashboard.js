const express = require("express");

const Product = require("../models/Product");
const Category = require("../models/Category");
const Order = require("../models/Order");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();

    const totalCategories = await Category.countDocuments();

    const totalOrders = await Order.countDocuments();

    const orders = await Order.find();

    let totalSales = 0;

    orders.forEach((order) => {
      totalSales += order.totalPrice;
    });

    res.json({
      totalSales,
      totalProducts,
      totalCategories,
      totalOrders,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;