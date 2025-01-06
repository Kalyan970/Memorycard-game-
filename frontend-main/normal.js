// Game variables
const cards = ['🙈', '🙈', '😸', '😸', '😉', '😉', '🥚', '🥚', '🌻', '🌻', '💎', '💎', '💍', '💍', '🏀', '🏀']; // 8 pairs for a 4x4 grid
let flippedCards = [];
let matchedCards = 0;
let score = 0;
let gameStarted = false;
let timer = 0; // Start timer from 0 seconds
let timerInterval;
const mismatchSound = new Audio('fail.mp3'); // Mismatch sound
const correctSound = new Audio('correct.mp3'); // Correct match sound
const successSound = new Audio('success.mp3'); // Success sound for completing all pairs
mismatchSound.load();
correctSound.load();
successSound.load(); // Load the success sound

// Shuffle function
function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

// Generate game board
function createGameBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = ''; // Clear existing board

    cards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-index', index);

        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-face', 'card-front');
        cardFront.innerHTML = '?';

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-face', 'card-back');
        cardBack.innerHTML = card;

        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cardElement.appendChild(cardInner);
        gameBoard.appendChild(cardElement);

        cardElement.addEventListener('click', () => flipCard(cardElement, card));
    });
}

// Flip card function
function flipCard(cardElement, cardValue) {
    if (flippedCards.length < 2 && !cardElement.classList.contains('flipped') && gameStarted) {
        cardElement.classList.add('flipped');
        flippedCards.push({ element: cardElement, value: cardValue });

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }
}

// Check if cards match
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.value === card2.value) {
        matchedCards++;
        score += 2; // Add 2 points for each matched pair
        correctSound.play(); // Play the correct match sound
        updateScore();
        flippedCards = [];
        if (matchedCards === cards.length / 2) {
            stopTimer(); // Stop timer when game is finished
            successSound.play(); // Play success sound when all pairs are matched
            setTimeout(() => {
                displayWinMessage(); // Show win message with score and time
            }, 500);
        }
    } else {
        mismatchSound.play();
        setTimeout(() => {
            card1.element.classList.remove('flipped');
            card2.element.classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

// Update score
function updateScore() {
    document.getElementById('score').textContent = `Score: ${score}`;
}

// Timer function
function startTimer() {
    timer = 0; // Start timer at 0 seconds
    timerInterval = setInterval(() => {
        timer++;
        updateTimer();

        if (timer >= 200) { // 110 seconds = 3 minute 20 seconds
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}

// Update timer display
function updateTimer() {
    const timerElement = document.getElementById('timer');
    timerElement.textContent = `Time: ${Math.floor(timer / 60)}:${String(timer % 60).padStart(2, '0')}`;
}

// Stop the timer when game is over
function stopTimer() {
    clearInterval(timerInterval);
}

// End game if time runs out
function endGame() {
    gameStarted = false; // Stop the game
    const timeoutMessage = document.createElement('div');
    timeoutMessage.classList.add('timeout-message');
    timeoutMessage.innerHTML = `
        <h2>Time's Up!</h2>
        <p>You couldn't match all pairs within the time limit.</p>
        <button class="btn btn-danger mt-4" onclick="tryAgain()">Try Again</button>
    `;

    document.body.appendChild(timeoutMessage);
}

// Try Again function to restart the game
function tryAgain() {
    const timeoutMessage = document.querySelector('.timeout-message');
    if (timeoutMessage) {
        timeoutMessage.remove();
    }

    startNewGame();
}

// Start new game
function startNewGame() {
    matchedCards = 0;
    flippedCards = [];
    score = 0;
    updateScore();
    shuffleCards();
    createGameBoard();
    gameStarted = true;
    timer = 0; // Reset timer to 0 seconds
    startTimer();
}

// Display Win Message with time and score
function displayWinMessage() {
    // Start confetti animation
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
    });

    // Save score to database
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.id) {
        fetch('save_score.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: user.id,
                level: 'normal',
                score: score,
                timeTaken: timer + 's'
            })
        })
        .then(response => response.json())
        .then(data => {
            if (!data.success) {
                console.error('Failed to save score:', data.message);
            }
        })
        .catch(error => {
            console.error('Error saving score:', error);
        });
    }

    const winMessage = document.createElement('div');
    winMessage.classList.add('win-message');
    winMessage.innerHTML = `
        <h2>Outstanding! 🌟</h2>
        <h3>You've Mastered the Normal Level!</h3>
        <p>Your score: ${score}</p>
        <p>Time taken: ${timer}s</p>
        <div class="button-container mt-4">
            <button id="nextLevelBtn" class="btn btn-success me-3">Expert Level</button>
            <button id="exitBtn" class="btn btn-primary">Exit to Levels</button>
        </div>
    `;

    document.body.appendChild(winMessage);

    // Add event listeners to buttons
    document.getElementById('nextLevelBtn').addEventListener('click', () => {
        window.location.href = 'expertlevel.html';
    });

    document.getElementById('exitBtn').addEventListener('click', () => {
        window.location.href = 'levels.html';
    });

    // Add more confetti every few seconds
    const confettiInterval = setInterval(() => {
        confetti({
            particleCount: 75,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, 2000);

    // Stop confetti after 8 seconds
    setTimeout(() => {
        clearInterval(confettiInterval);
    }, 8000);
}

// Redirect to the Expert level when "Okay" is clicked
function redirectToExpert() {
    window.location.href = 'expertlevel.html'; // Redirect to the expert level page
}

// Initialize game
window.onload = function () {
    shuffleCards();
    createGameBoard();
    gameStarted = true;
    startTimer();
};
