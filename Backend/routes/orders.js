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
   TRACK ORDER BY ORDER ID
========================== */

router.get("/track/:orderId", async (req, res) => {

  try {

    const order = await Order.findOne({
      orderId: req.params.orderId,
    });

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

    const totalOrders = await Order.countDocuments();

    const today = new Date();

    const orderId =
      "FF-" +
      today.getFullYear() +
      String(today.getMonth() + 1).padStart(2, "0") +
      String(today.getDate()).padStart(2, "0") +
      "-" +
      String(totalOrders + 1).padStart(6, "0");

    const estimatedDelivery = new Date();

    estimatedDelivery.setDate(
      estimatedDelivery.getDate() + 5
    );

    const order = new Order({

      orderId,

      firstName: req.body.firstName,

      lastName: req.body.lastName,

      email: req.body.email,

      phone: req.body.phone,

      address: req.body.address,

      postalCode: req.body.postalCode,

      paymentMethod: req.body.paymentMethod,

      items: req.body.items,

      totalPrice: req.body.totalPrice,

      estimatedDelivery,

      trackingHistory: [
        {
          status: "Pending",
        },
      ],

    });

    await order.save();

    res.status(201).json({

      message: "Order Placed Successfully",

      order,

      orderId: order.orderId,

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

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }

    order.status = req.body.status;

    order.trackingHistory.push({
      status: req.body.status,
      date: new Date(),
    });

    await order.save();

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

    const order = await Order.findByIdAndDelete(
      req.params.id
    );

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