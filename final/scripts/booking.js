// booking.js — Booking form behavior, service dropdown, and success summary
document.addEventListener('DOMContentLoaded', () => {
  const serviceSelect = document.getElementById('service-select');
  if (serviceSelect) populateServices(serviceSelect);

  const dateInput = document.getElementById('appointment-date');
  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  const bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', () => {
      // Persist user selections in Local Storage before GET submission
      const name = document.getElementById('fullname').value;
      const service = document.getElementById('service-select').value;
      localStorage.setItem('lastBookingName', name);
      localStorage.setItem('lastBookingService', service);
    });
  }

  const summaryContainer = document.getElementById('booking-summary');
  if (summaryContainer) renderBookingSummary(summaryContainer);
});

async function populateServices(select) {
  try {
    const response = await fetch('data/services.json');
    if (!response.ok) throw new Error('Network response failed');
    const services = await response.json();

    services.forEach((service) => {
      const option = document.createElement('option');
      option.value = service.name;
      option.textContent = `${service.name} — ${service.cost}`;
      select.appendChild(option);
    });

    // Pre-select a service passed via the query string (e.g., from services.html)
    const params = new URLSearchParams(window.location.search);
    const requested = params.get('service');
    if (requested) select.value = requested;
  } catch (error) {
    console.error('Error loading service options:', error);
  }
}

function renderBookingSummary(container) {
  const params = new URLSearchParams(window.location.search);

  const fullname = params.get('fullname') || 'Not provided';
  const email = params.get('email') || 'Not provided';
  const service = params.get('service') || 'Not provided';
  const date = formatDate(params.get('date'));

  container.innerHTML = `
    <h3>Thank you, ${fullname}!</h3>
    <p>Your booking request has been received. Our care team will confirm your appointment shortly.</p>
    <div class="summary-row">
      <span class="summary-label">Full Name</span>
      <span class="summary-value">${fullname}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Email Address</span>
      <span class="summary-value">${email}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Service</span>
      <span class="summary-value">${service}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Preferred Date</span>
      <span class="summary-value">${date}</span>
    </div>
  `;
}

function formatDate(dateString) {
  if (!dateString) return 'Not provided';
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
