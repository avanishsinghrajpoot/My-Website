/* =====================================================
   AVANISH SINGH
   CYBER PORTFOLIO
   SCRIPT.JS
===================================================== */


/* =====================================================
   MOBILE MENU
===================================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", () => {

        navLinks.classList.toggle("active");

        menuBtn.textContent =
            navLinks.classList.contains("active")
                ? "✕"
                : "☰";

    });

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

            menuBtn.textContent = "☰";

        });

    });

}


/* =====================================================
   THEME
===================================================== */

const themeBtn =
    document.getElementById("themeBtn");

function applyTheme() {

    const savedTheme =
        localStorage.getItem("theme");

    if (savedTheme === "light") {

        document.body.classList.add(
            "light-mode"
        );

        if (themeBtn) {
            themeBtn.textContent = "☀️";
        }

    }

}

applyTheme();

if (themeBtn) {

    themeBtn.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light-mode"
            );

            const light =
                document.body.classList.contains(
                    "light-mode"
                );

            themeBtn.textContent =
                light ? "☀️" : "🌙";

            localStorage.setItem(
                "theme",
                light ? "light" : "dark"
            );

        }
    );

}


/* =====================================================
   TYPING EFFECT
===================================================== */

const words = [
    "B.Tech CSE (Data Science) Student",
    "Coder",
    "Web Developer",
    "Problem Solver",
    "Cyber Enthusiast"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const element =
        document.getElementById(
            "typing-text"
        );

    if (!element) return;

    const word =
        words[wordIndex];

    if (!deleting) {

        element.textContent =
            word.substring(
                0,
                charIndex + 1
            );

        charIndex++;

        if (
            charIndex >=
            word.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;
        }

    } else {

        element.textContent =
            word.substring(
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


/* =====================================================
   CLOCK
===================================================== */

function updateClock() {

    const time =
        document.getElementById(
            "clock-time"
        );

    const date =
        document.getElementById(
            "clock-date"
        );

    if (!time || !date) return;

    const now = new Date();

    time.textContent =
        now.toLocaleTimeString(
            "en-IN",
            {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false
            }
        );

    date.textContent =
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


/* =====================================================
   PROJECTS
===================================================== */

function projectMessage(name) {

    alert(
        "PROJECT SELECTED\n\n" +
        name +
        "\n\nSTATUS: ONLINE ✓"
    );

}


function openCalculator() {

    document
        .getElementById("calculator")
        ?.scrollIntoView({
            behavior: "smooth"
        });

}


function openGame() {

    document
        .getElementById("game")
        ?.scrollIntoView({
            behavior: "smooth"
        });

}


function openTerminal() {

    document
        .getElementById("terminal")
        ?.scrollIntoView({
            behavior: "smooth"
        });

}


function openSnake() {

    document
        .getElementById("snake")
        ?.scrollIntoView({
            behavior: "smooth"
        });

}


/* =====================================================
   CALCULATOR
===================================================== */

let calculatorExpression = "";

function calculatorInput(value) {

    const display =
        document.getElementById(
            "display"
        );

    if (!display) return;

    calculatorExpression += value;

    display.value =
        calculatorExpression ||
        "0";

}


function clearCalculator() {

    calculatorExpression = "";

    const display =
        document.getElementById(
            "display"
        );

    if (display) {
        display.value = "0";
    }

}


function deleteNumber() {

    calculatorExpression =
        calculatorExpression.slice(
            0,
            -1
        );

    const display =
        document.getElementById(
            "display"
        );

    if (display) {

        display.value =
            calculatorExpression ||
            "0";

    }

}


function calculateResult() {

    const display =
        document.getElementById(
            "display"
        );

    if (!display) return;

    if (!calculatorExpression) return;

    try {

        if (
            !/^[0-9+\-*/().%\s]+$/
                .test(
                    calculatorExpression
                )
        ) {

            throw new Error();

        }

        let expression =
            calculatorExpression.replace(
                /(\d+(?:\.\d+)?)%/g,
                "($1/100)"
            );

        const result =
            Function(
                '"use strict";return (' +
                expression +
                ')'
            )();

        if (
            typeof result !== "number" ||
            !Number.isFinite(result)
        ) {

            throw new Error();

        }

        calculatorExpression =
            String(result);

        display.value =
            calculatorExpression;

    } catch {

        display.value = "ERROR";

        calculatorExpression = "";

        setTimeout(() => {

            display.value = "0";

        }, 1000);

    }

}


/* =====================================================
   ROCK PAPER SCISSORS
===================================================== */

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
            "DRAW 🤝";

    } else if (

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
            "YOU WIN 🎉";

    } else {

        computerScore++;

        result =
            "COMPUTER WINS 🤖";

    }

    const resultElement =
        document.getElementById(
            "game-result"
        );

    const scoreElement =
        document.getElementById(
            "game-score"
        );

    if (resultElement) {

        resultElement.textContent =
            result +
            " | Computer: " +
            computerChoice.toUpperCase();

    }

    if (scoreElement) {

        scoreElement.textContent =
            "You: " +
            playerScore +
            " | Computer: " +
            computerScore;

    }

}


/* =====================================================
   HACKER TERMINAL
===================================================== */

const terminalBody =
    document.getElementById(
        "terminalBody"
    );

const terminalInput =
    document.getElementById(
        "terminalInput"
    );

if (terminalInput && terminalBody) {

    terminalInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key !== "Enter"
            ) {
                return;
            }

            const command =
                terminalInput.value
                    .trim()
                    .toLowerCase();

            if (!command) return;

            const commandLine =
                document.createElement(
                    "p"
                );

            commandLine.innerHTML =
                `<span class="green">
                    avanish@portfolio:~$
                </span> ${command}`;

            terminalBody.insertBefore(
                commandLine,
                terminalInput.parentElement
            );

            let output = "";

            switch (command) {

                case "help":

                    output =
                        "Commands: help, about, skills, projects, github, status, secret, matrix, clear";

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
                        "Website | Calculator | RPS | Arcade | Cyber Snake";

                    break;

                case "github":

                    output =
                        "github.com/avanishsinghrajpoot";

                    break;

                case "status":

                    output =
                        "SYSTEM ONLINE ✓";

                    break;

                case "secret":

                    output =
                        "🔐 SECRET MODE ACTIVATED";

                    break;

                case "matrix":

                    output =
                        "💻 MATRIX PROTOCOL ONLINE";

                    break;

                case "clear":

                    terminalBody.innerHTML = `
                        <div class="terminal-command">

                            <span class="green">
                                avanish@portfolio:~$
                            </span>

                            <input
                                type="text"
                                class="terminal-input"
                                id="terminalInput"
                                placeholder="Type 'help'..."
                                autocomplete="off">

                        </div>
                    `;

                    location.reload();

                    return;

                default:

                    output =
                        "Command not found. Type 'help'.";

            }

            const outputLine =
                document.createElement(
                    "p"
                );

            outputLine.className =
                "terminal-output";

            outputLine.textContent =
                output;

            terminalBody.insertBefore(
                outputLine,
                terminalInput.parentElement
            );

            terminalInput.value = "";

            terminalBody.scrollTop =
                terminalBody.scrollHeight;

        }
    );

}


