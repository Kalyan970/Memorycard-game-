document.addEventListener("DOMContentLoaded", function() {
    const signupForm = document.getElementById('signupForm');
    const messageDiv = document.getElementById('message');
    
    signupForm.addEventListener('submit', async function(event) {
      event.preventDefault(); // Prevent form from redirecting to login.html
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('signupEmail').value;
      const phone = document.getElementById('phone').value;
      const password = document.getElementById('signupPassword').value;
      
      try {
        const response = await fetch('signup.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                password: password
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Store user data if needed
            localStorage.setItem('user', JSON.stringify(data.user));
            // Redirect to login page
            window.location.href = 'login.html';
        } else {
            document.getElementById('message').innerHTML = `<div class="error">${data.message}</div>`;
        }
    } catch (error) {
        document.getElementById('message').innerHTML = '<div class="error">An error occurred. Please try again.</div>';
    }
    
    // Optionally, reset the form fields after submission
    signupForm.reset();
  });
});