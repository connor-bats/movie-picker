const mongoose = require('mongoose');

const bucketListItem = new mongoose.Schema({
    name : {
        type: String,
        requried: true,
        unique : true
    },

    added_by : {
        type: String,
        required : true
    },
    added_on : {
        type: Date,
        default : Date.now
    },
    watched : {
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model('BucketList', bucketListItem)