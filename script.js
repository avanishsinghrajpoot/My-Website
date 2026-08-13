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
                index >=
                memorySequence.length
            ) {

                clearInterval(timer);

                memoryLocked = false;

                document.getElementById("arcadeMessage").textContent =
                    "YOUR TURN → REPEAT THE SEQUENCE";

                return;
            }

            const number =
                memorySequence[index];

            const button =
                buttons[number - 1];

            if (button) {

                button.classList.add("active");

                setTimeout(() => {

                    button.classList.remove("active");

                }, speed - 80);
            }

            index++;

        }, speed);
}


function memoryClick(number) {

    if (memoryLocked) return;

    playerSequence.push(number);

    const index =
        playerSequence.length - 1;

    const result =
        document.getElementById("memoryResult");

    if (
        playerSequence[index] !==
        memorySequence[index]
    ) {

        memoryLocked = true;

        result.innerHTML =
            `❌ <b>SYSTEM FAILURE</b><br>
             Level reached: ${memoryLevel}`;

        document.getElementById("arcadeMessage").textContent =
            "💀 MEMORY HACK FAILED";

        return;
    }

    if (
        playerSequence.length ===
        memorySequence.length
    ) {

        memoryLocked = true;

        result.textContent =
            "✓ CORRECT! Loading next level...";

        document.getElementById("arcadeMessage").textContent =
            "ACCESS GRANTED ✓";

        setTimeout(
            nextMemoryRound,
            900
        );
    }
}


/* ================= REACTION TEST ================= */

let reactionStartTime = 0;
let reactionTimer = null;
let reactionFinished = false;

let bestReaction =
    localStorage.getItem("bestReaction");


function startReactionGame() {

    clearTimeout(reactionTimer);

    reactionFinished = false;
    reactionStartTime = 0;

    document.getElementById("arcadeTitle").textContent =
        "⚡ REACTION TEST";

    document.getElementById("arcadeMessage").textContent =
        "SYSTEM: Wait for GREEN...";

    document.getElementById("arcadeControls").innerHTML = `

        <div
            id="reactionBox"
            class="reaction-box ready"
            onclick="reactionClick()">

            WAIT...

        </div>

        <p id="reactionResult">
            Best:
            ${bestReaction ? bestReaction + " ms" : "--"}
        </p>

        <button
            type="button"
            onclick="startReactionGame()">

            [ RETRY ]

        </button>
    `;

    const delay =
        Math.floor(Math.random() * 4000) + 2000;

    reactionTimer =
        setTimeout(() => {

            const box =
                document.getElementById("reactionBox");

            if (!box) return;

            box.classList.remove("ready");
            box.classList.add("go");

            box.textContent =
                "⚡ CLICK NOW!";

            reactionStartTime =
                performance.now();

        }, delay);
}


function reactionClick() {

    const box =
        document.getElementById("reactionBox");

    const result =
        document.getElementById("reactionResult");

    if (!box || !result || reactionFinished) {
        return;
    }

    if (box.classList.contains("ready")) {

        clearTimeout(reactionTimer);

        reactionFinished = true;

        box.classList.remove("ready");
        box.classList.add("failed");

        box.textContent =
            "❌ TOO EARLY!";

        result.textContent =
            "💀 FALSE START — Wait for GREEN!";

        return;
    }

    const reactionTime =
        Math.round(
            performance.now() -
            reactionStartTime
        );

    reactionFinished = true;

    box.classList.remove("go");
    box.classList.add("success");

    box.textContent =
        "✓ SYSTEM HACKED";

    let message =
        `⚡ Reaction Time: ${reactionTime} ms`;

    if (
        !bestReaction ||
        reactionTime < Number(bestReaction)
    ) {

        bestReaction =
            reactionTime;

        localStorage.setItem(
            "bestReaction",
            bestReaction
        );

        message +=
            "<br>🏆 NEW BEST SCORE!";
    }

    result.innerHTML =
        message +
        `<br>🏅 Best: ${bestReaction} ms`;
}


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            const button =
                contactForm.querySelector(
                    "button[type='submit']"
                );

            if (button) {

                button.disabled = true;
                button.textContent =
                    "[ SENDING... ]";
            }

            if (formMessage) {

                formMessage.textContent =
                    "Connecting to server...";

                formMessage.style.color =
                    "#4ade80";
            }

            try {

                const response =
                    await fetch(
                        contactForm.action,
                        {
                            method: "POST",
                            body: new FormData(contactForm),
                            headers: {
                                Accept:
                                    "application/json"
                            }
                        }
                    );

                if (response.ok) {

                    if (formMessage) {

                        formMessage.textContent =
                            "✓ MESSAGE SENT SUCCESSFULLY";

                        formMessage.style.color =
                            "#22c55e";
                    }

                    contactForm.reset();

                } else {

                    throw new Error("Server error");
                }

            } catch (error) {

                if (formMessage) {

                    formMessage.textContent =
                        "✕ CONNECTION ERROR. PLEASE TRY AGAIN.";

                    formMessage.style.color =
                        "#ef4444";
                }

            } finally {

                if (button) {

                    button.disabled = false;

                    button.textContent =
                        "[ SEND MESSAGE ]";
                }
            }
        }
    );
}


