document.getElementById('register-form').addEventListener('submit', async (e) => {
   // e.preventDefault(); // Prevent form from refreshing the page

    // Get form data
    const forename = document.getElementById('forename').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const password = document.getElementById('password').value;

    // API endpoint
    const apiUrl = 'http://localhost:3000/auth/register';

    async function register(event){
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ forename, surname, email, phoneNumber, password }),
        });

        const result = await response.json();

        // Display a success or error message
        const messageDiv = document.getElementById('message');
        if (response.ok) {
            messageDiv.innerHTML = `<p style="color: green;">${result.message}</p>`;
            document.getElementById('register-form').reset(); // Clear form
        } else {
            messageDiv.innerHTML = `<p style="color: red;">Error: ${result.message || result.error}</p>`;
        }
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('message').innerHTML = `<p style="color: red;">Server error. Please try again later.</p>`;
    }}
});
