const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticate = (req , res , next) =>{
    try {
        const token = req.cookies?.token;

        if(!token) {
            res.status(401).json({error: 'token is not provide'})
        }


        const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY)
        req.restaurant = decoded;
        next()
    } catch(error) {
        console.log(error);
    }
}

module.exports = authenticate;