/* =====================================================
   SYSTEM SCAN
===================================================== */

const scanBtn =
    document.getElementById(
        "scanBtn"
    );

const scanOutput =
    document.getElementById(
        "scan-output"
    );

const scanProgress =
    document.querySelectorAll(
        ".scan-progress"
    );

if (scanBtn) {

    scanBtn.addEventListener(
        "click",
        startSystemScan
    );

}

function startSystemScan() {

    scanBtn.disabled = true;

    scanBtn.textContent =
        "⚡ SCANNING...";

    scanProgress.forEach(
        bar => {
            bar.style.width = "0%";
        }
    );

    scanOutput.innerHTML = "";

    const messages = [

        "> Initializing diagnostic protocol...",

        "> Connecting to system core...",

        "> Scanning network........ OK",

        "> Checking security....... OK",

        "> Checking database....... OK",

        "> Analyzing core.......... OK",

        "> Final diagnostics....... OK"

    ];

    let index = 0;

    function next() {

        if (
            index >=
            messages.length
        ) {

            scanOutput.innerHTML +=
                "<p class='scan-success'>✓ SYSTEM SECURE — ACCESS GRANTED</p>";

            scanBtn.disabled = false;

            scanBtn.textContent =
                "⚡ RUN SYSTEM SCAN AGAIN";

            return;
        }

        const p =
            document.createElement("p");

        p.textContent =
            messages[index];

        scanOutput.appendChild(p);

        const progress =
            ((index + 1) /
                messages.length) *
            100;

        scanProgress.forEach(
            bar => {
                const max =
                    Number(
                        bar.dataset.value
                    ) || 100;

                bar.style.width =
                    Math.min(
                        progress,
                        max
                    ) + "%";
            }
        );

        index++;

        setTimeout(
            next,
            600
        );

    }

    next();

}


