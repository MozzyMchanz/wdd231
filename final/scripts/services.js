let servicesData = [];

async function fetchServices() {
  try {
    const response = await fetch('data/services.json');
    if (!response.ok) throw new Error('Network response failed');
    servicesData = await response.json();
    displayServices(servicesData);
  } catch (error) {
    console.error('Error fetching services JSON:', error);
  }
}

function createServiceCard(item) {
  const card = document.createElement('div');
  card.className = 'card';

  // Template Literal String Generation
  card.innerHTML = `
    <h3>${item.name}</h3>
    <p><strong>Category:</strong> ${item.category}</p>
    <p><strong>Duration:</strong> ${item.duration}</p>
    <p><strong>Cost:</strong> ${item.cost}</p>
    <button class="cta-button details-btn" data-id="${item.id}">View Details</button>
  `;

  return card;
}

function displayServices(items) {
  const grid = document.getElementById('services-grid');
  const featured = document.getElementById('featured-services');

  if (grid) {
    grid.innerHTML = '';
    items.forEach((item) => grid.appendChild(createServiceCard(item)));
  }

  if (featured) {
    featured.innerHTML = '';
    items.slice(0, 3).forEach((item) => featured.appendChild(createServiceCard(item)));
  }

  attachModalListeners();
}

function attachModalListeners() {
  document.querySelectorAll('.details-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.getAttribute('data-id'));
      const selected = servicesData.find((s) => s.id === id);
      openModal(selected);
    });
  });
}

// Modal Control
function openModal(service) {
  const modal = document.getElementById('info-modal');
  const modalContent = document.getElementById('modal-content');
  if (!modal || !modalContent) return;

  modalContent.innerHTML = `
    <h2 id="modal-title">${service.name}</h2>
    <p><strong>Category:</strong> ${service.category}</p>
    <p><strong>Price:</strong> ${service.cost} (${service.duration})</p>
    <p id="modal-desc" style="margin-top:1rem;">${service.description}</p>
  `;

  modal.showModal();
}

const modal = document.getElementById('info-modal');
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });
}

const closeModalBtn = document.getElementById('close-modal-btn');
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', () => {
    document.getElementById('info-modal').close();
  });
}

// Category Filter Handling (Array Methods)
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach((button) => {
  button.addEventListener('click', (e) => {
    filterButtons.forEach((b) => b.classList.remove('active'));
    e.target.classList.add('active');

    const category = e.target.getAttribute('data-category');
    if (category === 'all') {
      displayServices(servicesData);
    } else {
      const filtered = servicesData.filter((s) => s.category === category);
      displayServices(filtered);
    }
  });
});

fetchServices();
