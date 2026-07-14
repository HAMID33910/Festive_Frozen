const express = require("express");
const router = express.Router();

const Product = require("../models/Product");
const Category = require("../models/Category");
const Deal = require("../models/Deal");

router.get("/", async (req, res) => {
  try {
    const q = req.query.q?.trim();

    if (!q) {
      return res.json([]);
    }

    const regex = new RegExp(q, "i");

    const products = await Product.find({
      productTitle: regex,
    }).populate("categoryId");

    const categories = await Category.find({
      title: regex,
    });

    const deals = await Deal.find({
  dealName: regex,
});

    const results = [];

    products.forEach((item) => {
      results.push({
        type: "product",
        _id: item._id,
        title: item.productTitle,
        image: item.productImage,
      });
    });

    categories.forEach((item) => {
  results.push({
    type: "category",
    _id: item._id,
    title: item.title,
    image: item.image,
  });
});

   deals.forEach((item) => {
  results.push({
    type: "deal",
    _id: item._id,
    title: item.dealName,
    image: item.dealImage,
  });
});

    res.json(results);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }
});

module.exports = router;