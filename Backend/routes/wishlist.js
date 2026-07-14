const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");

router.get("/:userId", async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ userId: req.params.userId });

    if (!wishlist) {
      return res.json({ items: [] });
    }

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/add", async (req, res) => {
  try {
    const {
      userId,
      productId,
      productTitle,
      productImage,
      productPrice,
      quantity,
      imageType,
    } = req.body;

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, items: [] });
    }

    const existingItem = wishlist.items.find((item) => item.productId === productId);

    if (!existingItem) {
      wishlist.items.push({
        productId,
        productTitle,
        productImage,
        productPrice,
        quantity: quantity || 1,
        imageType: imageType || "product",
      });
    }

    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/remove", async (req, res) => {
  try {
    const { userId, productId } = req.body;
    const wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.items = wishlist.items.filter((item) => item.productId !== productId);
    await wishlist.save();

    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
