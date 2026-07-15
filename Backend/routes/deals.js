const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Deal = require("../models/Deal");

const router = express.Router();

const uploadPath = path.join(__dirname, "../dealuploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadPath);
  },

  filename(req, file, cb) {
    cb(
      null,
      Date.now() +
        "-" +
        Math.round(Math.random() * 1e9) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
});

/* ==========================
   GET ALL DEALS
========================== */

router.get("/", async (req, res) => {
  try {
    // Remove expired deals automatically
    await Deal.deleteMany({
      endDate: {
        $lt: new Date(),
      },
    });

    const deals = await Deal.find().sort({
      createdAt: -1,
    });

    res.json(deals);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ==========================
   GET SINGLE DEAL
========================== */

router.get("/:id", async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({
        message: "Deal not found",
      });
    }

    res.json(deal);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ==========================
   ADD DEAL
========================== */

router.post("/", upload.single("dealImage"), async (req, res) => {
  try {
    const {
      dealName,
      description,
      originalPrice,
      discountedPrice,
      discount,
      startDate,
      endDate,
      status,
    } = req.body;

    const deal = new Deal({
      dealName,
      description,
      originalPrice,
      discountedPrice,
      discount,
      startDate,
      endDate,
      status,
      dealImage: req.file ? req.file.filename : "",
    });

    await deal.save();

    res.status(201).json(deal);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ==========================
   UPDATE DEAL
========================== */

router.put("/:id", upload.single("dealImage"), async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({
        message: "Deal not found",
      });
    }

    // Delete old image if new uploaded
    if (req.file) {
      const oldImage = path.join(uploadPath, deal.dealImage);

      if (fs.existsSync(oldImage)) {
        fs.unlinkSync(oldImage);
      }

      deal.dealImage = req.file.filename;
    }

    deal.dealName = req.body.dealName;
    deal.description = req.body.description;
    deal.originalPrice = req.body.originalPrice;
    deal.discountedPrice = req.body.discountedPrice;
    deal.discount = req.body.discount;
    deal.startDate = req.body.startDate;
    deal.endDate = req.body.endDate;
    deal.status = req.body.status;

    await deal.save();

    res.json(deal);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ==========================
   DELETE DEAL
========================== */

router.delete("/:id", async (req, res) => {
  try {
    const deal = await Deal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({
        message: "Deal not found",
      });
    }

    const imagePath = path.join(uploadPath, deal.dealImage);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Deal.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deal deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;