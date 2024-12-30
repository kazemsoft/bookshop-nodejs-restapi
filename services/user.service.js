const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const createUser = async (userData) => {
  return await User.create(userData);
};

const getUserByUsernameOrEmail = async (identifier) => {
  return await User.findOne({
    where: {
      [Op.or]: [{ username: identifier }, { email: identifier }],
    },
  });
};

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return null;
  }
};
const updateUserRole = async (id, role) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw new Error("User not found");
  }
  return await user.update({ role });
};

const getUserById = async (id) => {
  return await User.findByPk(id);
};

module.exports = {
  createUser,
  getUserByUsernameOrEmail,
  generateToken,
  verifyToken,
  updateUserRole,
  getUserById,
};
