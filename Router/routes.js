const express = require('express')
const router = express.Router()
const { getMovies, addMovies, randomMovie, addQuotes,getQuotes } = require('../controllers/movie_controller')

router.get('/getAllMovies', getMovies);
router.post('/addMovie', addMovies);
router.get('/randomMovie', randomMovie);
router.post('/addQuote', addQuotes);
router.post('/searchQuotes', getQuotes)

module.exports = router