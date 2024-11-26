//const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');


const regionApiUrl = 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchDestination?query=new'; 
const priceApiUrl = 'https://booking-com15.p.rapidapi.com/api/v1/flights/searchFlights?fromId=BOM.AIRPORT&toId=DEL.AIRPORT&pageNo=1&adults=1&children=0%2C17&sort=BEST&cabinClass=ECONOMY&currency_code=AED';  // Replace with your flight price API
const apiKey = '6a8ef3ce96msha8dfa3a32b1bc90p1c0e29jsn77f78ab4198b'; 

router.get('/flights', async (req, res) => {
  try {
    // Fetch flight regions
    const regionResponse = await fetch(regionApiUrl, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'example-flight-api.com',
      },
    });
    const regions = await regionResponse.json();

    // Fetch flight prices
    const priceResponse = await fetch(priceApiUrl, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': apiKey,
        'X-RapidAPI-Host': 'example-flight-api.com',
      },
    });
    const prices = await priceResponse.json();

    // Combine data: Match regions with prices
    const combinedData = regions.data.map((region) => {
      const matchingPrice = prices.data.find(
        (price) => price.regionId === region.id
      );
      return {
        ...region,
        price: matchingPrice ? matchingPrice.price : 'Price not available',
      };
    });

    res.json({
      message: 'Flight data fetched successfully!',
      data: combinedData,
    });
  } catch (error) {
    console.error('Error fetching flight data:', error);
    res.status(500).json({
      message: 'Error fetching flight data',
      error: error.message,
    });
  }
});

module.exports = router;
