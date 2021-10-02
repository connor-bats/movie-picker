const mongoose = require('mongoose')

const movieModel = require('../models/MovieModel')



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


module.exports = {
    getMovies,
    addMovies, 
    randomMovie
}