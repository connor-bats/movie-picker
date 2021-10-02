const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const movieUrls = require('./Router/routes')
require('dotenv').config()


mongoose.connect(process.env.DATABASE_URL,{useUnifiedTopology: true, useNewUrlParser: true}, (err) => {
    if(err){
        console.log(err)
    
    }
    else{
        console.log('DATABASE CONNECTED')
        app.emit('ready');
    }
})

app.use(express.json({
    limit:'200mb'
}))
app.use(cors())

app.use('/movies', movieUrls)



app.on('ready', () => {
    app.listen(process.env.PORT || 5000, () => {
        console.log('Server is up and running')
    })
})