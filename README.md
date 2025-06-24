# ExchangeRates
Task Description :
------------------------

This application that downloads exchange rate data from a specified URL, saves the data to a MongoDB database, and provides an API endpoint to calculate the difference in exchange rates between two countries over a specified time period.


Getting Started
------------------------
Installation:

Make sure you have Node.js and MongoDB installed on your system.
Run npm install to install the necessary dependencies.


Executing application
- Start the application: Run node index.js.



Endpoints:

GET /exchange:
This endpoint calculates the difference in exchange rates between two countries over a specified time period.

Query Parameters:
from: The country code or name from which you want to convert currency.
to: The country code or name to which you want to convert currency.
startDate: The start date for the exchange rate calculation (format: YYYY-MM-DD).
endDate: The end date for the exchange rate calculation (format: YYYY-MM-DD).

Example Usage: GET /exchange?from=canada&to=australia&startDate=2024-01-01&endDate=2024-01-10


