const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const bookRoutes = require("./routes/book.routes");
const authorRoutes = require("./routes/author.routes");
const authRoutes = require("./routes/auth.routes");
const sequelize = require("./config/db.config");
const {
  authenticate,
  authorizeAdmin,
} = require("./middlewares/auth.middleware");
const userService = require("./services/user.service");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);

// Sync database
sequelize
  .sync({ alter: true })
  .then(async () => {
    console.log("Database synced");
    // Seed admin user
    const adminUser = await userService.getUserByUsernameOrEmail("admin");
    if (!adminUser) {
      console.log("Creating admin user...");
      await userService.createUser({
        firstName: "Arshiya",
        lastName: "Tajik",
        username: "admin",
        email: "admin@yoursite.com",
        password: "admin",
        role: "admin",
      });
      console.log("Admin user created successfully.");
    } else {
      console.log("Admin user already exists.");
    }
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bookstore application." });
});

module.exports = app;
