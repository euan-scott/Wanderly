document.getElementById('register-form').addEventListener('submit', async (e) => {
    //e.preventDefault(); // Prevent form from refreshing the page

    // Get form data
    const forename = document.getElementById('forename').value.trim();
    const surname = document.getElementById('surname').value.trim();
    const email = document.getElementById('email').value.trim();
    const phoneNumber = document.getElementById('phoneNumber').value.trim();
    const password = document.getElementById('password').value.trim();

    // API 
    const apiUrl = '/register.html';

    async function register(){
    try {
        // Make the API request
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ forename, surname, email, phoneNumber, password }),
        });

        const result = await response.json();

        // Display success or error message
        const messageDiv = document.getElementById('message');
        if (response.ok) {
            messageDiv.innerHTML = `<p style="color: green;">${result.message}</p>`;
            document.getElementById('register-form').reset(); // Clear form

            // Redirect to login page after showing the success message
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000); // Redirect after 2 seconds
        } else {
            messageDiv.innerHTML = `<p style="color: red;">Error: ${result.message || result.error}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerHTML = `<p style="color: red;">Server error. Please try again later.</p>`;
    }}
});
