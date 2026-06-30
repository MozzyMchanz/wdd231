// Elements selection
const currentYearElement = document.getElementById("currentyear");
const lastModifiedElement = document.getElementById("lastModified");

// Set current year safely
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Set last modified date safely
if (lastModifiedElement) {
    lastModifiedElement.textContent = document.lastModified;
}