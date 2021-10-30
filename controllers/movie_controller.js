const e = require('express')
const mongoose = require('mongoose')

const movieModel = require('../models/MovieModel')

const quoteModel = require('../models/QuoteModel')

const getMovies = (req, res) =>{
    movieModel.find().sort({'added_on' : 1})
        .then(data => {
            console.log(data)
            
            res.status(200).json({
                    success : true,
                    data : data
            })                
        })

        .catch(err => {
            console.log(err)
            return res.status(400).json({
                success : false,
                err : err
            })
        })
}


const addMovies = (req, res ) => {
    const newMovie = new movieModel({
        name : req.body.name,
        added_by : req.body.username

    })

    newMovie.save()
        .then(data => {
            console.log(data)
            return res.status(200).json({
                success : true,
                data : data 
            })
        })

        .catch(err => {
            console.log(err)
            return res.status(400).json({
                success : false,
                err : err 
            })
        })
}


const randomMovie =async (req, res) => {

    try{
    const qty = await movieModel.count();

    var skip_var = Math.floor(Math.random() * qty)

    const data = await movieModel.findOne().skip(skip_var)

    console.log(data)
    return res.status(200).json({
        success : true,
        data: data
    })
    
    }
    catch(err){
        console.log(err)
        return res.status(400).json({
            success : false,
            err : err
        })
    }


}

const addQuotes  = (req, res) => {
    const newQuote = new quoteModel({
        quote : req.body.quote,
        movie : req.body.movie,

    })

    newQuote.save()
        .then(data => {
            console.log(data)
            res.status(200).json({
                success : true,
                data : data
            })
        })

        .catch(err => {
            res.status(400).json({
                success : false,
                err : err
            })
        })
}


const getQuotes = (req, res) => {
    const search_term = req.body.search ? req.body.search.toLowerCase() : '';
    console.log('Here comes the search term', search_term)
    if(search_term == '' || search_term.length <=3){
        quoteModel.find().populate('movie')
            .then(data => {
                console.log('All quotes are sent');
                res.status(200).json({
                    success : true,
                    data : data
                })

            })

            .catch(err =>{
                console.log('An error has occured', err)
                res.status(400).json({
                    success : false,
                    err : err
                })
            })
    }
    else{
        quoteModel.find({}).populate('movie')
            .then(data => {
                data = data.filter((movie) => {
                    console.log(movie)
                    if(movie.movie.name.toLowerCase().includes(search_term) || movie.quote.toLowerCase().includes(search_term)){
                        return movie;
                    }

                })
                res.status(200).json({
                    success : true,
                    data : data
                })

            })

            .catch(err =>{
                console.log('An error has occured', err)
                res.status(400).json({
                    success : false,
                    err : err
                })
            })
    }


}




module.exports = {
    getMovies,
    addMovies, 
    randomMovie,
    addQuotes,
    getQuotes
}