const categories = require('../models/categories-model')
const categoryService = require('../services/categoryService')
const deleteImage = require('../utils/deletImg')

exports.addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        if (!req.file) {
            return res.status(404).json({ error: "image is require" })
        }
        const image = req.file.path;
        const resid = req.restaurant._id
        const category = await categories.create({
            restaurant: resid,
            name: name,
            image: image,
            publicId:req.file.filename ,
        });
        console.log('this is' , category);
        return res.status(200).json({message:'category added' , category});
    } catch (err) {

        console.log(error);
        res.status(500).json({error: 'server error'});
    }

}

exports.deletCategory = async (req, res) => {
  try {
    const category_id = req.params.categoryId;
    const restaurant = req.restaurant; // ✅ renamed

    if (!restaurant || !category_id) {
      return res.status(404).json({ error: 'res or cat id is not found' });
    }

    const result = await categoryService.deletCategory(
      category_id,
      restaurant._id
    );

    if (result) {
      return res.status(200).json({ message: 'category deleted.' });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'internal server error' });
  }
};

exports.editCategory = async (req , res) => {
  try {
    const category = await categories.findById(req.params.categoryId)

     if (!category) {
      return res.status(404).json({ message: "category not found" });
    }

    category.name = req.body.name;

    if (req.file) {
          console.log("Image changed");
    
          // 🧹 delete old image
          if (category.publicId) {
            await deleteImage(category.publicId);
          }
    
          // multer-storage-cloudinary already uploaded it
          category.image = req.file.path;        // secure_url
          category.publicId = req.file.filename; // public_id
        }
   res.status(200).json({
      status: "success",
      message: "category updated successfully",
      data: category
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }

}
