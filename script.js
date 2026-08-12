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
