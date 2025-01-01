const express = require("express");
const router = express.Router();
const userService = require("../services/user.service");
const {
  authorizeAdmin,
  authenticate,
} = require("../middlewares/auth.middleware");

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, username, email, password } = req.body;
    const newUser = await userService.createUser({
      firstName,
      lastName,
      username,
      email,
      password,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await userService.getUserByUsernameOrEmail(identifier);

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isPasswordValid = await user.isValidPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = userService.generateToken(user);
    res.status(200).json({ message: "Logged in successfully", token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.put("/:id/role", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const { role } = req.body;
    const updatedUser = await userService.updateUserRole(req.params.id, role);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
