// --- Navigation & Footer Elements ---
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('open');
        const isOpen = navMenu.classList.contains('open');
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
}

const currentYearEl = document.getElementById('current-year');
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

const lastModifiedEl = document.getElementById('last-modified');
if (lastModifiedEl) {
    lastModifiedEl.textContent = `Last Modified: ${document.lastModified}`;
}

// --- OpenWeatherMap API Integration ---
// NOTE: Replace 'YOUR_OPENWEATHER_API_KEY' with your actual OpenWeatherMap API key
const apiKey = 'YOUR_OPENWEATHER_API_KEY';
const lat = '0.3476'; // Kampala, Uganda
const lon = '32.5825';

const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function fetchWeather() {
    const currentWeatherDiv = document.getElementById('current-weather');
    const forecastDiv = document.getElementById('forecast');

    if (!apiKey || apiKey === 'YOUR_OPENWEATHER_API_KEY') {
        if (currentWeatherDiv) {
            currentWeatherDiv.innerHTML = '<p><em>Weather API key required. Please set a valid OpenWeatherMap API key.</em></p>';
        }
        return;
    }

    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            console.error("Weather data fetch error:", response.statusText);
            if (currentWeatherDiv) {
                currentWeatherDiv.innerHTML = '<p>Unable to load weather data at this time.</p>';
            }
        }
    } catch (error) {
        console.error("Weather Fetch Failed:", error);
        if (currentWeatherDiv) {
            currentWeatherDiv.innerHTML = '<p>Unable to load weather data.</p>';
        }
    }
}

function displayWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');
    const forecastDiv = document.getElementById('forecast');

    if (currentWeatherDiv && data.list && data.list.length > 0) {
        const current = data.list[0];
        const desc = current.weather[0].description;
        const capitalizedDesc = desc.charAt(0).toUpperCase() + desc.slice(1);

        currentWeatherDiv.innerHTML = `
            <p><strong>Temp:</strong> ${Math.round(current.main.temp)}&deg;F</p>
            <p><strong>Condition:</strong> ${capitalizedDesc}</p>
        `;
    }

    if (forecastDiv && data.list) {
        forecastDiv.innerHTML = '';
        // Filter out 12:00:00 forecasts for a 3-day forecast
        const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

        dailyData.forEach(day => {
            const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            const card = document.createElement('div');
            card.className = 'forecast-day';
            card.innerHTML = `<p><strong>${date}:</strong> ${Math.round(day.main.temp)}&deg;F - ${day.weather[0].main}</p>`;
            forecastDiv.appendChild(card);
        });
    }
}

// --- Member Spotlight (JSON Fetch & Randomize) ---
const membersUrl = 'data/members.json';

function getMembershipLabel(level) {
    if (level === 3) return 'Gold';
    if (level === 2) return 'Silver';
    return 'Bronze';
}

async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (response.ok) {
            const members = await response.json();
            displaySpotlights(members);
        } else {
            console.error("Spotlight fetch error:", response.statusText);
        }
    } catch (error) {
        console.error("Error fetching spotlights:", error);
    }
}

// Fisher-Yates Shuffle helper
function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlight-container');
    if (!container) return;

    container.innerHTML = '';

    // Filter to only Gold (3) or Silver (2) members
    const qualifiedMembers = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);

    // Shuffle array and pick up to 3 random members
    const selectedMembers = shuffleArray(qualifiedMembers).slice(0, 3);

    selectedMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';
        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy" width="150">
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><a href="${member.website}" target="_blank" rel="noopener">Visit Website</a></p>
            <span class="badge ${getMembershipLabel(member.membershipLevel).toLowerCase()}">${getMembershipLabel(member.membershipLevel)} Member</span>
        `;
        container.appendChild(card);
    });
}

// Call functions on load
fetchWeather();
fetchSpotlights();