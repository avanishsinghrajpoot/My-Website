/* =========================
   PORTFOLIO SCRIPT.JS
========================= */


/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("active");

        if (navLinks.classList.contains("active")) {
            menuBtn.textContent = "✕";
        } else {
            menuBtn.textContent = "☰";
        }
    });

}


/* Close mobile menu after clicking a link */

if (navLinks) {

    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("active");

            if (menuBtn) {
                menuBtn.textContent = "☰";
            }

        });

    });

}


/* =========================
   DARK / LIGHT MODE
========================= */

const themeBtn = document.getElementById("themeBtn");


function applyTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-mode");

        if (themeBtn) {
            themeBtn.textContent = "☀️";
        }

    } else {

        document.body.classList.remove("light-mode");

        if (themeBtn) {
            themeBtn.textContent = "🌙";
        }

    }
}


if (themeBtn) {

    themeBtn.addEventListener("click", function () {

        document.body.classList.toggle("light-mode");

        if (
            document.body.classList.contains("light-mode")
        ) {

            themeBtn.textContent = "☀️";

            localStorage.setItem(
                "theme",
                "light"
            );

        } else {

            themeBtn.textContent = "🌙";

            localStorage.setItem(
                "theme",
                "dark"
            );

        }

    });

}

applyTheme();


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

    const currentWord =
        words[wordIndex];


    if (!deleting) {

        typingText.textContent =
            currentWord.substring(
                0,
                charIndex + 1
            );

        charIndex++;


        if (
            charIndex >=
            currentWord.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;
        }

    } else {

        typingText.textContent =
            currentWord.substring(
                0,
                charIndex - 1
            );

        charIndex--;


        if (charIndex <= 0) {

            charIndex = 0;

            deleting = false;

            wordIndex++;


            if (
                wordIndex >=
                words.length
            ) {

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
        document.getElementById(
            "clock-time"
        );

    const clockDate =
        document.getElementById(
            "clock-date"
        );


    if (!clockTime || !clockDate) {
        return;
    }


    const now = new Date();


    clockTime.textContent =
        now.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            }
        );


    clockDate.textContent =
        now.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric"
            }
        );

}


updateClock();

setInterval(
    updateClock,
    1000
);


/* =========================
   PROJECT BUTTON
========================= */

function projectMessage(projectName) {

    alert(
        "You selected: " +
        projectName
    );

}


/* =========================
   OPEN CALCULATOR
========================= */

function openCalculator() {

    const calculator =
        document.getElementById(
            "calculator"
        );

    if (calculator) {

        calculator.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =========================
   OPEN GAME
========================= */

function openGame() {

    const game =
        document.getElementById(
            "game"
        );

    if (game) {

        game.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =========================
   CALCULATOR
========================= */

let calculatorExpression = "";


function calculatorInput(value) {

    const display =
        document.getElementById(
            "display"
        );


    if (!display) {
        return;
    }


    calculatorExpression += value;

    display.value =
        calculatorExpression;

}


function clearCalculator() {

    const display =
        document.getElementById(
            "display"
        );


    calculatorExpression = "";


    if (display) {
        display.value = "0";
    }

}


function deleteNumber() {

    const display =
        document.getElementById(
            "display"
        );


    if (!display) {
        return;
    }


    calculatorExpression =
        calculatorExpression.slice(
            0,
            -1
        );


    display.value =
        calculatorExpression || "0";

}


function calculateResult() {

    const display =
        document.getElementById(
            "display"
        );


    if (!display) {
        return;
    }


    if (!calculatorExpression) {
        return;
    }


    try {

        let expression =
            calculatorExpression;


        /* Percentage */

        expression =
            expression.replace(
                /(\d+(?:\.\d+)?)%/g,
                "($1/100)"
            );


        const result =
            Function(
                '"use strict"; return (' +
                expression +
                ')'
            )();


        if (
            typeof result !== "number" ||
            !Number.isFinite(result)
        ) {

            throw new Error(
                "Invalid calculation"
            );

        }


        calculatorExpression =
            String(result);


        display.value =
            calculatorExpression;


    } catch (error) {

        display.value = "Error";

        calculatorExpression = "";


        setTimeout(
            function () {

                display.value = "0";

            },
            1000
        );

    }

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
        choices[
            Math.floor(
                Math.random() *
                choices.length
            )
        ];


    let result;


    if (
        playerChoice ===
        computerChoice
    ) {

        result =
            "It's a Draw! 🤝";

    }


    else if (

        (
            playerChoice === "rock" &&
            computerChoice === "scissors"
        )

        ||

        (
            playerChoice === "paper" &&
            computerChoice === "rock"
        )

        ||

        (
            playerChoice === "scissors" &&
            computerChoice === "paper"
        )

    ) {

        playerScore++;

        result =
            "You Win! 🎉";

    }


    else {

        computerScore++;

        result =
            "Computer Wins! 🤖";

    }


    const gameResult =
        document.getElementById(
            "game-result"
        );


    const gameScore =
        document.getElementById(
            "game-score"
        );


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

const contactForm =
    document.getElementById(
        "contactForm"
    );


const formMessage =
    document.getElementById(
        "formMessage"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const submitButton =
                contactForm.querySelector(
                    "button[type='submit']"
                );


            if (submitButton) {

                submitButton.disabled =
                    true;

                submitButton.textContent =
                    "Sending...";

            }


            const formData =
                new FormData(
                    contactForm
                );


            try {

                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",
                            body: formData,
                            headers: {
                                "Accept":
                                    "application/json"
                            }
                        }
                    );


                if (response.ok) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Message sent successfully! ✅";

                        formMessage.style.color =
                            "#38bdf8";

                    }


                    contactForm.reset();


                } else {

                    if (formMessage) {

                        formMessage.textContent =
                            "Something went wrong. Please try again. ❌";

                        formMessage.style.color =
                            "red";

                    }

                }


            } catch (error) {

                if (formMessage) {

                    formMessage.textContent =
                        "Unable to send message. Check your internet connection. ❌";

                    formMessage.style.color =
                        "red";

                }

            }


            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    "Send Message";

            }

        }
    );

}


