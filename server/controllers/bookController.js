const Book = require('../models/Book');

exports.createBook = async (req, res) => {
    try{
        const { title, author, genre, publication_year, ISBN } = req.body;
        const newBook = new Book({ title, author, genre, publication_year, ISBN });
        await newBook.save();
        res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (err) {
        res.status(500).json({ error: 'Error creating book', details: err.message });
    }
};

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching books', details: err.message });
    }
};

exports.getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching book', details: err.message });
    }
};

exports.updateBookById = async (req, res) => {
    try {
        const { title, author, genre, publication_year, ISBN } = req.body;
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            { title, author, genre, publication_year, ISBN },
            { new: true, runValidators: true }
        );
        if (!updatedBook) return res.status(404).json({ error: 'Book not found' });
        res.status(200).json({ message: 'Book updated successfully', book: updatedBook });
    } catch (err) {
        res.status(500).json({ error: 'Error updating book', details: err.message });
    }
};

exports.deleteBookById = async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) return res.status(404).json({ error: 'Book not found' });
        res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
    } catch (err) {
        res.status(500).json({ error: 'Error deleting book', details: err.message });
    }
};