const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");

const auth = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) return res.status(401).json({ message: "Auth token missing" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded.id);
    if (!user) throw new Error();

    req.user = user;
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

const authorizeRole = (role) => (req, res, next) => {
  if (req.user.role !== role)
    return res.status(403).json({ message: "Forbidden" });
  next();
};

module.exports = { auth, authorizeRole };
