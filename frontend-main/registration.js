// Form submission event listener
document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Show the success message modal
    const successModal = new bootstrap.Modal(document.getElementById('successModal'), {
        backdrop: 'static', // Prevent closing by clicking outside
        keyboard: false     // Prevent closing with the Escape key
    });
    successModal.show(); // Display the modal
});

// Redirect function to go to levels.html
function redirectToLevels() {
    window.location.href = "levels.html"; // Navigate to the levels page
}
