document.addEventListener("DOMContentLoaded", () => {
    // Current year display
    const yearSpan = document.getElementById("currentyear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Last modified date
    const lastMod = document.getElementById("lastModified");
    if (lastMod) {
        lastMod.textContent = `Last Modification: ${document.lastModified}`;
    }

    // Mobile nav menu toggle
    const toggleBtn = document.getElementById("menu-toggle");
    const navUl = document.querySelector("nav ul");
    if (toggleBtn && navUl) {
        toggleBtn.addEventListener("click", () => {
            navUl.classList.toggle("open");
        });
    }
});