document.querySelector('form').addEventListener('submit', async (e) => {
  e.preventDefault(); // Prevent the default form submission

  // Capture email and password from the form inputs
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  // Reference to the response message element (for displaying feedback)
  const responseMessage = document.getElementById('response-message');

  if (!email || !password) {
      responseMessage.textContent = 'Both email and password are required!';
      responseMessage.style.color = 'red';
      return;
  }

  try {
      // Send a POST request to the login endpoint
      const response = await fetch('https://blue-bush-09bf93203.5.azurestaticapps.net/auth.login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }), // Send email and password as JSON
      });

      const result = await response.json(); // Parse the response

      if (response.ok) {
          // Login was successful
          responseMessage.textContent = 'Login successful! Redirecting...';
          responseMessage.style.color = 'green';

          // Store the authentication token (if using JWT)
          if (result.token) {
              localStorage.setItem('authToken', result.token);
          }

          // Redirect to a destination page (e.g., dashboard or home page)
          setTimeout(() => {
              window.location.href = 'Destinations.html'; // Change as per your desired page
          }, 2000);
      } else {
          // Display error message
          responseMessage.textContent = result.message || 'Login failed!';
          responseMessage.style.color = 'red';
      }
  } catch (error) {
      console.error('Error:', error);
      responseMessage.textContent = 'An error occurred. Please try again later.';
      responseMessage.style.color = 'red';
  }
});
