const jwt = require('jsonwebtoken')
const Restaurant = require('../models/restaurant-model')
const bcrypt = require('bcrypt')
const { hashPasswordGenerater, hashPasswordChecker } = require('../utils/hashPassword')
const foodsModel = require('../models/food-model')
const categoryModel = require('../models/categories-model')
const tableModel = require('../models/table-model')
const generateQR = require('../utils/generateQR')



exports.login = async (req, res) => {
  try {

    const { restaurantName, ownerName, ownerEmail, password } = req.body

    // find user deteal using  resturnt model
    const restaurant = await Restaurant.findOne({ ownerEmail });

    if (!restaurant) {
      res.status(401).json({ error: 'invalid email or password' })
      return;
    }

    const isMatchPassword = await hashPasswordChecker(password, restaurant.password);

    if (!isMatchPassword) {
      return res.status(401).json({
        error: "Invalid email or password"
      });
    }

    const token = jwt.sign({ ownerEmail }, process.env.JWT_SECRET_KEY, { expiresIn: "48h" })


    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // set true in production (HTTPS)
      sameSite: "lax",
      maxAge: 48 * 60 * 60 * 1000 // 48 hour

    })



    res.status(200).json({ massage: 'logged in' })
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }



}

exports.registerRestaurant = async (req, res) => {
  try {
    const {
      restaurantName,
      address,
      ownerName,
      password,
      ownerPhone,
      ownerEmail,
    } = req.body;

    // 1. Validate input
    if (!ownerEmail || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // 2. Check if user already exists
    const existingRestaurant = await Restaurant.findOne({ ownerEmail });
    if (existingRestaurant) {
      return res.status(409).json({
        error: "Email already registered",
      });
    }

    // 3. Hash password
    const hashedPassword = await hashPasswordGenerater(password);

    // 4. Create restaurant
    const restaurant = await Restaurant.create({
      restaurantName,
      address,
      ownerName,
      password: hashedPassword,
      ownerPhone,
      ownerEmail,
    });

    // 5. Generate JWT
    const token = jwt.sign(
      {
        id: restaurant._id,
        ownerEmail: restaurant.ownerEmail,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "48h" }
    );

    // 6. Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 48 * 60 * 60 * 1000,
    });

    // 7. Send response
    res.status(201).json({
      message: "Restaurant registered successfully",
      user: {
        id: restaurant._id,
        ownerName: restaurant.ownerName,
        ownerEmail: restaurant.ownerEmail,
        restaurantName: restaurant.restaurantName,
      },
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

exports.getDashBord = async (req, res) => {
  try {
    const restaurant = req.restaurant;
    if (!restaurant) {
      return res.status(404).json({ error: "restaurant is not found" })
    }
    const foods = await foodsModel.find({ restaurant: restaurant._id })
    const category = await categoryModel.find({ restaurant: restaurant._id })

    const tables = await tableModel.find({ restaurant: restaurant._id })
    let tablesWithQrimage = [];
    for (let table of tables) {
      const qrImage = await generateQR(table, restaurant.restaurantName)
      tablesWithQrimage.push({ ...table._doc, qrImage: qrImage })
    }
    res.status(200).json({ restaurant, foods, category , tables:tablesWithQrimage });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "server error" })
  }
}
