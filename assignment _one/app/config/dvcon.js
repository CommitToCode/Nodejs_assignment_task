const mongoose = require("mongoose");

const dbcon = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_Url);
    console.log(" Database Connected...");
  } catch (error) {
    console.log(" DB Connection/Error:", error.message);
  }
};

module.exports = {
  jwtSecret: process.env.JWT_SECRET || "yoursecret",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "5h",
  dbcon
};
