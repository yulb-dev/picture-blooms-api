const mongoose = require('mongoose')

var labels = new mongoose.Schema({
    value: {   // label值
        type: String,
        unique: true
    },
    clicksnum: {
        type: Number,
        default: 0
    },
})

const Labels = mongoose.model('Labels', labels, 'labels')

module.exports = Labels

