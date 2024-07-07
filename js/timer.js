let timer;
let timeLeft = 3 * 60; // 10 minutes in seconds
const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('startQuiz');

function startQuiz() {
    clearInterval(timer); // Clear any existing timer
    timeLeft = 3 * 60; // Reset time left
    updateTimerDisplay(timeLeft);

    timer = setInterval(() => {
        timeLeft--;
        updateTimerDisplay(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! The quiz session has ended.");
            resetTimer();
        }
    }, 1000);
}

function updateTimerDisplay(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    timerDisplay.innerText = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function resetTimer() {
    timeLeft = 3 * 60;
    updateTimerDisplay(timeLeft);
}

startButton.addEventListener('click', startQuiz);