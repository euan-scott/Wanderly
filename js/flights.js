document.addEventListener("DOMContentLoaded", () => {
    const spainButton = document.querySelector(".WDeal1 button");
    const italyButton = document.querySelector(".WDeal2 button");
    const portugalButton = document.querySelector(".WDeal3 button");
    const germanyButton = document.querySelector(".SDeal1 button");
    const franceButton = document.querySelector(".SDeal2 button");
    const polandButton = document.querySelector(".SDeal3 button");

    // Function to fetch and display flights to Spain
    const fetchFlightsToSpain = async () => {
        const originDropdown = document.querySelector("#origin");
        const origin = originDropdown.value;
        const apiUrl = `https://sky-scanner3.p.rapidapi.com/flights/search-one-way?fromEntityId=${origin}&toEntityId=MAD&departDate=2025-02-18`;
    
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '75876aaa83msh4763871bbbc140ep1b0b5bjsn1d77aff7ca41',
                'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
            },
        };
    
        try {
            const response = await fetch(apiUrl, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Full response data:", data); // Log full response to inspect structure
    
            // Access the first level and then the itineraries array
            const itineraries = data.data?.itineraries || []; // The itineraries are within the second object (index 1)
    
            console.log("Itineraries:", itineraries);
    
            if (itineraries.length === 0) {
                alert("No flights available to Spain from this origin.");
                return;
            }
    
            // If data is available, proceed with the rest of the code
            const firstItinerary = itineraries[0];
            displayFlight(firstItinerary, ".WDeal1"); // Function to handle displaying flight data for Spain
    
        } catch (error) {
            console.error("Error fetching flights:", error);
            alert("Failed to fetch flights. Please try again later.");
        }
    };

    // Function to fetch and display flights to Italy
    const fetchFlightsToItaly = async () => {
        const originDropdown = document.querySelector("#origin");
        const origin = originDropdown.value;
        const apiUrl = `https://sky-scanner3.p.rapidapi.com/flights/search-one-way?fromEntityId=${origin}&toEntityId=FCO&departDate=2025-02-18`; // Adjust destination for Italy
    
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '75876aaa83msh4763871bbbc140ep1b0b5bjsn1d77aff7ca41',
                'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
            },
        };
    
        try {
            const response = await fetch(apiUrl, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Full response data for Italy:", data); // Log full response to inspect structure
    
            // Access the first level and then the itineraries array
            const itineraries = data.data?.itineraries || []; // The itineraries are within the second object (index 1)
    
            console.log("Itineraries for Italy:", itineraries);
    
            if (itineraries.length === 0) {
                alert("No flights available to Italy from this origin.");
                return;
            }
    
            // If data is available, proceed with the rest of the code
            const firstItinerary = itineraries[0];
            displayFlight(firstItinerary, ".WDeal2"); // Function to handle displaying flight data for Italy
    
        } catch (error) {
            console.error("Error fetching flights:", error);
            alert("Failed to fetch flights. Please try again later.");
        }
    };
    const fetchFlightsToPortugal = async () => {
        const originDropdown = document.querySelector("#origin");
        const origin = originDropdown.value;
        const apiUrl = `https://sky-scanner3.p.rapidapi.com/flights/search-one-way?fromEntityId=${origin}&toEntityId=LIS&departDate=2025-02-18`; 
    
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '75876aaa83msh4763871bbbc140ep1b0b5bjsn1d77aff7ca41',
                'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
            },
        };
    
        try {
            const response = await fetch(apiUrl, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Full response data for Italy:", data); // Log full response to inspect structure
    
            // Access the first level and then the itineraries array
            const itineraries = data.data?.itineraries || []; // The itineraries are within the second object (index 1)
    
            console.log("Itineraries for Portugal:", itineraries);
    
            if (itineraries.length === 0) {
                alert("No flights available to Italy from this origin.");
                return;
            }
    
            // If data is available, proceed with the rest of the code
            const firstItinerary = itineraries[0];
            displayFlight(firstItinerary, ".WDeal3"); // Function to handle displaying flight data for Italy
    
        } catch (error) {
            console.error("Error fetching flights:", error);
            alert("Failed to fetch flights. Please try again later.");
        }
    };
    const fetchFlightsToGermany = async () => {
        const originDropdown = document.querySelector("#origin");
        const origin = originDropdown.value;
        const apiUrl = `https://sky-scanner3.p.rapidapi.com/flights/search-one-way?fromEntityId=${origin}&toEntityId=MUC&departDate=2025-02-18`; 
    
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '75876aaa83msh4763871bbbc140ep1b0b5bjsn1d77aff7ca41',
                'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
            },
        };
    
        try {
            const response = await fetch(apiUrl, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Full response data for Germany:", data); // Log full response to inspect structure
    
            // Access the first level and then the itineraries array
            const itineraries = data.data?.itineraries || []; // The itineraries are within the second object (index 1)
    
            console.log("Itineraries for Germany:", itineraries);
    
            if (itineraries.length === 0) {
                alert("No flights available to Germany from this origin.");
                return;
            }
    
            // If data is available, proceed with the rest of the code
            const firstItinerary = itineraries[0];
            displayFlight(firstItinerary, ".SDeal1"); // Function to handle displaying flight data for Italy
    
        } catch (error) {
            console.error("Error fetching flights:", error);
            alert("Failed to fetch flights. Please try again later.");
        }
    };
    const fetchFlightsToFrance = async () => {
        const originDropdown = document.querySelector("#origin");
        const origin = originDropdown.value;
        const apiUrl = `https://sky-scanner3.p.rapidapi.com/flights/search-one-way?fromEntityId=${origin}&toEntityId=CDG&departDate=2025-02-18`; 
    
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '75876aaa83msh4763871bbbc140ep1b0b5bjsn1d77aff7ca41',
                'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
            },
        };
    
        try {
            const response = await fetch(apiUrl, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Full response data for France:", data); // Log full response to inspect structure
    
            // Access the first level and then the itineraries array
            const itineraries = data.data?.itineraries || []; // The itineraries are within the second object (index 1)
    
            console.log("Itineraries for France:", itineraries);
    
            if (itineraries.length === 0) {
                alert("No flights available to France from this origin.");
                return;
            }
    
            // If data is available, proceed with the rest of the code
            const firstItinerary = itineraries[0];
            displayFlight(firstItinerary, ".SDeal2"); 
    
        } catch (error) {
            console.error("Error fetching flights:", error);
            alert("Failed to fetch flights. Please try again later.");
        }
    };
    const fetchFlightsToPoland = async () => {
        const originDropdown = document.querySelector("#origin");
        const origin = originDropdown.value;
        const apiUrl = `https://sky-scanner3.p.rapidapi.com/flights/search-one-way?fromEntityId=${origin}&toEntityId=WAW&departDate=2025-02-18`; 
    
        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': '75876aaa83msh4763871bbbc140ep1b0b5bjsn1d77aff7ca41',
                'x-rapidapi-host': 'sky-scanner3.p.rapidapi.com',
            },
        };
    
        try {
            const response = await fetch(apiUrl, options);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Full response data for Poland:", data); // Log full response to inspect structure
    
            // Access the first level and then the itineraries array
            const itineraries = data.data?.itineraries || []; // The itineraries are within the second object (index 1)
    
            console.log("Itineraries for Poland:", itineraries);
    
            if (itineraries.length === 0) {
                alert("No flights available to Poland from this origin.");
                return;
            }
    
            // If data is available, proceed with the rest of the code
            const firstItinerary = itineraries[0];
            displayFlight(firstItinerary, ".SDeal3"); 
    
        } catch (error) {
            console.error("Error fetching flights:", error);
            alert("Failed to fetch flights. Please try again later.");
        }
    };

    // Function to display flight details
    const displayFlight = (itinerary, dealClass) => {
        let resultsContainer = document.querySelector(`${dealClass} .flight-results`);
        if (!resultsContainer) {
            resultsContainer = document.createElement("div");
            resultsContainer.className = "flight-results";
            document.querySelector(dealClass).appendChild(resultsContainer);
        }
        resultsContainer.innerHTML = ""; // Clear previous results
    
        // Extract and display relevant flight data
        const price = itinerary.price?.formatted || "Price not available";
        const legs = itinerary.legs || [];
        const outboundLeg = legs[0] || {};
    
        const outboundAirport = `${outboundLeg.origin?.name || "Unknown"} (${outboundLeg.origin?.displayCode || "N/A"})`;
        const inboundAirport = `${outboundLeg.destination?.name || "Unknown"} (${outboundLeg.destination?.displayCode || "N/A"})`;
    
        const departureDate = new Date(outboundLeg.departure || "").toLocaleString();
        const arrivalDate = new Date(outboundLeg.arrival || "").toLocaleString();
    
        const carrier = outboundLeg.carriers?.marketing[0]?.name || "Unknown Carrier";
    
        const flightElement = document.createElement("div");
        flightElement.className = "flight";
    
        flightElement.innerHTML = `
            <p><strong>Price:</strong> ${price}</p>
            <p><strong>From:</strong> ${outboundAirport}</p>
            <p><strong>To:</strong> ${inboundAirport}</p>
            <p><strong>Departure:</strong> ${departureDate}</p>
            <p><strong>Arrival:</strong> ${arrivalDate}</p>
            <p><strong>Carrier:</strong> ${carrier}</p>
        `;
    
        resultsContainer.appendChild(flightElement);
    };

    // Event listeners for both buttons
    spainButton.addEventListener("click", fetchFlightsToSpain);
    italyButton.addEventListener("click", fetchFlightsToItaly);
    portugalButton.addEventListener("click", fetchFlightsToPortugal);
    germanyButton.addEventListener("click", fetchFlightsToGermany);
    franceButton.addEventListener("click", fetchFlightsToFrance);
    polandButton.addEventListener("click", fetchFlightsToPoland);
    

});
