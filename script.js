/* =========================
   WELCOME BUTTON
========================= */

function showMessage() {

    alert("Welcome to Avanish Singh's Portfolio! 🎉");

}


/* =========================
   MOBILE MENU
========================= */

function toggleMenu() {

    const menu = document.getElementById("navLinks");

    menu.classList.toggle("active");

}


/* =========================
   PROJECT BUTTON
========================= */

function projectMessage(projectName) {

    alert("You selected: " + projectName);

}


/* =========================
   CONTACT FORM
========================= */

document.getElementById("contactForm").addEventListener(
    "submit",
    function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value;

        document.getElementById("formMessage").textContent =
            "Thank you, " + name +
            "! Your message has been received. 🎉";

        document.getElementById("contactForm").reset();

    }
);
/* =========================
   CALCULATOR
========================= */

function calculatorInput(value) {

    const display = document.getElementById("display");

    if (display.value === "0") {
        display.value = value;
    } else {
        display.value += value;
    }
}


function clearCalculator() {

    document.getElementById("display").value = "0";

}


function deleteNumber() {

    const display = document.getElementById("display");

    display.value = display.value.slice(0, -1);

    if (display.value === "") {
        display.value = "0";
    }

}


function calculateResult() {

    const display = document.getElementById("display");

    try {

        display.value = Function(
            "return " + display.value
        )();

    } catch {

        display.value = "Error";

    }

}
/* =========================
   DARK / LIGHT MODE
========================= */

function toggleTheme() {

    document.body.classList.toggle("light-mode");

    const button = document.querySelector(".theme-btn");

    if (document.body.classList.contains("light-mode")) {
        button.textContent = "☀️";
    } else {
        button.textContent = "🌙";
    }

}
/* =========================
   TYPING ANIMATION
========================= */

const typingText = document.getElementById("typing-text");

const words = [
    "B.Tech Student",
    "Coder",
    "Web Developer",
    "Problem Solver"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {

            deleting = false;

            wordIndex++;

            if (wordIndex === words.length) {
                wordIndex = 0;
            }

        }
    }

    setTimeout(typeEffect, deleting ? 60 : 100);
}

typeEffect();
//* =========================
   DIGITAL CLOCK
========================= */

function updateClock() {

    const now = new Date();

    const time = now.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    });

    const date = now.toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const clockTime = document.getElementById("clock-time");
    const clockDate = document.getElementById("clock-date");

    if (clockTime) {
        clockTime.textContent = time;
    }

    if (clockDate) {
        clockDate.textContent = date;
    }
}

updateClock();

setInterval(updateClock, 1000);
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
        choices[Math.floor(Math.random() * 3)];

    let result;

    if (playerChoice === computerChoice) {

        result = "It's a Draw! 🤝";

    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {

        playerScore++;

        result = "You Win! 🎉";

    } else {

        computerScore++;

        result = "Computer Wins! 🤖";
    }

    document.getElementById("game-result").textContent =
        result +
        " Computer chose " +
        computerChoice +
        ".";

    document.getElementById("game-score").textContent =
        "You: " + playerScore +
        " | Computer: " + computerScore;
}
document.addEventListener("DOMContentLoaded", function () {
    console.log("Website JavaScript loaded successfully!");
});
