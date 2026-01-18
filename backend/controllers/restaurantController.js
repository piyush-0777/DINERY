const jwt = require('jsonwebtoken')
const Restaurant = require('../models/restaurant-model')
const bcrypt = require('bcrypt')
const hashPassword = require('../utils/hashPassword')



exports.login = (req, res) => {

    const { name, ownerName, email, password } = req.body

    // find user deteal using  resturnt model
    let user;

    if (!user) {
        res.status(400).json({ error: 'invalid email or password' })
        return;
    } else {

        const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, { expiresIn: "48h" })

        if (token) {
            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // set true in production (HTTPS)
                sameSite: "lax",
                maxAge: 48 * 60 * 60 * 1000 // 48 hour

            })
        } else {
            res.tatus(400).json({
                error: 'jsonwebtoken is fail to genarete token'
            })
            return;
        }
        res.tatus(200).json({ massage: 'logged in' })
    }
}

exports.registerRestaurant = async (req, res) => {
    const { name, address, ownerName, password, ownerPhone, ownerEmail } = req.body;

    let hash;
 try {

     hash = await hashPassword(password);
 } catch (error) {
    console.log(error)
 }
    
    // register data in mongoDB
    
    const restaurant = await Restaurant.create({
        name, address, ownerName, password: hash, ownerPhone, ownerEmail
    })


    if (!restaurant) {
        res.status(400).json({ error: 'invalid email or password' })
        return;
    } else {

        const token = jwt.sign({ ownerName }, process.env.JWT_SECRET_KEY, { expiresIn: "48h" })

        if (token) {
            res.cookie("token", token, {
                httpOnly: true,
                secure: false, // set true in production (HTTPS)
                sameSite: "lax",
                maxAge: 48 * 60 * 60 * 1000 // 48 hour

            })
        } else {
            res.status(400).json({
                error: 'jsonwebtoken is fail to genarete token'
            })
            return;
        }
        res.status(200).json({ massage: 'logged in' })
    }
}