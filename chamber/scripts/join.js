document.addEventListener('DOMContentLoaded', () => {
  // Set ISO Timestamp for form load time
  const timestampField = document.getElementById('timestamp');
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  // Modal Handlers
  const triggers = document.querySelectorAll('.modal-trigger');
  const closeButtons = document.querySelectorAll('.close-modal');

  triggers.forEach(button => {
    button.addEventListener('click', () => {
      const modalId = button.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      if (modal) modal.showModal();
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('dialog');
      if (modal) modal.close();
    });
  });

  // Footer Info
  document.getElementById('currentyear').textContent = new Date().getFullYear();
  document.getElementById('lastModified').textContent = `Last Modified: ${document.lastModified}`;
});