/* =========================
   SCROLL TO TOP
========================= */

const topBtn =
    document.getElementById(
        "topBtn"
    );


if (topBtn) {

    topBtn.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================
   CURSOR GLOW
========================= */

const cursorGlow =
    document.getElementById(
        "cursorGlow"
    );


if (cursorGlow) {

    document.addEventListener(
        "mousemove",
        function (event) {

            cursorGlow.style.left =
                event.clientX + "px";

            cursorGlow.style.top =
                event.clientY + "px";

        }
    );

}


/* =========================
   PAGE LOADED
========================= */

console.log(
    "Portfolio JavaScript loaded successfully! ✅"
);
/* =========================
   HACKER TERMINAL
========================= */

const terminalBody = document.querySelector(".terminal-body");

if (terminalBody) {

    const terminalInput = document.createElement("input");

    terminalInput.type = "text";
    terminalInput.className = "terminal-input";
    terminalInput.placeholder = "Type 'help' and press Enter...";

    terminalBody.appendChild(terminalInput);

    terminalInput.addEventListener("keydown", function (event) {

        if (event.key !== "Enter") {
            return;
        }

        const command = terminalInput.value
            .trim()
            .toLowerCase();

        let output = "";

        switch (command) {

            case "help":
                output =
                    "Available commands: about, skills, projects, contact, clear";
                break;

            case "about":
                output =
                    "Avanish Singh — B.Tech CSE (Data Science) Student.";
                break;

            case "skills":
                output =
                    "HTML | CSS | JavaScript | Problem Solving";
                break;

            case "projects":
                output =
                    "My First Website | Calculator | Rock Paper Scissors";
                break;

            case "contact":
                output =
                    "Scroll down to the Contact section.";
                break;

            case "clear":
                terminalBody.innerHTML = "";
                terminalBody.appendChild(terminalInput);
                terminalInput.focus();
                return;

            case "":
                return;

            default:
                output =
                    "Command not found. Type 'help' for available commands.";
        }

        const commandLine = document.createElement("p");

        commandLine.innerHTML =
            '<span class="green">avanish@portfolio</span>:~$ ' +
            command;

        const resultLine = document.createElement("p");

        resultLine.className = "terminal-output";
        resultLine.textContent = output;

        terminalBody.insertBefore(
            commandLine,
            terminalInput
        );

        terminalBody.insertBefore(
            resultLine,
            terminalInput
        );

        terminalInput.value = "";

        terminalInput.focus();
    });
}
/* =========================
   ACCESS GRANTED EFFECT
========================= */

const terminalBox = document.querySelector(".terminal-box");

if (terminalBox) {

    setTimeout(function () {

        const accessMessage =
            document.createElement("div");

        accessMessage.className = "access-message";
        accessMessage.textContent =
            "✓ ACCESS GRANTED";

        terminalBox.appendChild(accessMessage);

    }, 1000);
}
