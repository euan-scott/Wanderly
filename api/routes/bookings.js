document.getElementById("booking-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect form data
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const cardName = document.getElementById("cardName").value;
    const cardNumber = document.getElementById("cardNumber").value;
    const expiryDate = document.getElementById("expiryDate").value;
    const cvc = document.getElementById("cvc").value;
    const weekly = document.getElementById("weekly").checked;
    const monthly = document.getElementById("monthly").checked;

    const payload = {
        email,
        phoneNumber: phone,
        cardName,
        cardNumber,
        expiryDate,
        cvc,
        paymentFrequency: weekly ? "weekly" : monthly ? "monthly" : "one-time"
    };

    try {
        // Send booking data to the backend
        const response = await fetch("http://localhost:3000/bookings/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const result = await response.json();
            alert(`Booking Confirmed! Booking ID: ${result.bookingId}`);
        } else {
            const error = await response.json();
            alert(`Error: ${error.message}`);
        }
    } catch (err) {
        console.error(err);
        alert("An error occurred while processing the booking.");
    }
});
