const express = require('express');
const router = express.Router();
const bookService = require('../services/book.service');
const {authenticate, authorizeAdmin} = require('../middlewares/auth.middleware');

router.post('/', authenticate, authorizeAdmin, async (req, res) => {
    try {
        const newBook = await bookService.createBook(req.body);
        res.status(201).json(newBook);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/search', async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            return res.status(400).json({ message: 'Query parameter "q" is required' });
        }
        const books = await bookService.searchBooks(query);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const book = await bookService.getBookById(req.params.id);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id',authenticate, authorizeAdmin, async (req, res) => {
    try {
        const updatedBook = await bookService.updateBook(req.params.id, req.body);
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.delete('/:id',authenticate, authorizeAdmin, async (req, res) => {
    try {
        await bookService.deleteBook(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

module.exports = router;