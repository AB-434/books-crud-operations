const express = require('express');
const router = express.Router();
const {
    createBook,
    getAllBooks,
    getBookById,
    updateBookById,
    deleteBookById
} = require('../controllers/bookController');

router.post('/', createBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBookById);
router.delete('/:id', deleteBookById)

module.exports = router;