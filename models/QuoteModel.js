const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    quote :{
        type: String,
        required: true
    },
    movie : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Movies',
        required: true,
    },
    created_at : {
        type: Date,
        default: Date.now()
    }
})


module.exports = mongoose.model('Quotes', quoteSchema);
