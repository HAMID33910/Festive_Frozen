const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const Category = require("../models/Category");
const Product = require("../models/Product");

const router = express.Router();


// Upload folder

const uploadPath = path.join(__dirname, "../uploads");


if (!fs.existsSync(uploadPath)) {

  fs.mkdirSync(uploadPath, {
    recursive: true
  });

}



// Multer Storage

const storage = multer.diskStorage({


  destination: (req, file, cb) => {

    cb(null, uploadPath);

  },



  filename: (req, file, cb) => {

    const fileName =
      Date.now() + path.extname(file.originalname);


    cb(null, fileName);

  }


});



const upload = multer({
  storage
});




// GET ALL CATEGORIES

router.get("/", async(req,res)=>{


  try{


    const categories = await Category
    .find()
    .sort({
      createdAt:-1
    });



    res.json(categories);



  }
  catch(error){


    res.status(500).json({

      message:error.message

    });


  }


});







// ADD CATEGORY

router.post("/", upload.single("image"), async(req,res)=>{


try{


if(!req.file){


return res.status(400).json({

message:"Category image required"

});


}



const category = new Category({


title:req.body.title,


image:req.file.filename


});



await category.save();



res.status(201).json(category);



}
catch(error){


console.log(error);


res.status(500).json({

message:error.message

});


}



});









// UPDATE CATEGORY


router.put("/:id", upload.single("image"), async(req,res)=>{


try{


const category = await Category.findById(
  req.params.id
);



if(!category){


return res.status(404).json({

message:"Category not found"

});


}





const updateData = {


title:req.body.title


};






// If new image selected

if(req.file){



// Delete old image

if(category.image){


const oldImage =
path.join(
uploadPath,
category.image
);



if(fs.existsSync(oldImage)){


fs.unlinkSync(oldImage);


}


}



updateData.image=req.file.filename;


}






const updatedCategory =
await Category.findByIdAndUpdate(


req.params.id,


updateData,


{
new:true
}


);





res.json(updatedCategory);



}
catch(error){


console.log(error);


res.status(500).json({

message:error.message

});


}



});









// DELETE CATEGORY


router.delete("/:id", async(req,res)=>{


try{


const category =
await Category.findById(
req.params.id
);



if(!category){


return res.status(404).json({

message:"Category not found"

});


}




// Delete all products under this category and their images
const products = await Product.find({ categoryId: req.params.id });
const productUploadPath = path.join(__dirname, "../productuploads");

for (const product of products) {
  if (product.productImage) {
    const imgPath = path.join(productUploadPath, product.productImage);
    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath);
    }
  }
}

await Product.deleteMany({ categoryId: req.params.id });

// Delete category image from folder
if(category.image){


const imagePath =
path.join(
uploadPath,
category.image
);



if(fs.existsSync(imagePath)){


fs.unlinkSync(imagePath);


}


}




await Category.findByIdAndDelete(
req.params.id
);




res.json({

message:"Category Deleted"

});




}
catch(error){


console.log(error);


res.status(500).json({

message:error.message

});


}



});






module.exports = router;