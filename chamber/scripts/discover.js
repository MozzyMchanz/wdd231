import { itemsOfInterest } from '../data/discover.mjs';

document.addEventListener('DOMContentLoaded', () => {
  renderVisitorMessage();
  renderCards(itemsOfInterest);
  setFooterDates();
});

/**
 * Calculates time elapsed since last visit using localStorage
 */
function renderVisitorMessage() {
  const visitorText = document.getElementById('visitor-text');
  const lastVisit = localStorage.getItem('chamber_last_visit');
  const now = Date.now();

  if (!lastVisit) {
    visitorText.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const msDifference = now - parseInt(lastVisit, 10);
    const daysDifference = Math.floor(msDifference / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {
      visitorText.textContent = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
      visitorText.textContent = "You last visited 1 day ago.";
    } else {
      visitorText.textContent = `You last visited ${daysDifference} days ago.`;
    }
  }

  // Update stored visit timestamp
  localStorage.setItem('chamber_last_visit', now.toString());
}

/**
 * Builds 8 cards using dynamic HTML elements
 */
function renderCards(items) {
  const container = document.getElementById('discover-grid');
  container.innerHTML = '';

  items.forEach((item, index) => {
    const card = document.createElement('article');
    card.className = `discover-card card-${index + 1}`;

    card.innerHTML = `
      <h2>${item.title}</h2>
      <figure>
        <img src="${item.image}" 
             alt="${item.alt}" 
             width="300" 
             height="200" 
             loading="lazy">
      </figure>
      <address>${item.address}</address>
      <p>${item.description}</p>
      <button type="button" class="learn-btn">Learn More</button>
    `;

    container.appendChild(card);
  });
}

function setFooterDates() {
  const yearSpan = document.getElementById('currentyear');
  const modSpan = document.getElementById('lastModified');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  if (modSpan) modSpan.textContent = `Last Modified: ${document.lastModified}`;
}