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
