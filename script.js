/* =====================================================
   AVANISH SINGH - CYBER PORTFOLIO
   CLEAN SCRIPT.JS
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
            navLinks.classList.contains("active") ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");
            menuBtn.textContent = "☰";

        });

    });
}


/* =====================================================
   DARK / LIGHT MODE
===================================================== */

const themeBtn = document.getElementById("themeBtn");

function applyTheme() {

    const savedTheme = localStorage.getItem("theme");

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

    themeBtn.addEventListener("click", () => {

        document.body.classList.toggle("light-mode");

        const light =
            document.body.classList.contains("light-mode");

        themeBtn.textContent =
            light ? "☀️" : "🌙";

        localStorage.setItem(
            "theme",
            light ? "light" : "dark"
        );
    });
}

applyTheme();


/* =====================================================
   TYPING ANIMATION
===================================================== */

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

    if (!typingText) return;

    const word = words[wordIndex];

    if (!deleting) {

        typingText.textContent =
            word.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex >= word.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);
            return;
        }

    } else {

        typingText.textContent =
            word.substring(0, charIndex - 1);

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


/* =====================================================
   DIGITAL CLOCK
===================================================== */

function updateClock() {

    const clockTime =
        document.getElementById("clock-time");

    const clockDate =
        document.getElementById("clock-date");

    if (!clockTime || !clockDate) return;

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


/* =====================================================
   PROJECT
===================================================== */

function projectMessage(projectName) {

    alert(
        "PROJECT SELECTED\n\n" +
        projectName +
        "\n\nStatus: ONLINE ✓"
    );
}


/* =====================================================
   OPEN SECTIONS
===================================================== */

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


/* =====================================================
   CALCULATOR
===================================================== */

let calculatorExpression = "";

function calculatorInput(value) {

    const display =
        document.getElementById("display");

    if (!display) return;

    const operators = ["+", "-", "*", "/"];

    if (
        operators.includes(value) &&
        calculatorExpression !== ""
    ) {

        const last =
            calculatorExpression.slice(-1);

        if (operators.includes(last)) {

            calculatorExpression =
                calculatorExpression.slice(0, -1);
        }
    }

    if (value === ".") {

        const parts =
            calculatorExpression.split(/[\+\-\*\/]/);

        const current =
            parts[parts.length - 1];

        if (current.includes(".")) return;
    }

    calculatorExpression += value;

    display.value =
        calculatorExpression || "0";
}


function clearCalculator() {

    calculatorExpression = "";

    const display =
        document.getElementById("display");

    if (display) {
        display.value = "0";
    }
}


function deleteNumber() {

    calculatorExpression =
        calculatorExpression.slice(0, -1);

    const display =
        document.getElementById("display");

    if (display) {

        display.value =
            calculatorExpression || "0";
    }
}


function calculateResult() {

    const display =
        document.getElementById("display");

    if (!display || !calculatorExpression) return;

    try {

        let expression =
            calculatorExpression;

        expression =
            expression.replace(
                /(\d+(?:\.\d+)?)%/g,
                "($1/100)"
            );

        if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
            throw new Error("Invalid");
        }

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
            throw new Error("Invalid");
        }

        calculatorExpression =
            String(result);

        display.value =
            calculatorExpression;

    } catch (error) {

        display.value = "Error";

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
                Math.random() * choices.length
            )
        ];

    let result;

    if (playerChoice === computerChoice) {

        result = "It's a Draw! 🤝";

    } else if (

        (playerChoice === "rock" &&
            computerChoice === "scissors") ||

        (playerChoice === "paper" &&
            computerChoice === "rock") ||

        (playerChoice === "scissors" &&
            computerChoice === "paper")

    ) {

        playerScore++;
        result = "You Win! 🎉";

    } else {

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
            computerChoice.toUpperCase() +
            ".";
    }

    if (gameScore) {

        gameScore.textContent =
            `You: ${playerScore} | Computer: ${computerScore}`;
    }
}


/* =====================================================
   HACKER TERMINAL
===================================================== */

const terminalBody =
    document.querySelector("#terminal .terminal-body");

let terminalInput = null;

if (terminalBody) {

    terminalInput =
        document.getElementById("terminalInput");

    if (terminalInput) {

        terminalInput.addEventListener(
            "keydown",
            handleTerminalCommand
        );
    }
}


