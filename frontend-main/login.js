document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById('loginForm');
    const messageDiv = document.getElementById('message');
    
    loginForm.addEventListener('submit', async function(event) {
      event.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      
      try {
        const response = await fetch('login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store user data if needed
            localStorage.setItem('user', JSON.stringify(data.user));
            // Redirect to welcome page
            window.location.href = 'levels.html';
        } else {
            document.getElementById('message').innerHTML = `<div class="error">${data.message}</div>`;
        }
    } catch (error) {
        document.getElementById('message').innerHTML = '<div class="error">An error occurred. Please try again.</div>';
    }
  });
});