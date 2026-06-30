const menuButton = document.getElementById("menu-button");
const navMenu = document.getElementById("nav-menu");

// Null guard check before attaching event listener
if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("open");
    });
}