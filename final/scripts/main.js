document.addEventListener("DOMContentLoaded", () => {
  // Footer: current year
  const yearSpan = document.getElementById("currentyear");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Footer: last modified date
  const lastMod = document.getElementById("lastModified");
  if (lastMod) {
    lastMod.textContent = `Last Modification: ${document.lastModified}`;
  }

  // Mobile navigation toggle
  const menuToggle = document.getElementById("menu-toggle");
  const navMenu = document.getElementById("nav-menu");
  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });
  }
});

