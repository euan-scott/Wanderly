const express = require('express');
const router = express.Router();
const fetch = require('node-fetch'); // Ensure `node-fetch` is installed (npm install node-fetch)

// Route to fetch hotel data from the RapidAPI
router.get('/hotels', async (req, res) => {
  const url = 'https://sky-scanner3.p.rapidapi.com/hotels/search?entityId=27537542'; 
  const options = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': '6a8ef3ce96msha8dfa3a32b1bc90p1c0e29jsn77f78ab', 
      'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    res.json({
      message: 'Hotels fetched successfully!',
      data: data, // Send the hotel data to the frontend
    });
  } catch (error) {
    console.error('Error fetching hotels:', error);
    res.status(500).json({
      message: 'Error fetching hotels',
      error: error.message,
    });
  }
});

module.exports = router;