/* =====================================================
   NUMBER HACK
===================================================== */

let secretNumber = 0;
let guessAttempts = 0;

function startGuessGame() {

    secretNumber =
        Math.floor(
            Math.random() * 100
        ) + 1;

    guessAttempts = 0;

    document.getElementById(
        "arcadeTitle"
    ).textContent =
        "🎯 NUMBER HACK";

    document.getElementById(
        "arcadeMessage"
    ).textContent =
        "SYSTEM: Secret number generated.";

    document.getElementById(
        "arcadeControls"
    ).innerHTML = `

        <input
            type="number"
            id="guessInput"
            min="1"
            max="100"
            placeholder="1 - 100">

        <button
            onclick="checkGuess()">
            [ HACK ]
        </button>

        <p id="guessResult"></p>
    `;

}


function checkGuess() {

    const input =
        document.getElementById(
            "guessInput"
        );

    const result =
        document.getElementById(
            "guessResult"
        );

    const guess =
        Number(input.value);

    if (
        guess < 1 ||
        guess > 100
    ) {

        result.textContent =
            "⚠ Enter 1 - 100";

        return;
    }

    guessAttempts++;

    if (
        guess === secretNumber
    ) {

        result.textContent =
            `✓ ACCESS GRANTED! Number: ${secretNumber} | Attempts: ${guessAttempts}`;

    } else if (
        guess < secretNumber
    ) {

        result.textContent =
            "⬆ TOO LOW";

    } else {

        result.textContent =
            "⬇ TOO HIGH";

    }

}


/* =====================================================
   MEMORY GAME
===================================================== */

let memorySequence = [];
let playerSequence = [];

function startMemoryGame() {

    memorySequence = [];
    playerSequence = [];

    document.getElementById(
        "arcadeTitle"
    ).textContent =
        "🧠 MEMORY HACK";

    document.getElementById(
        "arcadeMessage"
    ).textContent =
        "Watch the sequence...";

    document.getElementById(
        "arcadeControls"
    ).innerHTML = `

        <div class="memory-buttons">

            <button
                class="memory-button"
                onclick="memoryClick(1)">
                1
            </button>

            <button
                class="memory-button"
                onclick="memoryClick(2)">
                2
            </button>

            <button
                class="memory-button"
                onclick="memoryClick(3)">
                3
            </button>

            <button
                class="memory-button"
                onclick="memoryClick(4)">
                4
            </button>

        </div>

        <p id="memoryResult"></p>
    `;

    setTimeout(
        nextMemoryRound,
        500
    );

}


function nextMemoryRound() {

    playerSequence = [];

    memorySequence.push(
        Math.floor(
            Math.random() * 4
        ) + 1
    );

    showMemorySequence();

}


function showMemorySequence() {

    const buttons =
        document.querySelectorAll(
            ".memory-button"
        );

    let index = 0;

    const timer =
        setInterval(() => {

            buttons.forEach(
                button =>
                    button.classList.remove(
                        "active"
                    )
            );

            if (
                index >=
                memorySequence.length
            ) {

                clearInterval(timer);

                document.getElementById(
                    "arcadeMessage"
                ).textContent =
                    "YOUR TURN → Repeat";

                return;

            }

            const number =
                memorySequence[index];

            buttons[
                number - 1
            ].classList.add("active");

            setTimeout(() => {

                buttons[
                    number - 1
                ].classList.remove(
                    "active"
                );

            }, 350);

            index++;

        }, 600);

}


