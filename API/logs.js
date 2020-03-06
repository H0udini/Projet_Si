const mongoose = require('mongoose');
const schema  = mongoose.Schema({
    date : Date,
    action : String
})


module.exports = mongoose.model('logs', schema);