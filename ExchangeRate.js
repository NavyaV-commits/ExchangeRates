const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exchangeRateSchema = new Schema({
    Country: String,
    Date: Date,
    Value: String   
   
});

module.exports = mongoose.model('ExchangeRate', exchangeRateSchema);