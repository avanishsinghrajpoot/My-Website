/* =====================================================
   AVANISH SINGH - CYBER PORTFOLIO
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

        const isLight =
            document.body.classList.contains("light-mode");

        themeBtn.textContent =
            isLight ? "☀️" : "🌙";

        localStorage.setItem(
            "theme",
            isLight ? "light" : "dark"
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
   PROJECT BUTTON
===================================================== */

function projectMessage(projectName) {

    alert(
        "PROJECT SELECTED\n\n" +
        projectName +
        "\n\nStatus: ONLINE ✓"
    );

}


/* =====================================================
   OPEN CALCULATOR
===================================================== */

function openCalculator() {

    const calculator =
        document.getElementById("calculator");

    if (calculator) {

        calculator.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =====================================================
   OPEN GAME
===================================================== */

function openGame() {

    const game =
        document.getElementById("game");

    if (game) {

        game.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

}


/* =====================================================
   CALCULATOR
===================================================== */

let calculatorExpression = "";

function calculatorInput(value) {

    const display =
        document.getElementById("display");

    if (!display) return;

    /* Prevent multiple operators */
    if (
        ["+", "-", "*", "/"].includes(value) &&
        calculatorExpression !== ""
    ) {

        const lastCharacter =
            calculatorExpression.slice(-1);

        if (
            ["+", "-", "*", "/"].includes(lastCharacter)
        ) {

            calculatorExpression =
                calculatorExpression.slice(0, -1);

        }

    }

    /* Prevent multiple decimal points */
    if (value === ".") {

        const parts =
            calculatorExpression.split(/[\+\-\*\/]/);

        const currentNumber =
            parts[parts.length - 1];

        if (currentNumber.includes(".")) {
            return;
        }

    }

    calculatorExpression += value;

    display.value =
        calculatorExpression || "0";

}


function clearCalculator() {

    const display =
        document.getElementById("display");

    calculatorExpression = "";

    if (display) {
        display.value = "0";
    }

}


function deleteNumber() {

    const display =
        document.getElementById("display");

    if (!display) return;

    calculatorExpression =
        calculatorExpression.slice(0, -1);

    display.value =
        calculatorExpression || "0";

}


function calculateResult() {

    const display =
        document.getElementById("display");

    if (!display) return;

    if (!calculatorExpression) return;

    try {

        let expression =
            calculatorExpression;

        /* Convert percentage */
        expression =
            expression.replace(
                /(\d+(?:\.\d+)?)%/g,
                "($1/100)"
            );

        /*
         * Allow only calculator characters.
         * This keeps Function() from receiving
         * arbitrary text.
         */
        if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
            throw new Error("Invalid characters");
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

            throw new Error("Invalid calculation");

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

        result =
            "It's a Draw! 🤝";

    }

    else if (

        (playerChoice === "rock" &&
            computerChoice === "scissors")

        ||

        (playerChoice === "paper" &&
            computerChoice === "rock")

        ||

        (playerChoice === "scissors" &&
            computerChoice === "paper")

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
            "You: " +
            playerScore +
            " | Computer: " +
            computerScore;

    }

}


/* =====================================================
   CONTACT FORM - FORMSPREE
===================================================== */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");

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

                submitButton.disabled = true;
                submitButton.textContent = "[ SENDING... ]";

            }

            if (formMessage) {

                formMessage.textContent =
                    "Connecting to server...";

                formMessage.style.color =
                    "#4ade80";

            }

            const formData =
                new FormData(contactForm);

            try {

                const response =
                    await fetch(
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

                    if (formMessage) {

                        formMessage.textContent =
                            "✓ MESSAGE SENT SUCCESSFULLY";

                        formMessage.style.color =
                            "#22c55e";

                    }

                    contactForm.reset();

                } else {

                    if (formMessage) {

                        formMessage.textContent =
                            "✕ SERVER ERROR. PLEASE TRY AGAIN.";

                        formMessage.style.color =
                            "#ef4444";

                    }

                }

            } catch (error) {

                if (formMessage) {

                    formMessage.textContent =
                        "✕ CONNECTION ERROR. CHECK YOUR INTERNET.";

                    formMessage.style.color =
                        "#ef4444";

                }

            }

            if (submitButton) {

                submitButton.disabled = false;

                submitButton.textContent =
                    "[ SEND MESSAGE ]";

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

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {

            topBtn.classList.add("show");

        } else {

            topBtn.classList.remove("show");

        }

    });

    topBtn.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

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
   HACKER TERMINAL
===================================================== */

const terminalBody =
    document.querySelector(
        "#terminal .terminal-body"
    );

if (terminalBody) {

    /* Create command line */

    const terminalCommand =
        document.createElement("div");

    terminalCommand.className =
        "terminal-command";

    terminalCommand.innerHTML = `
        <span class="green">
            avanish@portfolio
        </span>
        <span>:</span>
        <span class="white">~$</span>
    `;

    const terminalInput =
        document.createElement("input");

    terminalInput.type = "text";

    terminalInput.className =
        "terminal-input";

    terminalInput.placeholder =
        "Type 'help' and press Enter...";

    terminalCommand.appendChild(
        terminalInput
    );

    terminalBody.appendChild(
        terminalCommand
    );


    /* Terminal Commands */

    terminalInput.addEventListener(
        "keydown",
        event => {

            if (event.key !== "Enter") {
                return;
            }

            const command =
                terminalInput.value
                    .trim()
                    .toLowerCase();

            if (!command) return;

            let output = "";

            switch (command) {

                case "help":

                    output =
                        "Available commands: about, skills, projects, contact, home, clock, clear";

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
                        "Opening Contact section...";

                    document
                        .getElementById("contact")
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                    break;


                case "home":

                    output =
                        "Returning to Home...";

                    document
                        .getElementById("home")
                        ?.scrollIntoView({
                            behavior: "smooth"
                        });

                    break;


                case "clock":

                    output =
                        "System clock is running.";

                    break;


                case "clear":

                    terminalBody.innerHTML = "";

                    terminalBody.appendChild(
                        terminalCommand
                    );

                    terminalInput.value = "";

                    terminalInput.focus();

                    return;


                default:

                    output =
                        "Command not found. Type 'help' for available commands.";

            }


            /* Show entered command */

            const commandLine =
                document.createElement("p");

            commandLine.innerHTML =
                `<span class="green">
                    avanish@portfolio
                </span>:~$ ${command}`;


            /* Show result */

            const resultLine =
                document.createElement("p");

            resultLine.className =
                "terminal-output";

            resultLine.textContent =
                output;


            terminalBody.insertBefore(
                commandLine,
                terminalCommand
            );

            terminalBody.insertBefore(
                resultLine,
                terminalCommand
            );

            terminalInput.value = "";

            terminalInput.focus();

        }
    );

}


/* =====================================================
   TERMINAL ACCESS GRANTED
===================================================== */

const hackerTerminal =
    document.querySelector(
        "#terminal .hacker-terminal"
    );

if (hackerTerminal) {

    setTimeout(() => {

        const accessMessage =
            document.createElement("div");

        accessMessage.className =
            "access-message";

        accessMessage.textContent =
            "✓ ACCESS GRANTED";

        hackerTerminal.appendChild(
            accessMessage
        );

    }, 1200);

}


/* =====================================================
   TERMINAL BOOT ANIMATION
===================================================== */

const bootLines = [

    "Initializing system...",
    "Loading portfolio modules...",
    "Checking skills...",
    "Connecting to project database...",
    "System ready."

];

if (terminalBody) {

    const terminalBoot =
        document.createElement("div");

    terminalBoot.className =
        "terminal-boot";

    terminalBody.prepend(
        terminalBoot
    );

    let bootIndex = 0;

    function showBootLine() {

        if (
            bootIndex >=
            bootLines.length
        ) {
            return;
        }

        const line =
            document.createElement("p");

        line.textContent =
            "> " +
            bootLines[bootIndex];

        terminalBoot.appendChild(
            line
        );

        bootIndex++;

        setTimeout(
            showBootLine,
            500
        );

    }

    showBootLine();

}


/* =====================================================
   MATRIX RAIN
===================================================== */

const matrixCanvas =
    document.getElementById("matrixCanvas");

if (matrixCanvas) {

    const matrixCtx =
        matrixCanvas.getContext("2d");

    const matrixChars =
        "01アイウエオカキクケコサシスセソタチツテトABCDEFGHIJKLMNOPQRSTUVWXYZ#$%";

    const matrixFontSize = 16;

    let matrixColumns = 0;
    let matrixDrops = [];

    function resizeMatrix() {

        matrixCanvas.width =
            window.innerWidth;

        matrixCanvas.height =
            window.innerHeight;

        matrixColumns =
            Math.floor(
                window.innerWidth /
                matrixFontSize
            );

        matrixDrops =
            Array(matrixColumns).fill(1);

    }

    resizeMatrix();

    window.addEventListener(
        "resize",
        resizeMatrix
    );


    function drawMatrix() {

        matrixCtx.fillStyle =
            "rgba(2,11,5,0.08)";

        matrixCtx.fillRect(
            0,
            0,
            matrixCanvas.width,
            matrixCanvas.height
        );

        matrixCtx.fillStyle =
            "#22c55e";

        matrixCtx.font =
            matrixFontSize +
            "px monospace";


        for (
            let i = 0;
            i < matrixDrops.length;
            i++
        ) {

            const character =
                matrixChars[
                    Math.floor(
                        Math.random() *
                        matrixChars.length
                    )
                ];

            matrixCtx.fillText(
                character,
                i * matrixFontSize,
                matrixDrops[i] *
                matrixFontSize
            );


            if (

                matrixDrops[i] *
                matrixFontSize >
                matrixCanvas.height

                &&

                Math.random() > 0.975

            ) {

                matrixDrops[i] = 0;

            }

            matrixDrops[i]++;

        }

    }

    setInterval(
        drawMatrix,
        50
    );

}


/* =====================================================
   KEYBOARD SUPPORT FOR CALCULATOR
===================================================== */

document.addEventListener("keydown", event => {

    const activeElement =
        document.activeElement;

    /*
     * Don't interfere while typing in
     * forms or terminal.
     */

    if (
        activeElement &&
        (
            activeElement.tagName === "INPUT" ||
            activeElement.tagName === "TEXTAREA"
        )
    ) {

        if (
            activeElement.id !== "display"
        ) {
            return;
        }

    }


    const key =
        event.key;

    if (
        /[0-9+\-*/.%]/.test(key)
    ) {

        calculatorInput(key);

    }

    else if (key === "Enter") {

        calculateResult();

    }

    else if (key === "Backspace") {

        deleteNumber();

    }

    else if (key === "Escape") {

        clearCalculator();

    }

});


/* =====================================================
   CONSOLE MESSAGE
===================================================== */

console.log(
    "%c AVANISH SINGH | SYSTEM ONLINE ",
    "color:#22c55e;font-size:16px;font-weight:bold;"
);

console.log(
    "%c Welcome to the Cyber Portfolio 👨‍💻 ",
    "color:#4ade80;font-size:13px;"
);

console.log(
    "%c Type 'help' inside the Hacker Terminal.",
    "color:#86efac;font-size:12px;"
);
/* =====================================================
   CYBER SYSTEM SCAN
===================================================== */

const scanBtn = document.getElementById("scanBtn");
const scanOutput = document.getElementById("scan-output");
const scanProgress = document.querySelectorAll(".scan-progress");

if (scanBtn && scanOutput) {

    scanBtn.addEventListener("click", startSystemScan);

}

function startSystemScan() {

    if (scanBtn.classList.contains("scanning")) {
        return;
    }

    scanBtn.classList.add("scanning");
    scanBtn.disabled = true;

    scanBtn.textContent = "⚡ SCANNING...";

    // Reset progress bars
    scanProgress.forEach(bar => {
        bar.style.width = "0%";
    });

    // Clear terminal
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

            const p = document.createElement("p");

            p.textContent = messages[index];

            scanOutput.appendChild(p);

            scanOutput.scrollTop = scanOutput.scrollHeight;

            index++;

            updateProgress(index);

            setTimeout(showMessage, 700);

        } else {

            finishScan();

        }

    }

    showMessage();
}


/* Progress Bar */

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

    const value = values[step - 1] || 100;

    scanProgress.forEach(bar => {

        const originalValue =
            parseInt(bar.dataset.value) || value;

        const finalValue =
            Math.min(originalValue, value);

        bar.style.width = finalValue + "%";

    });

}


/* Scan Complete */

function finishScan() {

    const success = document.createElement("p");

    success.className = "scan-success";

    success.textContent =
        "✓ SYSTEM SECURE — ACCESS GRANTED";

    scanOutput.appendChild(success);

    const time = document.createElement("p");

    time.textContent =
        "> Scan completed successfully.";

    scanOutput.appendChild(time);

    scanBtn.classList.remove("scanning");

    scanBtn.disabled = false;

    scanBtn.textContent = "⚡ RUN SYSTEM SCAN AGAIN";

}
