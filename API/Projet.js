const mongoose = require('mongoose');

const schema  = mongoose.Schema({
    date : Date
})

module.exports = mongoose.model('projet', schema);