function memoryClick(number) {

    playerSequence.push(number);

    const index =
        playerSequence.length - 1;

    if (
        playerSequence[index] !==
        memorySequence[index]
    ) {

        document.getElementById(
            "memoryResult"
        ).textContent =
            "❌ SYSTEM FAILURE";

        return;

    }

    if (
        playerSequence.length ===
        memorySequence.length
    ) {

        document.getElementById(
            "memoryResult"
        ).textContent =
            "✓ CORRECT!";

        setTimeout(
            nextMemoryRound,
            800
        );

    }

}


/* =====================================================
   REACTION GAME
===================================================== */

let reactionTimer;
let reactionStartTime = 0;

function startReactionGame() {

    document.getElementById(
        "arcadeTitle"
    ).textContent =
        "⚡ REACTION TEST";

    document.getElementById(
        "arcadeMessage"
    ).textContent =
        "Wait for GREEN...";

    document.getElementById(
        "arcadeControls"
    ).innerHTML = `

        <div
            id="reactionBox"
            class="reaction-box ready"
            onclick="reactionClick()">

            WAIT...

        </div>

        <p id="reactionResult"></p>
    `;

    const delay =
        Math.floor(
            Math.random() * 3000
        ) + 2000;

    reactionTimer =
        setTimeout(() => {

            const box =
                document.getElementById(
                    "reactionBox"
                );

            if (!box) return;

            box.classList.remove(
                "ready"
            );

            box.classList.add(
                "go"
            );

            box.textContent =
                "⚡ CLICK NOW!";

            reactionStartTime =
                performance.now();

        }, delay);

}


function reactionClick() {

    const box =
        document.getElementById(
            "reactionBox"
        );

    const result =
        document.getElementById(
            "reactionResult"
        );

    if (!box) return;

    if (
        box.classList.contains(
            "ready"
        )
    ) {

        clearTimeout(
            reactionTimer
        );

        result.textContent =
            "❌ TOO EARLY!";

        box.textContent =
            "FAILED";

        return;

    }

    const time =
        Math.round(
            performance.now() -
            reactionStartTime
        );

    result.textContent =
        `⚡ Reaction Time: ${time} ms`;

    box.textContent =
        "✓ SYSTEM HACKED";

    box.onclick = null;

}


/* =====================================================
   CYBER SNAKE
===================================================== */

const snakeCanvas =
    document.getElementById(
        "snakeCanvas"
    );

const snakeStartBtn =
    document.getElementById(
        "snakeStartBtn"
    );

const snakeScoreDisplay =
    document.getElementById(
        "snakeScore"
    );

const snakeStatus =
    document.getElementById(
        "snakeStatus"
    );


