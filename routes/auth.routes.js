const express = require("express");
const router = express.Router();
const authorService = require("../services/author.service");
const {
  authenticate,
  authorizeAdmin,
} = require("../middlewares/auth.middleware");

router.post("/", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const newAuthor = await authorService.createAuthor(req.body);
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const author = await authorService.getAuthorById(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/:id", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const updatedAuthor = await authorService.updateAuthor(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.delete("/:id", authenticate, authorizeAdmin, async (req, res) => {
  try {
    await authorService.deleteAuthor(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
