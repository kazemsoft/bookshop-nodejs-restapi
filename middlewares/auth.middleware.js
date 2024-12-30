const userService = require("../services/user.service");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  const decoded = userService.verifyToken(token.split(" ")[1]);
  if (!decoded) {
    return res.status(403).json({ message: "Failed to authenticate token" });
  }
  req.user = decoded;
  next();
};

const authorizeAdmin = async (req, res, next) => {
  const user = await userService.getUserById(req.user.id);
  if (user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

module.exports = {
  authenticate,
  authorizeAdmin,
};