if (
    snakeCanvas &&
    snakeStartBtn
) {

    const ctx =
        snakeCanvas.getContext(
            "2d"
        );

    const grid = 20;

    const tileCount =
        snakeCanvas.width /
        grid;

    let snake = [];

    let food = {};

    let direction = {
        x: 1,
        y: 0
    };

    let nextDirection = {
        x: 1,
        y: 0
    };

    let snakeScore = 0;

    let snakeTimer = null;

    let snakeRunning = false;


    function startSnakeGame() {

        clearInterval(
            snakeTimer
        );

        snake = [

            {
                x: 8,
                y: 8
            },

            {
                x: 7,
                y: 8
            },

            {
                x: 6,
                y: 8
            }

        ];

        direction = {
            x: 1,
            y: 0
        };

        nextDirection = {
            x: 1,
            y: 0
        };

        snakeScore = 0;

        snakeScoreDisplay.textContent =
            snakeScore;

        snakeStatus.textContent =
            "SYSTEM: Snake online...";

        snakeRunning = true;

        snakeStartBtn.textContent =
            "[ RESTART ]";

        createFood();

        drawSnake();

        snakeTimer =
            setInterval(
                updateSnake,
                120
            );

    }


    function createFood() {

        let valid = false;

        while (!valid) {

            food = {

                x: Math.floor(
                    Math.random() *
                    tileCount
                ),

                y: Math.floor(
                    Math.random() *
                    tileCount
                )

            };

            valid =
                !snake.some(
                    part =>
                        part.x === food.x &&
                        part.y === food.y
                );

        }

    }


    function updateSnake() {

        if (!snakeRunning) return;

        direction =
            nextDirection;

        const head = {

            x:
                snake[0].x +
                direction.x,

            y:
                snake[0].y +
                direction.y

        };


        /* WALL */

        if (

            head.x < 0 ||
            head.x >= tileCount ||
            head.y < 0 ||
            head.y >= tileCount

        ) {

            snakeGameOver();

            return;

        }


        /* BODY */

        if (

            snake.some(
                part =>
                    part.x === head.x &&
                    part.y === head.y
            )

        ) {

            snakeGameOver();

            return;

        }


        snake.unshift(
            head
        );


        /* FOOD */

        if (

            head.x === food.x &&
            head.y === food.y

        ) {

            snakeScore++;

            snakeScoreDisplay.textContent =
                snakeScore;

            snakeStatus.textContent =
                "✓ DATA NODE CAPTURED!";

            createFood();

        } else {

            snake.pop();

        }

        drawSnake();

    }


    function drawSnake() {

        ctx.fillStyle =
            "#020b05";

        ctx.fillRect(
            0,
            0,
            snakeCanvas.width,
            snakeCanvas.height
        );


        /* GRID */

        ctx.strokeStyle =
            "rgba(34,197,94,0.08)";

        for (
            let i = 0;
            i <= tileCount;
            i++
        ) {

            ctx.beginPath();

            ctx.moveTo(
                i * grid,
                0
            );

            ctx.lineTo(
                i * grid,
                snakeCanvas.height
            );

            ctx.stroke();


            ctx.beginPath();

            ctx.moveTo(
                0,
                i * grid
            );

            ctx.lineTo(
                snakeCanvas.width,
                i * grid
            );

            ctx.stroke();

        }


        /* FOOD */

        ctx.fillStyle =
            "#ef4444";

        ctx.shadowColor =
            "#ef4444";

        ctx.shadowBlur =
            15;

        ctx.fillRect(

            food.x * grid + 3,

            food.y * grid + 3,

            grid - 6,

            grid - 6

        );


        /* SNAKE */

        snake.forEach(
            (part, index) => {

                ctx.fillStyle =
                    index === 0
                        ? "#86efac"
                        : "#22c55e";

                ctx.shadowColor =
                    "#22c55e";

                ctx.shadowBlur =
                    12;

                ctx.fillRect(

                    part.x * grid + 2,

                    part.y * grid + 2,

                    grid - 4,

                    grid - 4

                );

            }
        );

        ctx.shadowBlur = 0;

    }


    function snakeGameOver() {

        snakeRunning = false;

        clearInterval(
            snakeTimer
        );

        snakeStatus.textContent =
            "💀 SYSTEM FAILURE — GAME OVER";

        snakeStartBtn.textContent =
            "[ PLAY AGAIN ]";

        drawSnake();


        ctx.fillStyle =
            "rgba(0,0,0,0.7)";

        ctx.fillRect(
            0,
            0,
            snakeCanvas.width,
            snakeCanvas.height
        );

        ctx.fillStyle =
            "#ef4444";

        ctx.font =
            "bold 25px monospace";

        ctx.textAlign =
            "center";

        ctx.fillText(
            "GAME OVER",
            snakeCanvas.width / 2,
            snakeCanvas.height / 2
        );

        ctx.font =
            "16px monospace";

        ctx.fillStyle =
            "#86efac";

        ctx.fillText(
            "SCORE: " +
            snakeScore,
            snakeCanvas.width / 2,
            snakeCanvas.height / 2 + 35
        );

    }


    snakeStartBtn.addEventListener(
        "click",
        startSnakeGame
    );


    /* ================= KEYBOARD ================= */

    document.addEventListener(
        "keydown",
        event => {

            if (!snakeRunning) return;

            if (
                event.key === "ArrowUp" &&
                direction.y !== 1
            ) {

                nextDirection = {
                    x: 0,
                    y: -1
                };

                event.preventDefault();

            }


            if (
                event.key === "ArrowDown" &&
                direction.y !== -1
            ) {

                nextDirection = {
                    x: 0,
                    y: 1
                };

                event.preventDefault();

            }


            if (
                event.key === "ArrowLeft" &&
                direction.x !== 1
            ) {

                nextDirection = {
                    x: -1,
                    y: 0
                };

                event.preventDefault();

            }


            if (
                event.key === "ArrowRight" &&
                direction.x !== -1
            ) {

                nextDirection = {
                    x: 1,
                    y: 0
                };

                event.preventDefault();

            }

        }
    );

}


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const button =
                contactForm.querySelector(
                    "button[type='submit']"
                );

            const message =
                document.getElementById(
                    "formMessage"
                );

            button.disabled = true;

            button.textContent =
                "[ SENDING... ]";

            try {

                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",
                            body:
                                new FormData(
                                    contactForm
                                ),
                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );

                if (
                    response.ok
                ) {

                    message.textContent =
                        "✓ MESSAGE SENT SUCCESSFULLY";

                    message.style.color =
                        "#22c55e";

                    contactForm.reset();

                } else {

                    throw new Error();

                }

            } catch {

                message.textContent =
                    "✕ CONNECTION ERROR";

                message.style.color =
                    "#ef4444";

            }

            button.disabled = false;

            button.textContent =
                "[ SEND MESSAGE ]";

        }
    );

}


