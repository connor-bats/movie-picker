const express = require('express')
const router = express.Router()
const { getMovies, addMovies, randomMovie } = require('../controllers/movie_controller')

router.get('/getAllMovies', getMovies);
router.post('/addMovie', addMovies);
router.get('/randomMovie', randomMovie)

module.exports = router