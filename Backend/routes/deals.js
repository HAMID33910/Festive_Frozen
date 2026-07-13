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

router.get("/", async (req, res) => {
  try {
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

router.post(
  "/",
  upload.single("dealImage"),
  async (req, res) => {
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
        dealImage: req.file.filename,
      });

      await deal.save();

      res.status(201).json(deal);

    } catch (err) {

      res.status(500).json({
        message: err.message,
      });

    }
  }
);

router.delete("/:id", async (req, res) => {

  try {

    const deal = await Deal.findById(req.params.id);

    if (!deal) {
      return res.status(404).json({
        message: "Deal not found",
      });
    }

    const imagePath = path.join(
      uploadPath,
      deal.dealImage
    );

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