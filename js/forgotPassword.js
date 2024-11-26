document.getElementById('forgotPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
  
    try {
      const response = await fetch('/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Password reset email sent
        document.getElementById('forgotPasswordForm').style.display = 'none';
        document.getElementById('resetPasswordForm').style.display = 'block';
      } else {
        alert(data.message || 'Error requesting password reset');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    }
  });
  
  document.getElementById('resetPasswordForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const newPassword = document.getElementById('password').value;
  
    try {
      const response = await fetch('/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert(data.message); // Password updated successfully
        window.location.href = 'login.html';
      } else {
        alert(data.message || 'Error resetting password');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    }
  });
  