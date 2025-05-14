const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = mongoose.connect(process.env.MongoDB_URI);

module.exports = { connectDB };
