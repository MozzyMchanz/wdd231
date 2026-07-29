document.addEventListener("DOMContentLoaded", () => {
    const yearSpan = document.getElementById("currentyear");
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const lastMod = document.getElementById("lastModified");
    if (lastMod) {
        lastMod.textContent = `Last Modification: ${document.lastModified}`;
    }

    const toggleBtn = document.getElementById("menu-toggle");
    const navUl = document.getElementById("primary-nav");
    if (toggleBtn && navUl) {
        toggleBtn.addEventListener("click", () => {
            navUl.classList.toggle("open");
        });
    }
});