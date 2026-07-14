const express = require("express");
const router = express.Router();

const Order = require("../models/Order");

/* ==========================
   GET ALL ORDERS
========================== */

router.get("/", async (req, res) => {
  try {

    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json(orders);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
});

/* ==========================
   GET SINGLE ORDER
========================== */

router.get("/:id", async (req, res) => {
  try {

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }

    res.status(200).json(order);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
});

/* ==========================
   CREATE ORDER
========================== */

router.post("/", async (req, res) => {

  try {

    const order = new Order({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      address: req.body.address,
      postalCode: req.body.postalCode,
      paymentMethod: req.body.paymentMethod,
      items: req.body.items,
      totalPrice: req.body.totalPrice,
    });

    await order.save();

    res.status(201).json({
      message: "Order Placed Successfully",
      order,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }

});

/* ==========================
   UPDATE STATUS
========================== */

router.put("/:id", async (req, res) => {

  try {

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        status: req.body.status,
      },
      {
        new: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }

    res.status(200).json(order);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

/* ==========================
   DELETE ORDER
========================== */

router.delete("/:id", async (req, res) => {

  try {

    const order = await Order.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }

    res.json({
      message: "Order Deleted Successfully",
    });

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

});

module.exports = router;