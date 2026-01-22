
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const hashPasswordGenerater = async (password) => {
  try {
    if (!password) {
      throw new Error("Password is required");
    }

    return await bcrypt.hash(password, SALT_ROUNDS);
  } catch (error) {
    throw new Error("Password hashing failed");
  }
};

const hashPasswordChecker = async (password, hash) => {
  try {
    if (!password || !hash) {
      throw new Error("Password or hash missing");
    }

    return await bcrypt.compare(password, hash);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

module.exports = {
  hashPasswordGenerater,
  hashPasswordChecker,
};
