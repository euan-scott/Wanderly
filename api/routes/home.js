const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); 

// Define APIs
const FLIGHT_API_URL = ''; 
const HOTEL_API_URL = 'https://sky-scanner3.p.rapidapi.com/hotels/search?entityId=27537542'; 
const API_KEY = '6a8ef3ce96msha8dfa3a32b1bc90p1c0e29jsn77f78ab4198b'; 

// Combine and serve deals
router.get('/deals', async (req, res) => {
    try {
        // Fetch flight data
        const flightResponse = await fetch(FLIGHT_API_URL, {
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': 'your-flight-api-host', // Replace 
            },
        });
        const flightData = await flightResponse.json();

        // Fetch hotel data
        const hotelResponse = await fetch(HOTEL_API_URL, {
            headers: {
                'x-rapidapi-key': API_KEY,
                'x-rapidapi-host': 'your-hotel-api-host', // Replace 
            },
        });
        const hotelData = await hotelResponse.json();

        // Combine flight and hotel data
        const combinedDeals = combineDeals(flightData, hotelData);

        // Respond with combined data
        res.json({
            weekDeals: combinedDeals.weekDeals,
            seasonDeals: combinedDeals.seasonDeals,
        });
    } catch (error) {
        console.error('Error fetching deals:', error);
        res.status(500).json({ message: 'Failed to fetch deals', error: error.message });
    }
});

// Helper function to combine deals
function combineDeals(flights, hotels) {
    // Example logic to combine data
    const weekDeals = flights.slice(0, 3).map((flight, index) => ({
        title: hotels[index]?.name || flight.destination,
        image: hotels[index]?.image || flight.image,
        price: flight.price,
        date: flight.date || 'N/A',
    }));

    const seasonDeals = flights.slice(3, 6).map((flight, index) => ({
        title: hotels[index + 3]?.name || flight.destination,
        image: hotels[index + 3]?.image || flight.image,
        price: flight.price,
        date: flight.date || 'N/A',
    }));

    return { weekDeals, seasonDeals };
}

module.exports = router;