/* =====================================================
   CURSOR GLOW
===================================================== */

const cursorGlow =
    document.getElementById(
        "cursorGlow"
    );

if (cursorGlow) {

    document.addEventListener(
        "mousemove",
        event => {

            cursorGlow.style.left =
                event.clientX + "px";

            cursorGlow.style.top =
                event.clientY + "px";

        }
    );

}


/* =====================================================
   TOP BUTTON
===================================================== */

const topBtn =
    document.getElementById(
        "topBtn"
    );

if (topBtn) {

    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 400
            ) {

                topBtn.classList.add(
                    "show"
                );

            } else {

                topBtn.classList.remove(
                    "show"
                );

            }

        }
    );

    topBtn.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =====================================================
   MATRIX RAIN
===================================================== */

const matrixCanvas =
    document.getElementById(
        "matrixCanvas"
    );

if (matrixCanvas) {

    const ctx =
        matrixCanvas.getContext(
            "2d"
        );

    const characters =
        "01ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオ#$%";

    const fontSize = 16;

    let columns;
    let drops;

    function resizeMatrix() {

        matrixCanvas.width =
            window.innerWidth;

        matrixCanvas.height =
            window.innerHeight;

        columns =
            Math.floor(
                window.innerWidth /
                fontSize
            );

        drops =
            Array(
                columns
            ).fill(1);

    }

    resizeMatrix();

    window.addEventListener(
        "resize",
        resizeMatrix
    );


    function drawMatrix() {

        ctx.fillStyle =
            "rgba(2,11,5,0.08)";

        ctx.fillRect(
            0,
            0,
            matrixCanvas.width,
            matrixCanvas.height
        );

        ctx.fillStyle =
            "#22c55e";

        ctx.font =
            fontSize +
            "px monospace";

        for (
            let i = 0;
            i < drops.length;
            i++
        ) {

            const char =
                characters[
                    Math.floor(
                        Math.random() *
                        characters.length
                    )
                ];

            ctx.fillText(
                char,
                i * fontSize,
                drops[i] *
                fontSize
            );

            if (

                drops[i] *
                fontSize >
                matrixCanvas.height

                &&

                Math.random() >
                0.975

            ) {

                drops[i] = 0;

            }

            drops[i]++;

        }

    }

    setInterval(
        drawMatrix,
        50
    );

}


/* =====================================================
   CALCULATOR KEYBOARD
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        const active =
            document.activeElement;

        if (
            active &&
            (
                active.tagName ===
                "INPUT" ||

                active.tagName ===
                "TEXTAREA"
            )
        ) {

            if (
                active.id !==
                "display"
            ) {

                return;

            }

        }

        if (
            /[0-9+\-*/.%]/.test(
                event.key
            )
        ) {

            calculatorInput(
                event.key
            );

        } else if (
            event.key === "Enter"
        ) {

            calculateResult();

        } else if (
            event.key === "Backspace"
        ) {

            deleteNumber();

        } else if (
            event.key === "Escape"
        ) {

            clearCalculator();

        }

    }
);


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "%c AVANISH SINGH | SYSTEM ONLINE ",
    "color:#22c55e;font-size:16px;font-weight:bold;"
);

console.log(
    "%c Type 'help' in Hacker Terminal ",
    "color:#86efac;font-size:13px;"
);
