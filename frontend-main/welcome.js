// JavaScript for Welcome Page (welcome.js)

window.onload = function () {
    // Create an audio element dynamically
    const backgroundAudio = new Audio('welcome.mp3');  // Set the path to your welcome.mp3 file
    backgroundAudio.loop = true;  // Make the audio loop
    backgroundAudio.autoplay = true;  // Try to autoplay the audio

    // Play the audio and handle any errors
    backgroundAudio.play().catch((error) => {
        console.log('Autoplay prevented: ' + error.message); // If autoplay is prevented by the browser
    });

    // Optional: Stop the audio when leaving the page or switching
    window.onbeforeunload = function() {
        backgroundAudio.pause(); // Pause the audio before leaving
    };
};
