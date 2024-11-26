document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission
  
    const firstName = document.getElementById('fname').value;
    const surname = document.getElementById('sname').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const password = document.getElementById('password').value;
  
    const responseMessage = document.getElementById('response-message') || null;
  
    try {
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, surname, email, phoneNumber, password }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Notify the user and redirect them to the login page
        alert(result.message);
        if (responseMessage) {
          responseMessage.textContent = 'Registration successful!';
          responseMessage.style.color = 'green';
        }
        window.location.href = 'login.html';
      } else {
        // Handle errors
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
  