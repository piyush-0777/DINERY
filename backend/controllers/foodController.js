const foodModel = require('../models/food-model')

exports.createFood = async(req , res) =>{

 const {name , description, price, category} = req.body
 const foodImg = req.file.path;
 const food = await foodModel.create({
    restaurant:req.restaurant.objectId ,name , description, price, category , foodImg
 })



 res.status(200).json({message: 'done' , food});

}