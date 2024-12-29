const Book = require("../models/book.model");
const Author = require("../models/author.model");
const { Op } = require("sequelize");

const createBook = async (bookData) => {
  return await Book.create(bookData);
};

const getAllBooks = async () => {
  return await Book.findAll({ include: Author });
};

const getBookById = async (id) => {
  return await Book.findByPk(id, { include: Author });
};

const updateBook = async (id, bookData) => {
  const book = await Book.findByPk(id);
  if (!book) {
    throw new Error("Book not found");
  }
  return await book.update(bookData);
};

const deleteBook = async (id) => {
  const book = await Book.findByPk(id);
  if (!book) {
    throw new Error("Book not found");
  }
  return await book.destroy();
};
const searchBooks = async (query) => {
  return await Book.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { description: { [Op.like]: `%${query}%` } },
      ],
    },
    include: Author,
  });
};

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
  searchBooks,
};
