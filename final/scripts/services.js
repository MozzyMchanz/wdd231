const SERVICES_URI = "data/services.json";
const servicesContainer = document.getElementById("services-container");

async function loadServices() {
  if (!servicesContainer) return;

  servicesContainer.innerHTML = '<p class="loading-message">Loading services…</p>';

  try {
    const response = await fetch(SERVICES_URI);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const services = await response.json();
    renderServices(services);
  } catch (error) {
    console.error("Error loading services:", error);
    servicesContainer.innerHTML =
      '<p class="error-message">Sorry, we could not load our services right now. Please try again later.</p>';
  }
}

function renderServices(services) {
  servicesContainer.innerHTML = "";

  services.forEach((service, index) => {
    const card = document.createElement("article");
    card.className = "service-card";
    card.style.animationDelay = `${index * 0.1}s`;

    card.innerHTML = `
      <div class="service-icon" aria-hidden="true">${service.icon}</div>
      <h3>${service.name}</h3>
      <p>${service.description}</p>
      <div class="service-meta">
        <span class="service-duration">⏱ ${service.duration}</span>
        <span class="service-price">${service.price}</span>
      </div>
      <a href="booking.html?service=${encodeURIComponent(service.name)}" class="btn btn-secondary">Book This Service</a>
    `;

    servicesContainer.appendChild(card);
  });
}

loadServices();

