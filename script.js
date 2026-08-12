/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    const menu = document.getElementById("navLinks");

    if (menu) {
        menu.classList.toggle("active");
    }
}


/* =========================
   WELCOME BUTTON
========================= */

function showMessage() {

    alert("Welcome to my website! 🎉");
}


/* =========================
   TYPING ANIMATION
========================= */

const words = [
    "B.Tech CSE (Data Science) Student",
    "Coder",
    "Web Developer",
    "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const typingText =
        document.getElementById("typing-text");

    if (!typingText) {
        return;
    }

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex >= currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex <= 0) {

            charIndex = 0;
            deleting = false;

            wordIndex++;

            if (wordIndex >= words.length) {
                wordIndex = 0;
            }
        }
    }

    setTimeout(
        typeEffect,
        deleting ? 60 : 100
    );
}

typeEffect();


/* =========================
   DIGITAL CLOCK
========================= */

function updateClock() {

    const clockTime =
        document.getElementById("clock-time");

    const clockDate =
        document.getElementById("clock-date");

    if (!clockTime || !clockDate) {
        return;
    }

    const now = new Date();

    clockTime.textContent =
        now.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        });

    clockDate.textContent =
        now.toLocaleDateString("en-IN", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
}

updateClock();

setInterval(updateClock, 1000);


/* =========================
   PROJECT BUTTON
========================= */

function projectMessage(projectName) {

    alert("You selected: " + projectName);
}


/* =========================
   ROCK PAPER SCISSORS
========================= */

let playerScore = 0;
let computerScore = 0;

function playGame(playerChoice) {

    const choices = [
        "rock",
        "paper",
        "scissors"
    ];

    const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];

    let result;

    if (playerChoice === computerChoice) {

        result = "It's a Draw! 🤝";

    }

    else if (
        (playerChoice === "rock" &&
            computerChoice === "scissors") ||

        (playerChoice === "paper" &&
            computerChoice === "rock") ||

        (playerChoice === "scissors" &&
            computerChoice === "paper")
    ) {

        playerScore++;

        result = "You Win! 🎉";

    }

    else {

        computerScore++;

        result = "Computer Wins! 🤖";
    }

    const gameResult =
        document.getElementById("game-result");

    const gameScore =
        document.getElementById("game-score");

    if (gameResult) {

        gameResult.textContent =
            result +
            " Computer chose " +
            computerChoice +
            ".";
    }

    if (gameScore) {

        gameScore.textContent =
            "You: " +
            playerScore +
            " | Computer: " +
            computerScore;
    }
}