/* =====================================================
   SCROLL TO TOP
===================================================== */

const topBtn =
    document.getElementById("topBtn");

if (topBtn) {

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 400) {

                topBtn.classList.add("show");

            } else {

                topBtn.classList.remove("show");
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
   CURSOR GLOW
===================================================== */

const cursorGlow =
    document.getElementById("cursorGlow");

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
   MATRIX RAIN
===================================================== */

const matrixCanvas =
    document.getElementById("matrixCanvas");

if (matrixCanvas) {

    const ctx =
        matrixCanvas.getContext("2d");

    const chars =
        "01アイウエオカキクケコABCDEFGHIJKLMNOPQRSTUVWXYZ#$%";

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
            Array(columns).fill(1);
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
            fontSize + "px monospace";

        for (
            let i = 0;
            i < drops.length;
            i++
        ) {

            const char =
                chars[
                    Math.floor(
                        Math.random() *
                        chars.length
                    )
                ];

            ctx.fillText(
                char,
                i * fontSize,
                drops[i] * fontSize
            );

            if (
                drops[i] * fontSize >
                matrixCanvas.height &&
                Math.random() > 0.975
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
   KEYBOARD CALCULATOR
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        const active =
            document.activeElement;

        if (
            active &&
            (
                active.tagName === "INPUT" ||
                active.tagName === "TEXTAREA"
            ) &&
            active.id !== "display"
        ) {

            return;
        }

        const key = event.key;

        if (
            /[0-9+\-*/.%]/.test(key)
        ) {

            calculatorInput(key);

        } else if (key === "Enter") {

            calculateResult();

        } else if (key === "Backspace") {

            deleteNumber();

        } else if (key === "Escape") {

            clearCalculator();
        }
    }
);


/* =====================================================
   TERMINAL BOOT
===================================================== */

if (terminalBody) {

    const bootLines = [

        "Initializing system...",
        "Loading portfolio modules...",
        "Checking skills...",
        "Connecting to project database...",
        "System ready."

    ];

    const boot =
        document.createElement("div");

    boot.className =
        "terminal-boot";

    terminalBody.prepend(boot);

    let index = 0;

    function bootAnimation() {

        if (index >= bootLines.length) {
            return;
        }

        const line =
            document.createElement("p");

        line.textContent =
            "> " + bootLines[index];

        boot.appendChild(line);

        index++;

        setTimeout(
            bootAnimation,
            500
        );
    }

    bootAnimation();
}


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "%c AVANISH SINGH | SYSTEM ONLINE ",
    "color:#22c55e;font-size:16px;font-weight:bold;"
);

console.log(
    "%c Cyber Portfolio Loaded Successfully ✓ ",
    "color:#4ade80;font-size:13px;"
);
/* =====================================================
   🐍 CYBER SNAKE GAME
===================================================== */

let snakeCanvas;
let snakeCtx;

let snake = [];
let snakeFood = {};
let snakeDirection = "RIGHT";
let nextSnakeDirection = "RIGHT";
let snakeScore = 0;
let snakeTimer = null;
let snakeRunning = false;

function startSnakeGame() {

    const title = document.getElementById("arcadeTitle");
    const message = document.getElementById("arcadeMessage");
    const controls = document.getElementById("arcadeControls");
    const area = document.getElementById("snakeGameArea");

    if (!title || !message || !controls || !area) {
        console.error("Snake game HTML elements missing.");
        return;
    }

    title.textContent = "🐍 CYBER SNAKE";

    message.textContent =
        "SYSTEM: Eat the data nodes. Don't hit the wall!";

    controls.innerHTML = "";

    area.innerHTML = `
        <div class="snake-wrapper">

            <canvas
                id="snakeCanvas"
                width="320"
                height="320">
            </canvas>

            <div class="snake-info">
                SCORE:
                <span id="snakeScore">0</span>
            </div>

            <button
                type="button"
                onclick="restartSnakeGame()">
                [ RESTART ]
            </button>

            <div class="snake-controls">

                <button onclick="changeSnakeDirection('UP')">
                    ▲
                </button>

                <div>
                    <button onclick="changeSnakeDirection('LEFT')">
                        ◀
                    </button>

                    <button onclick="changeSnakeDirection('DOWN')">
                        ▼
                    </button>

                    <button onclick="changeSnakeDirection('RIGHT')">
                        ▶
                    </button>
                </div>

            </div>

            <p id="snakeStatus">
                USE ARROW KEYS OR BUTTONS
            </p>

        </div>
    `;

    snakeCanvas =
        document.getElementById("snakeCanvas");

    snakeCtx =
        snakeCanvas.getContext("2d");

    restartSnakeGame();

    snakeCanvas.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


/* ================= START / RESTART ================= */

function restartSnakeGame() {

    if (!snakeCanvas) return;

    clearInterval(snakeTimer);

    snake = [
        { x: 8, y: 8 },
        { x: 7, y: 8 },
        { x: 6, y: 8 }
    ];

    snakeDirection = "RIGHT";
    nextSnakeDirection = "RIGHT";

    snakeScore = 0;
    snakeRunning = true;

    updateSnakeScore();
    createSnakeFood();

    const status =
        document.getElementById("snakeStatus");

    if (status) {
        status.textContent =
            "SYSTEM ONLINE — SNAKE ACTIVE";
    }

    drawSnake();

    snakeTimer =
        setInterval(
            moveSnake,
            120
        );
}


/* ================= FOOD ================= */

function createSnakeFood() {

    let validPosition = false;

    while (!validPosition) {

        snakeFood = {
            x: Math.floor(Math.random() * 16),
            y: Math.floor(Math.random() * 16)
        };

        validPosition = !snake.some(part =>
            part.x === snakeFood.x &&
            part.y === snakeFood.y
        );
    }
}


/* ================= MOVE ================= */

function moveSnake() {

    if (!snakeRunning) return;

    snakeDirection =
        nextSnakeDirection;

    const head = {
        x: snake[0].x,
        y: snake[0].y
    };


    if (snakeDirection === "UP") {
        head.y--;
    }

    if (snakeDirection === "DOWN") {
        head.y++;
    }

    if (snakeDirection === "LEFT") {
        head.x--;
    }

    if (snakeDirection === "RIGHT") {
        head.x++;
    }


    /* Wall collision */

    if (
        head.x < 0 ||
        head.x >= 16 ||
        head.y < 0 ||
        head.y >= 16
    ) {

        snakeGameOver();
        return;
    }


    /* Body collision */

    if (
        snake.some(part =>
            part.x === head.x &&
            part.y === head.y
        )
    ) {

        snakeGameOver();
        return;
    }


    snake.unshift(head);


    /* Eat food */

    if (
        head.x === snakeFood.x &&
        head.y === snakeFood.y
    ) {

        snakeScore += 10;

        updateSnakeScore();

        createSnakeFood();

    } else {

        snake.pop();

    }


    drawSnake();
}


/* ================= DRAW ================= */

function drawSnake() {

    if (!snakeCtx) return;

    const size = 20;

    /* Background */

    snakeCtx.fillStyle = "#020b05";

    snakeCtx.fillRect(
        0,
        0,
        snakeCanvas.width,
        snakeCanvas.height
    );


    /* Grid */

    snakeCtx.strokeStyle =
        "rgba(34,197,94,0.08)";

    for (let i = 0; i <= 16; i++) {

        snakeCtx.beginPath();

        snakeCtx.moveTo(
            i * size,
            0
        );

        snakeCtx.lineTo(
            i * size,
            320
        );

        snakeCtx.stroke();


        snakeCtx.beginPath();

        snakeCtx.moveTo(
            0,
            i * size
        );

        snakeCtx.lineTo(
            320,
            i * size
        );

        snakeCtx.stroke();
    }


    /* Food */

    snakeCtx.fillStyle = "#ef4444";

    snakeCtx.shadowBlur = 15;
    snakeCtx.shadowColor = "#ef4444";

    snakeCtx.fillRect(
        snakeFood.x * size + 3,
        snakeFood.y * size + 3,
        14,
        14
    );


    /* Snake */

    snakeCtx.shadowColor = "#22c55e";

    snake.forEach((part, index) => {

        snakeCtx.fillStyle =
            index === 0
                ? "#86efac"
                : "#22c55e";

        snakeCtx.fillRect(
            part.x * size + 2,
            part.y * size + 2,
            16,
            16
        );

    });

    snakeCtx.shadowBlur = 0;
}


/* ================= DIRECTION ================= */

function changeSnakeDirection(direction) {

    if (!snakeRunning) return;


    if (
        direction === "UP" &&
        snakeDirection !== "DOWN"
    ) {

        nextSnakeDirection = "UP";

    }


    if (
        direction === "DOWN" &&
        snakeDirection !== "UP"
    ) {

        nextSnakeDirection = "DOWN";

    }


    if (
        direction === "LEFT" &&
        snakeDirection !== "RIGHT"
    ) {

        nextSnakeDirection = "LEFT";

    }


    if (
        direction === "RIGHT" &&
        snakeDirection !== "LEFT"
    ) {

        nextSnakeDirection = "RIGHT";

    }

}


/* ================= KEYBOARD ================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (!snakeRunning) return;

        switch (event.key) {

            case "ArrowUp":
                event.preventDefault();
                changeSnakeDirection("UP");
                break;

            case "ArrowDown":
                event.preventDefault();
                changeSnakeDirection("DOWN");
                break;

            case "ArrowLeft":
                event.preventDefault();
                changeSnakeDirection("LEFT");
                break;

            case "ArrowRight":
                event.preventDefault();
                changeSnakeDirection("RIGHT");
                break;
        }

    }
);


/* ================= SCORE ================= */

function updateSnakeScore() {

    const score =
        document.getElementById("snakeScore");

    if (score) {
        score.textContent =
            snakeScore;
    }

}


/* ================= GAME OVER ================= */

function snakeGameOver() {

    snakeRunning = false;

    clearInterval(snakeTimer);

    const status =
        document.getElementById("snakeStatus");

    if (status) {

        status.textContent =
            "❌ SYSTEM FAILURE — GAME OVER";
    }

    drawSnake();

    /* Game over text */

    if (snakeCtx) {

        snakeCtx.fillStyle =
            "rgba(0,0,0,0.65)";

        snakeCtx.fillRect(
            0,
            0,
            320,
            320
        );

        snakeCtx.fillStyle =
            "#ef4444";

        snakeCtx.font =
            "bold 24px monospace";

        snakeCtx.textAlign =
            "center";

        snakeCtx.fillText(
            "GAME OVER",
            160,
            145
        );

        snakeCtx.fillStyle =
            "#86efac";

        snakeCtx.font =
            "16px monospace";

        snakeCtx.fillText(
            "SCORE: " + snakeScore,
            160,
            180
        );

        snakeCtx.textAlign =
            "left";
    }

}