function handleTerminalCommand(event) {

    if (event.key !== "Enter") return;

    const input = event.target;

    const command =
        input.value.trim().toLowerCase();

    if (!command) return;

    const output =
        getTerminalOutput(command);

    const commandLine =
        document.createElement("p");

    commandLine.innerHTML =
        `<span class="green">
            avanish@portfolio
        </span>:~$
        <span class="white">${command}</span>`;

    const resultLine =
        document.createElement("p");

    resultLine.className =
        "terminal-output";

    resultLine.innerHTML =
        output;

    terminalBody.insertBefore(
        commandLine,
        terminalBody.querySelector(".terminal-command")
    );

    terminalBody.insertBefore(
        resultLine,
        terminalBody.querySelector(".terminal-command")
    );

    input.value = "";

    terminalBody.scrollTop =
        terminalBody.scrollHeight;
}


function getTerminalOutput(command) {

    switch (command) {

        case "help":

            return `
                Available commands:<br>
                ├─ about<br>
                ├─ skills<br>
                ├─ projects<br>
                ├─ contact<br>
                ├─ home<br>
                ├─ clock<br>
                ├─ status<br>
                ├─ github<br>
                ├─ secret<br>
                ├─ matrix<br>
                ├─ hack<br>
                ├─ sudo<br>
                └─ clear
            `;


        case "about":

            return "Avanish Singh — B.Tech CSE (Data Science) Student.";


        case "skills":

            return "HTML | CSS | JavaScript | Problem Solving";


        case "projects":

            return "My First Website | Calculator | Rock Paper Scissors";


        case "status":

            return "SYSTEM ONLINE ✓";


        case "clock":

            return "System clock is running.";


        case "secret":

            return "🔐 SECRET MODE ACTIVATED...";


        case "matrix":

            return "💻 MATRIX PROTOCOL INITIALIZED...";


        case "hack":

            return "⚠️ SIMULATION MODE: HACKING MAINFRAME...";


        case "sudo":

            return "🛡️ ACCESS LEVEL: ROOT";


        case "whoami":

            return "👤 AVANISH SINGH — DEVELOPER";


        case "github":

            return "🐙 GitHub: avanishsinghrajpoot";


        case "contact":

            document
                .getElementById("contact")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

            return "Opening Contact section...";


        case "home":

            document
                .getElementById("home")
                ?.scrollIntoView({
                    behavior: "smooth"
                });

            return "Returning to Home...";


        case "clear":

            clearTerminal();

            return "";


        default:

            return `Command not found: ${command}`;
    }
}


function clearTerminal() {

    if (!terminalBody) return;

    terminalBody.innerHTML = `

        <div class="terminal-command">

            <span class="green">
                avanish@portfolio:~$
            </span>

            <input
                type="text"
                class="terminal-input"
                id="terminalInput"
                placeholder="Type 'help' and press Enter..."
                autocomplete="off"
            >

        </div>
    `;

    terminalInput =
        document.getElementById("terminalInput");

    if (terminalInput) {

        terminalInput.addEventListener(
            "keydown",
            handleTerminalCommand
        );

        terminalInput.focus();
    }
}


/* =====================================================
   SYSTEM SCAN
===================================================== */

const scanBtn =
    document.getElementById("scanBtn");

const scanOutput =
    document.getElementById("scan-output");

const scanProgress =
    document.querySelectorAll(".scan-progress");


if (scanBtn && scanOutput) {

    scanBtn.addEventListener(
        "click",
        startSystemScan
    );
}


function startSystemScan() {

    if (scanBtn.classList.contains("scanning")) {
        return;
    }

    scanBtn.classList.add("scanning");
    scanBtn.disabled = true;

    scanBtn.textContent =
        "⚡ SCANNING...";

    scanProgress.forEach(bar => {
        bar.style.width = "0%";
    });

    scanOutput.innerHTML = "";

    const messages = [

        "> Initializing cyber diagnostic protocol...",
        "> Connecting to system core...",
        "> Scanning network............... OK",
        "> Checking security.............. OK",
        "> Checking database.............. OK",
        "> Analyzing system core.......... OK",
        "> Running final diagnostics..... OK"

    ];

    let index = 0;

    function showMessage() {

        if (index < messages.length) {

            const p =
                document.createElement("p");

            p.textContent =
                messages[index];

            scanOutput.appendChild(p);

            updateProgress(index + 1);

            index++;

            setTimeout(
                showMessage,
                600
            );

        } else {

            finishScan();
        }
    }

    showMessage();
}


function updateProgress(step) {

    const values = [
        15,
        30,
        48,
        65,
        80,
        92,
        100
    ];

    const value =
        values[step - 1] || 100;

    scanProgress.forEach(bar => {

        const original =
            parseInt(bar.dataset.value) || value;

        bar.style.width =
            Math.min(original, value) + "%";
    });
}


