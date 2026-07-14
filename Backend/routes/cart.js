

const express = require("express");
const router = express.Router();

const Cart = require("../models/Cart");

/* ==========================
   GET USER CART
========================== */

router.get("/:userId", async (req, res) => {
  try {
    const cart = await Cart.findOne({
      userId: req.params.userId,
    });

    if (!cart) {
      return res.json({
        items: [],
      });
    }

    res.json(cart);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }
});

/* ==========================
   ADD TO CART
========================== */

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

    let cart = await Cart.findOne({
      userId,
    });

    if (!cart) {

      cart = new Cart({
        userId,
        items: [],
      });

    }

    const existingItem = cart.items.find(
      (item) => item.productId === productId
    );

    if (existingItem) {

      existingItem.quantity += quantity || 1;

    } else {

      cart.items.push({
        productId,
        productTitle,
        productImage,
        productPrice,
        quantity: quantity || 1,
        imageType: imageType || "product",
      });

    }

    await cart.save();

    res.status(200).json(cart);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }

});

/* ==========================
   INCREASE QUANTITY
========================== */

router.put("/increase", async (req, res) => {

  try {

    const { userId, productId } = req.body;

    const cart = await Cart.findOne({
      userId,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (i) => i.productId === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    item.quantity++;

    await cart.save();

    res.json(cart);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

/* ==========================
   DECREASE QUANTITY
========================== */

router.put("/decrease", async (req, res) => {

  try {

    const { userId, productId } = req.body;

    const cart = await Cart.findOne({
      userId,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    const item = cart.items.find(
      (i) => i.productId === productId
    );

    if (!item) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    item.quantity--;

    cart.items = cart.items.filter(
      (i) => i.quantity > 0
    );

    await cart.save();

    res.json(cart);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

/* ==========================
   REMOVE ITEM
========================== */

router.post("/remove", async (req, res) => {

  try {

    const { userId, productId } = req.body;

    const cart = await Cart.findOne({
      userId,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = cart.items.filter(
      (item) => item.productId !== productId
    );

    await cart.save();

    res.json(cart);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

/* ==========================
   CLEAR CART
========================== */

router.delete("/:userId", async (req, res) => {

  try {

    const cart = await Cart.findOne({
      userId: req.params.userId,
    });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found",
      });
    }

    cart.items = [];

    await cart.save();

    res.json({
      message: "Cart Cleared",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

module.exports = router;