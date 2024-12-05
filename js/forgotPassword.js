document.getElementById('forgotPasswordForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;

  try {
    const response = await fetch('http://localhost:3000/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    const messageDiv = document.getElementById('message');

    if (response.ok) {
      messageDiv.textContent = data.message;
      messageDiv.style.color = 'green';
      document.getElementById('forgotPasswordForm').reset();
    } else {
      messageDiv.textContent = data.message || 'Error requesting password reset';
      messageDiv.style.color = 'red';
    }
  } catch (err) {
    console.error('Error:', err);
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = 'An unexpected error occurred. Please try again later.';
    messageDiv.style.color = 'red';
  }
});
