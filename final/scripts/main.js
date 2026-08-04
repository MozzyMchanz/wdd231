// Mobile Menu Navigation Toggle
const menuButton = document.getElementById('menu-button');
const primaryNav = document.getElementById('primary-nav');

if (menuButton && primaryNav) {
  menuButton.addEventListener('click', () => {
    primaryNav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', primaryNav.classList.contains('open'));
  });
}

// Dynamic Footer Date Details
document.getElementById('currentyear').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = `Last Updated: ${document.lastModified}`;

// Local Storage: persist a visit counter to demonstrate client-side state
let visitCount = Number(localStorage.getItem('nexothVisitCount')) || 0;
visitCount += 1;
localStorage.setItem('nexothVisitCount', visitCount);
