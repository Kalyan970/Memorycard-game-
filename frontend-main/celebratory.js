// Get URL parameters
const params = new URLSearchParams(window.location.search);
const totalScore = params.get('score');
const totalTime = params.get('time');

// Update the congratulatory message
document.getElementById('totalScore').textContent = totalScore;
document.getElementById('totalTime').textContent = totalTime;

// Function to play again
function playAgain() {
    window.location.href = 'easylevel.html'; // Redirect back to the expert level
}

// Function to exit the game
function exitGame() {
    alert('Thank you for playing!');
    window.close(); // Closes the tab (may not work in all browsers)
}