function finishScan() {

    const success =
        document.createElement("p");

    success.className =
        "scan-success";

    success.textContent =
        "✓ SYSTEM SECURE — ACCESS GRANTED";

    scanOutput.appendChild(success);

    const time =
        document.createElement("p");

    time.textContent =
        "> Scan completed successfully.";

    scanOutput.appendChild(time);

    scanBtn.classList.remove("scanning");

    scanBtn.disabled = false;

    scanBtn.textContent =
        "⚡ RUN SYSTEM SCAN AGAIN";
}


/* =====================================================
   CYBER ARCADE
===================================================== */


/* ================= NUMBER HACK ================= */

let secretNumber = 0;
let guessAttempts = 0;
const maxAttempts = 7;

function startGuessGame() {

    secretNumber =
        Math.floor(Math.random() * 100) + 1;

    guessAttempts = 0;

    document.getElementById("arcadeTitle").textContent =
        "🎯 NUMBER HACK";

    document.getElementById("arcadeMessage").textContent =
        "SYSTEM: Crack the secret number!";

    document.getElementById("arcadeControls").innerHTML = `

        <input
            type="number"
            id="guessInput"
            min="1"
            max="100"
            placeholder="1 - 100"
        >

        <button type="button" onclick="checkGuess()">
            [ HACK ]
        </button>

        <p id="guessResult">
            Attempts: 0 / ${maxAttempts}
        </p>
    `;

    document.getElementById("arcadeGame")
        ?.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    setTimeout(() => {

        document
            .getElementById("guessInput")
            ?.focus();

    }, 200);
}


function checkGuess() {

    const input =
        document.getElementById("guessInput");

    const result =
        document.getElementById("guessResult");

    if (!input || !result) return;

    const guess =
        Number(input.value);

    if (
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > 100
    ) {

        result.textContent =
            "⚠ ENTER A NUMBER BETWEEN 1 AND 100";

        return;
    }

    guessAttempts++;

    if (guess === secretNumber) {

        const score =
            Math.max(
                100,
                1000 - ((guessAttempts - 1) * 100)
            );

        result.innerHTML =
            `🎉 <b>ACCESS GRANTED!</b><br>
             🔐 Number: ${secretNumber}<br>
             ⚡ Attempts: ${guessAttempts}<br>
             🏆 Score: ${score}`;

        input.disabled = true;

        return;
    }

    if (guessAttempts >= maxAttempts) {

        result.innerHTML =
            `💀 <b>SYSTEM LOCKED!</b><br>
             The number was ${secretNumber}.`;

        input.disabled = true;

        return;
    }

    if (guess < secretNumber) {

        result.innerHTML =
            `⬆ TOO LOW<br>
             Attempts: ${guessAttempts} / ${maxAttempts}`;

    } else {

        result.innerHTML =
            `⬇ TOO HIGH<br>
             Attempts: ${guessAttempts} / ${maxAttempts}`;
    }

    input.value = "";
    input.focus();
}


/* ================= MEMORY HACK ================= */

let memorySequence = [];
let playerSequence = [];
let memoryLevel = 0;
let memoryLocked = true;

function startMemoryGame() {

    memorySequence = [];
    playerSequence = [];
    memoryLevel = 0;
    memoryLocked = true;

    document.getElementById("arcadeTitle").textContent =
        "🧠 MEMORY HACK";

    document.getElementById("arcadeMessage").textContent =
        "SYSTEM: Memorize the sequence!";

    document.getElementById("arcadeControls").innerHTML = `

        <div class="memory-info">
            LEVEL: <span id="memoryLevel">1</span>
        </div>

        <div class="memory-buttons">

            <button class="memory-button"
                onclick="memoryClick(1)">1</button>

            <button class="memory-button"
                onclick="memoryClick(2)">2</button>

            <button class="memory-button"
                onclick="memoryClick(3)">3</button>

            <button class="memory-button"
                onclick="memoryClick(4)">4</button>

        </div>

        <p id="memoryResult">
            Preparing system...
        </p>
    `;

    setTimeout(
        nextMemoryRound,
        800
    );
}


function nextMemoryRound() {

    memoryLevel++;

    playerSequence = [];
    memoryLocked = true;

    const level =
        document.getElementById("memoryLevel");

    if (level) {
        level.textContent = memoryLevel;
    }

    memorySequence.push(
        Math.floor(Math.random() * 4) + 1
    );

    document.getElementById("arcadeMessage").textContent =
        `LEVEL ${memoryLevel} — MEMORIZE...`;

    showMemorySequence();
}


function showMemorySequence() {

    const buttons =
        document.querySelectorAll(".memory-button");

    let index = 0;

    const speed =
        Math.max(
            250,
            650 - memoryLevel * 25
        );

    const timer =
        setInterval(() => {

            buttons.forEach(button => {
                button.classList.remove("active");
            });

            if (
          
