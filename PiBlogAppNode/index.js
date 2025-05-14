const express = require("express");
const { connectDB } = require("./configs/db");
require("dotenv").config();
const cors = require("cors");
const { userRouter } = require("./routes/User.routes");
const { blogRouter } = require("./routes/Blog.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome to the PiBlog API");
});

app.use("/users", userRouter);
app.use("/blogs", blogRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connectDB;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }

  console.log(`Server is running on port ${process.env.PORT}`);
});
