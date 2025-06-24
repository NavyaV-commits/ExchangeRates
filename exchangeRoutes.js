const express = require('express');
const router = express.Router();
const ExchangeRate = require('./ExchangeRate');

// Fetch exchange rates from the database
async function fetchExchangeRates(country, startDate, endDate) {
    const records = await ExchangeRate.find({
        Country: { $regex: new RegExp(`^${country}$`, 'i') }, 
        Date: { $gte: startDate, $lte: endDate }
    });
    return records
}

async function calculateExchangeDifference(fromCountry, toCountry, startDate, endDate) {
    const fromRates = await fetchExchangeRates(fromCountry, startDate, endDate);
    const toRates = await fetchExchangeRates(toCountry, startDate, endDate);

    if (fromRates.length === 0 || toRates.length === 0) {
        throw new Error('Exchange rates not found for one or both countries');
    }

    const exchangeDifferences = [];
    for (let i = 0; i < fromRates.length; i++) {
        const fromRate = fromRates[i].Value;
        const toRate = toRates[i] ? toRates[i].Value : null;
        const date = fromRates[i].Date; // Assuming both arrays are sorted by date

        const difference = toRate - fromRate;
        exchangeDifferences.push({ date, difference });
    }

    return exchangeDifferences;
}

router.get('/', async (req, res) => {
    try {
        const { from, to, startDate, endDate } = req.query;
        const exchangeDifference = await calculateExchangeDifference(from, to, new Date(startDate), new Date(endDate));

        res.json({
            fromCountry: from,
            toCountry: to,
            startDate,
            endDate,
            exchangeDifference
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;