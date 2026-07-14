const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Product = require("../models/Product");

const router = express.Router();


// Create productuploads folder automatically

const uploadPath = path.join(__dirname, "../productuploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}


/* Upload */

const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, uploadPath);

  },


  filename: (req, file, cb) => {

    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );

  }

});


const upload = multer({ storage });



// /* GET PRODUCTS */

// router.get("/", async (req,res)=>{

// try{

// const products = await Product.find()
// .populate("categoryId");

// res.json(products);


// }
// catch(err){

// res.status(500).json({
// message:err.message
// });

// }

// });


/* GET PRODUCTS */

/* GET PRODUCTS */

router.get("/", async (req, res) => {
  try {
    const { categoryId } = req.query;

    let filter = {};

    if (categoryId) {
      filter.categoryId = categoryId;
    }

    const products = await Product.find(filter)
      .populate("categoryId");

    res.json(products);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
});




/* ADD PRODUCT */

router.post("/", upload.single("productImage"), async(req,res)=>{


try{


if(!req.file){

return res.status(400).json({

message:"Product image required"

});

}



const product = new Product({

productTitle:req.body.productTitle,

productPrice:req.body.productPrice,

categoryId:req.body.categoryId,

productImage:req.file.filename,

description:req.body.description,

stock:req.body.stock || 0

});



await product.save();



res.status(201).json(product);



}

catch(err){

console.log(err);

res.status(500).json({

message:err.message

});

}


});





/* UPDATE PRODUCT */


router.put("/:id", upload.single("productImage"), async(req,res)=>{


try{


const updateData={

productTitle:req.body.productTitle,

productPrice:req.body.productPrice,

categoryId:req.body.categoryId,

description:req.body.description,

stock:req.body.stock

};



if(req.file){

updateData.productImage=req.file.filename;

}



const product =
await Product.findByIdAndUpdate(

req.params.id,

updateData,

{new:true}

);



res.json(product);


}

catch(err){

res.status(500).json(err);

}


});





/* DELETE PRODUCT */


router.delete("/:id", async(req,res)=>{


try{


await Product.findByIdAndDelete(req.params.id);


res.json({

message:"Product Deleted"

});


}
catch(err){

res.status(500).json(err);

}


});

router.get("/:id", async (req, res) => {
  try {

    const product = await Product.findById(req.params.id)
      .populate("categoryId");

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json(product);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }
});



module.exports = router;