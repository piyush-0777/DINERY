const categories = require('../models/categories-model')
const categoryService = require('../services/categoryService')


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

exports.deletCategory = async (req , res) => {
    try{
    const category_id = req.params.categoryId;
    const res = req.restaurant;
    if(!res || category_id) {
        return res.status(404).json({error: 'res or cat id is not found'})
    }

    const result = await categoryService.deletCategory(category_id , res._id)
    if(result) {
        return res.status(200).json({message:'category deleted.'})
    }
} catch (error) {
    console.log(error);
    return res.status(500).json({error:'internal server error'})
}
}