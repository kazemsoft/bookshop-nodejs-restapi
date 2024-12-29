const Author = require("../models/author.model");

const createAuthor = async (authorData) => {
  return await Author.create(authorData);
};

const getAllAuthors = async () => {
  return await Author.findAll();
};

const getAuthorById = async (id) => {
  return await Author.findByPk(id);
};

const updateAuthor = async (id, authorData) => {
  const author = await Author.findByPk(id);
  if (!author) {
    throw new Error("Author not found");
  }
  return await author.update(authorData);
};

const deleteAuthor = async (id) => {
  const author = await Author.findByPk(id);
  if (!author) {
    throw new Error("Author not found");
  }
  return await author.destroy();
};

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
