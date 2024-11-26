document.addEventListener('DOMContentLoaded', () => {
    const dealsOfTheWeekContainer = document.querySelector('.WDeal1').parentElement;
    const dealsOfTheSeasonContainer = document.querySelector('.SDeal1').parentElement;

    // Fetch flight and hotel data from APIs
    async function fetchDeals() {
        try {
            const flightApiUrl = 'https://your-flight-api.com/deals'; // Replace with actual API
            const hotelApiUrl = 'https://sky-scanner3.p.rapidapi.com/hotels/search?entityId=2753754'; // Replace with actual API

            // Fetch flights
            const flightResponse = await fetch(flightApiUrl);
            const flightData = await flightResponse.json();

            // Fetch hotels
            const hotelResponse = await fetch(hotelApiUrl);
            const hotelData = await hotelResponse.json();

            // Combine the data (example logic)
            const combinedDeals = combineDeals(flightData, hotelData);

            // Populate the deals of the week
            populateDeals(dealsOfTheWeekContainer, combinedDeals.weekDeals);

            // Populate the deals of the season
            populateDeals(dealsOfTheSeasonContainer, combinedDeals.seasonDeals);
        } catch (error) {
            console.error('Error fetching deals:', error);
        }
    }

    // Combine flight and hotel data (example logic)
    function combineDeals(flights, hotels) {
        const weekDeals = flights.slice(0, 3).map((flight, index) => ({
            title: hotels[index]?.name || flight.destination,
            image: hotels[index]?.image || flight.image,
            price: flight.price,
            date: flight.date,
        }));

        const seasonDeals = flights.slice(3, 6).map((flight, index) => ({
            title: hotels[index + 3]?.name || flight.destination,
            image: hotels[index + 3]?.image || flight.image,
            price: flight.price,
            date: flight.date,
        }));

        return { weekDeals, seasonDeals };
    }

    // Populate deals into the DOM
    function populateDeals(container, deals) {
        container.innerHTML = ''; // Clear existing content
        deals.forEach(deal => {
            const dealElement = `
                <div class="deal-card">
                    <img src="${deal.image}" alt="${deal.title}">
                    <h1>${deal.title}</h1>
                    <h1>${deal.price} Per Person</h1>
                    <h1>${deal.date || 'Date not available'}</h1>
                    <button>Book Now</button>
                </div>
            `;
            container.innerHTML += dealElement;
        });
    }

    // Fetch and populate the deals
    fetchDeals();
});
