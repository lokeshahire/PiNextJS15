const express = require("express");
const { connectDB } = require("./configs/db");
require("dotenv").config();

const app = express();
app.use(express.json());

app.listen(process.env.PORT, async () => {
  try {
    await connectDB;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }

  console.log(`Server is running on port ${process.env.PORT}`);
});
