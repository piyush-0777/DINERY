const foodModel = require('../models/food-model')

exports.createFood = async(req , res) =>{
try {
 const {name , description, price, category} = req.body
 const foodImg = req.file.path;
 const resId = req.restaurant.objectId;
 if(!resId) {
  return res.status(401).json({error:'resturant is ont found'})
 }
 const food = await foodModel.create({
    restaurant:resId ,name , description, price, category , foodImg
 })

 return res.status(200).json({message: 'done' , food});
} catch(eror) {
  return res.status(500).json({error: 'server error'})
}

}