const API_KEY = 'a68f7cde46msha3ddfd4b2540b70p1c2ebfjsnae899043ac86';
const API_HOST = 'sky-scanner3.p.rapidapi.com';

const flightForm = document.getElementById('flightForm');
const resultsDisplay = document.getElementById('results');

// Handle form submission
flightForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Collect form data
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;
    const departureDate = document.getElementById('departureDate').value;
    const returnDate = document.getElementById('returnDate').value;
    const cabinClass = document.getElementById('cabinClass').value;
    const adults = document.getElementById('adults').value;

    // Validate dates
    if (returnDate && new Date(returnDate) < new Date(departureDate)) {
        resultsDisplay.textContent = 'Error: Return date cannot be before departure date.';
        return;
    }

    // Decide endpoint based on return date presence
    const endpoint = returnDate 
        ? `flights/search-roundtrip?fromEntityId=${origin}&toEntityId=${destination}&departureDate=${departureDate}&returnDate=${returnDate}`
        : `flights/search-one-way?fromEntityId=${origin}&toEntityId=${destination}&departureDate=${departureDate}`;

    const url = `https://${API_HOST}/${endpoint}&cabinClass=${cabinClass}&adults=${adults}`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST,
        },
    };
    
    // Make the API call
    try {
        resultsDisplay.textContent = 'Searching...';
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Failed to search flights: ${response.statusText}`);
        }

        const data = await response.json();
        // Display the results
        resultsDisplay.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error searching flights:', error);
        resultsDisplay.textContent = `Error: ${error.message}`;
    }
});
