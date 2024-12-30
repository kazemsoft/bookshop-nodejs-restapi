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
  .then(() => {
    console.log("Database synced");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bookstore application." });
});

module.exports = app;
