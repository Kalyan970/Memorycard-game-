// Game variables
const cards = ['🍎', '🍎', '🍉', '🍉', '🍇', '🍇', '🍓', '🍓', '🍒', '🍒', '🍑', '🍑']; // 6 pairs for a 3x4 grid
let flippedCards = [];
let matchedCards = 0;
let score = 0;
let gameStarted = false;
let timer = 0; // Timer starts from 0
let timerInterval;
const mismatchSound = new Audio('fail.mp3'); // Mismatch sound
const successSound = new Audio('success.mp3'); // Success sound
const correctSound = new Audio('correct.mp3'); // Correct pair sound
successSound.load(); // Ensure sounds are loaded before playing
correctSound.load();

// Shuffle function
function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
    }
}

// Generate the game board
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
        score++; // Increment score for correct match
        correctSound.play(); // Play the correct match sound
        updateScore();
        flippedCards = [];
        if (matchedCards === cards.length / 2) {
            clearInterval(timerInterval); // Stop the timer
            setTimeout(() => {
                successSound.play();
                displayWinMessage();
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

// Display Win Message with time and score
function displayWinMessage() {
    // Start confetti animation
    confetti({
        particleCount: 100,
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
                level: 'easy',
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
        <h2>Congratulations! 🎉</h2>
        <h3>You completed the Easy Level!</h3>
        <p>Your score: ${score}</p>
        <p>Time taken: ${timer}s</p>
        <div class="button-container mt-4">
            <button id="nextLevelBtn" class="btn btn-success me-3">Next Level</button>
            <button id="exitBtn" class="btn btn-primary">Exit to Levels</button>
        </div>
    `;

    document.body.appendChild(winMessage);

    // Add event listeners to buttons
    document.getElementById('nextLevelBtn').addEventListener('click', () => {
        window.location.href = 'normallevel.html';
    });

    document.getElementById('exitBtn').addEventListener('click', () => {
        window.location.href = 'levels.html';
    });

    // Add more confetti every few seconds
    const confettiInterval = setInterval(() => {
        confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 }
        });
    }, 2000);

    // Stop confetti after 8 seconds
    setTimeout(() => {
        clearInterval(confettiInterval);
    }, 8000);
}

// End game function for timeout
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

// Try Again function to remove the timeout message and restart the game
function tryAgain() {
    // Remove the timeout message
    const timeoutMessage = document.querySelector('.timeout-message');
    if (timeoutMessage) {
        timeoutMessage.remove();
    }

    // Start a new game
    startNewGame();
}

// Start a new game
function startNewGame() {
    // Reset game variables
    matchedCards = 0;
    flippedCards = [];
    score = 0; // Reset score
    updateScore();
    shuffleCards();
    createGameBoard();
    gameStarted = true;
    timer = 0; // Start timer from 0
    startTimer(); // Start the timer
}

// Timer function to count up
function startTimer() {
    timerInterval = setInterval(() => {
        timer++; // Increment timer every second
        updateTimer();

        if (timer >= 240) {
            clearInterval(timerInterval); // Stop the timer
            endGame(); // Call the endGame function when the time limit is reached
        }

        if (matchedCards === cards.length / 2) {
            clearInterval(timerInterval); // Stop the timer when all pairs are matched
        }
    }, 1000);
}

// Update timer
function updateTimer() {
    const timerElement = document.getElementById('timer');
    if (timerElement) {
        timerElement.textContent = `Time: ${timer}s`;
    }
}

// Update score
function updateScore() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = `Score: ${score}`;
    }
}

// Initialize game
document.addEventListener('DOMContentLoaded', function() {
    shuffleCards();
    createGameBoard();
    gameStarted = true;
    startTimer();
});
