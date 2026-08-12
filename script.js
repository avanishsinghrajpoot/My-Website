function showMessage() {
    alert("Welcome to my website! 🎉");
}

function toggleMenu() {
    const menu = document.getElementById("navLinks");

    menu.classList.toggle("active");
}
function projectMessage(projectName) {
    alert("You selected: " + projectName);
}