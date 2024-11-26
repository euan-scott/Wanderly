// Function to fetch and display flight data
const fetchFlights = async () => {
    const destinationsContainer = document.querySelector('.destination-deals'); // Ensure this matches your HTML
  
    try {
      const response = await fetch('/api/flights');
      const result = await response.json();
  
      if (result.message === 'Flight data fetched successfully!') {
        destinationsContainer.innerHTML = ''; // Clear existing content
  
        result.data.forEach((flight) => {
          const flightCard = document.createElement('div');
          flightCard.className = 'flight-card';
          flightCard.innerHTML = `
            <h3>Region: ${flight.name}</h3>
            <p>Price: ${flight.price}</p>
            <p>${flight.description || ''}</p> <!-- Optional description -->
          `;
          destinationsContainer.appendChild(flightCard);
        });
      } else {
        destinationsContainer.innerHTML = '<p>No flights available.</p>';
      }
    } catch (error) {
      console.error('Error fetching flights:', error);
      destinationsContainer.innerHTML = '<p>Error loading flights. Please try again later.</p>';
    }
  };
  
  // Call fetchFlights when the page loads
  document.addEventListener('DOMContentLoaded', fetchFlights);
  