const foodModel = require('../models/food-model')
const foodService = require('../services/foodService')
const deleteImage = require('../utils/deletImg')

exports.createFood = async(req , res) =>{
try {
 const {name , description, price, category} = req.body

 const resId =  req.restaurant._id;

 if(!resId) {
  return res.status(401).json({error:'resturant is ont found'})
 }

if (!req.file) {
  return res.status(400).json({ error: "Image is required" });
}
 const foodImg = req.file.path;
 

 
 const food = await foodModel.create({
    restaurant:resId ,name , description, price, category , foodImg , publicId:req.file.filename
 })
 console.log(food)

 return res.status(200).json({message: 'done' , food});
} catch(err) {
  console.log(err)
  return res.status(500).json({error: 'server error 121' })
}

}

exports.deletFood = async (req , res) => {
  try {
    const resId =  req.restaurant._id;

 if(!resId) {
  return res.status(401).json({error:'resturant is ont found'})
 }
 const foodId = req.params.foodId;

 if(!resId) {
  return res.status(401).json({error:'foodid is ont found'});
 }

 const isdelet = await foodService.deletFood(foodId , resId);

 if(isdelet) {
  return res.status(200).json({message:'food deleted..'})
 }
 
  } catch (error) {
    console.log(error)
  return res.status(500).json({error: 'server error' })
  }
}

exports.editFood = async (req , res ) => {
  
  try {
    console.log(req.params.foodId);
    const food = await foodModel.findById(req.params.foodId);
    console.log('food', food)
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }

    // Update normal fields
    food.name = req.body.name;
    food.description = req.body.description;
    food.price = req.body.price;
    food.category = req.body.category;
    food.isAvailable = req.body.isAvailable;

    // ✅ IMAGE CHANGE CHECK
    if (req.file) {
      console.log("Image changed");

      // 🧹 delete old image
      if (food.publicId) {
        await deleteImage(food.publicId);
      }

      // multer-storage-cloudinary already uploaded it
      food.foodImg = req.file.path;        // secure_url
      food.publicId = req.file.filename; // public_id
    }

    await food.save();

    res.json({
      status: "success",
      message: "Food updated successfully",
      data: food
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message });
  }


}