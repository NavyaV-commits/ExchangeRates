
const mongoose = require('mongoose');
const axios = require('axios');
const express = require('express');
const app = express();

const ExchangeRate = require('./ExchangeRate');
const exchangeRoutes = require('./exchangeRoutes');

// URL of the data
const url = 'https://datahub.io/core/exchange-rates/r/daily.json';

// Function to download data
async function downloadData(url) {
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.error('Error downloading data:', error);
        throw error;
    }
}

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Function to save data to MongoDB
async function saveDataToMongoDB(data) {
    const jsonString = JSON.stringify(data.data);
    const jsonData = JSON.parse(jsonString);
    for (const dataObj of jsonData) {
        // Create a new instance of ExchangeRate with data from the object
        const exchangeRate = new ExchangeRate({
            Date: dataObj.Date,
            Country: dataObj.Country,
            Value: dataObj.Value
        });

        try {
            // Save the new exchangeRate document to the database
            await exchangeRate.save();
            console.log('ExchangeRate saved successfully:', exchangeRate);
        } catch (error) {
            console.error('Error saving ExchangeRate:', error);
        }
    }
}

// Main function to download data and save to file
async function main() {
    try {
        const data = await downloadData(url);
        // await saveDataToMongoDB(data);
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

// Run the main function
main();

// Routes
app.use('/exchange', exchangeRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});