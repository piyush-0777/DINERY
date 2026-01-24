const categories = require('../models/categories-model')


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
            image: image
        });
        console.log('this is' , category);
        return res.status(200).json({message:'category added' , category});
    } catch (err) {

        console.log(error);
        res.status(500).json({error: 'server error'});
    }

}