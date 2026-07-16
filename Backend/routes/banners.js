const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Banner = require("../models/Banner");

const router = express.Router();

const uploadPath = path.join(__dirname, "../banneruploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, {
    recursive: true,
  });
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
   GET ALL BANNERS
========================== */

router.get("/", async (req, res) => {
  try {
    const banners = await Banner.find().sort({
      createdAt: -1,
    });

    res.json(banners);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ==========================
   ADD BANNER
========================== */

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload an image.",
      });
    }

    const banner = new Banner({
      image: req.file.filename,
    });

    await banner.save();

    res.status(201).json(banner);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

/* ==========================
   DELETE BANNER
========================== */

router.delete("/:id", async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);

    if (!banner) {
      return res.status(404).json({
        message: "Banner not found",
      });
    }

    const imagePath = path.join(
      uploadPath,
      banner.image
    );

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Banner.findByIdAndDelete(req.params.id);

    res.json({
      message: "Banner deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;