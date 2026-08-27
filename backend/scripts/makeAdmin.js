require("dotenv").config();
const mongoose = require("../config/mongoDB-connection");
const Restaurant = require("../models/restaurant-model");
const ROLES = require("../constants/roles");

async function makeAdmin() {
  const email = process.argv[2];

  if (!email) {
    console.log("❌ Error: Please provide an email address.");
    console.log("Usage: node scripts/makeAdmin.js <ownerEmail>");
    process.exit(1);
  }

  try {
    const restaurant = await Restaurant.findOne({ ownerEmail: email });

    if (!restaurant) {
      console.log(`❌ Error: No account found with email '${email}'.`);
      process.exit(1);
    }

    restaurant.role = ROLES.ADMIN;
    await restaurant.save();

    console.log("=========================================");
    console.log(`🎉 SUCCESS! Account '${restaurant.ownerEmail}' (${restaurant.restaurantName}) is now an ADMIN!`);
    console.log(`Role: ${restaurant.role}`);
    console.log("=========================================");
    console.log("You can now log in with this account and access the Admin Console at /admin");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating account to admin:", error);
    process.exit(1);
  }
}

makeAdmin();
