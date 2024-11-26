// Function to fetch and display hotel data
const fetchHotels = async () => {
    const bookingsContainer = document.getElementById('bookings-container'); // Ensure this matches your HTML
  
    try {
      const response = await fetch('/bookings/hotels'); // Calls the backend API
      const result = await response.json();
  
      if (result.message === 'Hotels fetched successfully!') {
        bookingsContainer.innerHTML = ''; // Clear previous content
  
        result.data.forEach((hotel) => {
          // Create a card for each hotel
          const hotelCard = document.createElement('div');
          hotelCard.className = 'hotel-card';
          hotelCard.innerHTML = `
            <h3>${hotel.name}</h3>
            <p>Location: ${hotel.location}</p>
            <p>Price: $${hotel.price}</p>
            <img src="${hotel.image}" alt="${hotel.name}">
            <button>Book Now</button>
          `;
          bookingsContainer.appendChild(hotelCard);
        });
      } else {
        bookingsContainer.innerHTML = '<p>No hotels available.</p>';
      }
    } catch (error) {
      console.error('Error fetching hotels:', error);
      bookingsContainer.innerHTML = '<p>Error loading hotels. Please try again later.</p>';
    }
  };
  
  // Call fetchHotels when the page loads
  document.addEventListener('DOMContentLoaded', fetchHotels);
  