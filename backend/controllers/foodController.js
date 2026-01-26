const foodModel = require('../models/food-model')
const foodService = require('../services/foodService')

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