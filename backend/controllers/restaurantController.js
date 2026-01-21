const jwt = require('jsonwebtoken')
const Restaurant = require('../models/restaurant-model')
const bcrypt = require('bcrypt')
const { hashPasswordGenerater, hashPasswordChecker } = require('../utils/hashPassword')



exports.login = async (req, res) => {

    const { name, ownerName, ownerEmail, password } = req.body

    // find user deteal using  resturnt model
    const restaurant = await Restaurant.findOne({ ownerEmail });



    if (!restaurant) {
        res.status(400).json({ error: 'invalid email or password' })
        return;
    } else {
        const isMatchPassword = await hashPasswordChecker(password, restaurant.password);

        if (isMatchPassword) {

            const token = jwt.sign({ ownerEmail }, process.env.JWT_SECRET_KEY, { expiresIn: "48h" })

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
            res.status(200).json({ massage: 'logged in' , restaurant })
        } else {
            res.status(400).json({ error: 'invalid email or password' })
            return;
        }
    }
}

exports.registerRestaurant = async (req, res) => {
    const { name, address, ownerName, password, ownerPhone, ownerEmail } = req.body;

    let hash;
    try {

        hash = await hashPasswordGenerater(password);
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
        res.status(200).json({ massage: 'logged in' , restaurant:restaurant })
    }
}