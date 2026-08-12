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
/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const submitButton =
            contactForm.querySelector("button[type='submit']");

        submitButton.disabled = true;
        submitButton.textContent = "Sending...";

        const formData = new FormData(contactForm);

        try {

            const response = await fetch(
                contactForm.action,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            if (response.ok) {

                formMessage.textContent =
                    "Message sent successfully! ✅";

                formMessage.style.color = "#38bdf8";

                contactForm.reset();

            } else {

                formMessage.textContent =
                    "Something went wrong. Please try again. ❌";

                formMessage.style.color = "red";
            }

        } catch (error) {

            formMessage.textContent =
                "Unable to send message. Check your internet connection. ❌";

            formMessage.style.color = "red";
        }

        submitButton.disabled = false;
        submitButton.textContent = "Send Message";
    });
}
/* =========================
   SCROLL TO TOP
========================= */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {

    if (!topBtn) return;

    const topBtn = document.getElementById("topBtn");

if (topBtn) {

    topBtn.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

    });

}

});


if (topBtn) {

    topBtn.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });

    });

}
/* =========================
   CURSOR / TOUCH GLOW
========================= */

const cursorGlow =
    document.getElementById("cursorGlow");


function moveGlow(x, y) {

    if (!cursorGlow) return;

    cursorGlow.style.left = x + "px";
    cursorGlow.style.top = y + "px";
}


/* Computer */

document.addEventListener("mousemove", function (event) {

    moveGlow(
        event.clientX,
        event.clientY
    );

});


/* Mobile / Touch */

document.addEventListener("touchmove", function (event) {

    if (!event.touches.length) return;

    moveGlow(
        event.touches[0].clientX,
        event.touches[0].clientY
    );

}, {
    passive: true
});
