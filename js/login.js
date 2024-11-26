document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    // Capture email and password from the form inputs
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Reference to the response message element (if you want to display feedback)
    const responseMessage = document.getElementById('response-message') || null;
  
    try {
      // Send a POST request to the login endpoint
      const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password as JSON
      });
  
      const result = await response.json(); // Parse the response
  
      if (response.ok) {
        // Login was successful
        alert(result.message); // Notify the user (or use a message on the page)
        if (responseMessage) {
          responseMessage.textContent = 'Login successful!';
          responseMessage.style.color = 'green';
        }
  
        // Store the authentication token (if you're using JWT)
        if (result.token) {
          localStorage.setItem('authToken', result.token);
        }
  
        // Redirect to a destination page (e.g., dashboard or home page)
        window.location.href = 'Destinations.html';
      } else {
        // Display error message
        alert(result.message);
        if (responseMessage) {
          responseMessage.textContent = result.message;
          responseMessage.style.color = 'red';
        }
      }
    } catch (error) {
      console.error('Error:', error);
      if (responseMessage) {
        responseMessage.textContent = 'An error occurred. Please try again.';
        responseMessage.style.color = 'red';
      }
      alert('An error occurred. Please try again.');
    }
  });
  