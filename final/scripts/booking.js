document.addEventListener("DOMContentLoaded", () => {
  // Hidden timestamp field (booking.html)
  const timestampInput = document.getElementById("timestamp");
  if (timestampInput) {
    timestampInput.value = new Date().toISOString();
  }

  // Populate the service dropdown from services.json (booking.html)
  const serviceSelect = document.getElementById("service");
  if (serviceSelect) {
    loadServiceOptions(serviceSelect);
  }

  // Prevent past dates in the date picker
  const dateInput = document.getElementById("date");
  if (dateInput) {
    dateInput.min = new Date().toISOString().split("T")[0];
  }

  // Render booking confirmation (booking-success.html)
  const summaryContainer = document.getElementById("booking-summary");
  if (summaryContainer) {
    renderBookingSummary(summaryContainer);
  }
});

async function loadServiceOptions(serviceSelect) {
  try {
    const response = await fetch("data/services.json");
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const services = await response.json();

    services.forEach((service) => {
      const option = document.createElement("option");
      option.value = service.name;
      option.textContent = `${service.name} — ${service.price}`;
      serviceSelect.appendChild(option);
    });

    // Pre-select a service passed via query string (e.g., from services.html)
    const params = new URLSearchParams(window.location.search);
    const requestedService = params.get("service");
    if (requestedService) {
      serviceSelect.value = requestedService;
    }
  } catch (error) {
    console.error("Error loading service options:", error);
  }
}

function renderBookingSummary(container) {
  const params = new URLSearchParams(window.location.search);

  const firstName = params.get("first-name") || "";
  const lastName = params.get("last-name") || "";
  const fullName = `${firstName} ${lastName}`.trim() || "Patient";
  const service = params.get("service") || "Not specified";
  const date = formatDate(params.get("date"));
  const time = params.get("time") || "Not specified";

  // Generate a simple booking reference from the timestamp when available
  const timestamp = params.get("timestamp");
  let bookingRef = "NXP-000000";
  if (timestamp) {
    const digits = timestamp.replace(/\D/g, "").slice(-6);
    bookingRef = `NXP-${digits}`;
  }

  container.innerHTML = `
    <div class="summary-row">
      <span class="summary-label">Booking Reference</span>
      <span class="summary-value">${bookingRef}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Patient Name</span>
      <span class="summary-value">${fullName}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Service</span>
      <span class="summary-value">${service}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Preferred Date</span>
      <span class="summary-value">${date}</span>
    </div>
    <div class="summary-row">
      <span class="summary-label">Preferred Time</span>
      <span class="summary-value">${time}</span>
    </div>
  `;
}

function formatDate(dateString) {
  if (!dateString || dateString === "Not specified") return "Not specified";
  const date = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

