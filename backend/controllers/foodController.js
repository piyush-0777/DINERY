const foodModel = require('../models/food-model')

exports.createFood = async(req , res) =>{
try {
 const {name , description, price, category} = req.body
 console.log( {name , description, price, category})
 const resId =  req.restaurant._id;
 console.log('foodcont' , req.restaurant)
 if(!resId) {
  return res.status(401).json({error:'resturant is ont found'})
 }

if (!req.file) {
  return res.status(400).json({ error: "Image is required" });
}
 const foodImg = req.file.path;
 console.log('food img ' , foodImg);
 
 const food = await foodModel.create({
    restaurant:resId ,name , description, price, category , foodImg
 })
 console.log(food);

 return res.status(200).json({message: 'done' , food});
} catch(err) {
  console.log(err)
  return res.status(500).json({error: 'server error 121' })
}

}