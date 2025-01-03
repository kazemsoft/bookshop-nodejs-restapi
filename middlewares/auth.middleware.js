const userService = require("../services/user.service");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "توکن یافت نشد" });
  }
  const decoded = userService.verifyToken(token.split(" ")[1]);
  if (!decoded) {
    return res.status(401).json({ message: "توکن نا معتبر" });
  }
  req.user = decoded;
  next();
};

const authorizeAdmin = async (req, res, next) => {
  const user = await userService.getUserById(req.user.id);
  if (user.role !== "admin") {
    return res.status(401).json({ message: "دسترسی غیر مجاز" });
  }
  next();
};

module.exports = {
  authenticate,
  authorizeAdmin,
};
