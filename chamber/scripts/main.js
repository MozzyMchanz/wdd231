// --- Navigation & Footer Elements ---
document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('nav-menu').classList.toggle('open');
});
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;

// --- OpenWeatherMap API Integration ---
// OpenWeatherMap API integration (Kampala)
// NOTE: Replace apiKey string with your own key
const apiKey = 'use the one for kampala';
// Kampala, Uganda (approx.)
const lat = '0.3476';
const lon = '32.5825';

const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function fetchWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeather(data);
        } else {
            console.error("Weather data fetch error");
        }
    } catch (error) {
        console.error(error);
    }
}

function displayWeather(data) {
    const currentWeatherDiv = document.getElementById('current-weather');
    const forecastDiv = document.getElementById('forecast');
    
    // Current weather details
    const current = data.list[0];
    currentWeatherDiv.innerHTML = `
        <p><strong>Temp:</strong> ${Math.round(current.main.temp)}&deg;F</p>
        <p><strong>Condition:</strong> ${current.weather[0].description}</p>
    `;

    // Filter out a 3-day forecast (OpenWeatherMap provides data in 3-hour increments)
    forecastDiv.innerHTML = '';
    const dailyData = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);
    
    dailyData.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
        const card = document.createElement('div');
        card.className = 'forecast-day';
        card.innerHTML = `<strong>${date}:</strong> ${Math.round(day.main.temp)}&deg;F - ${day.weather[0].main}`;
        forecastDiv.appendChild(card);
    });
}

// --- Member Spotlight (JSON Fetch & Randomize) ---
const membersUrl = 'data/members.json'; // Path to your directory JSON file

function getMembershipLabel(level) {
    // members.json uses numeric tier levels: 1, 2, 3
    // Rubric requires gold or silver only.
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
        }
    } catch (error) {
        console.error(error);
    }
}

function displaySpotlights(members) {
    const container = document.getElementById('spotlight-container');
    container.innerHTML = '';

    // Filter to only Gold or Silver members (numeric tiers in members.json)
    const qualifiedMembers = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);


    // Shuffle array and pick 2 or 3 random members
    const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffled.slice(0, 3); // Change to 2 or 3 as preferred

    selectedMembers.forEach(member => {
        const card = document.createElement('div');
        card.className = 'spotlight-card';
        card.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.image}" alt="${member.name} Logo" loading="lazy" width="150">
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <span class="badge">${getMembershipLabel(member.membershipLevel)} Member</span>

        `;
        container.appendChild(card);
    });
}

// Call functions on load
fetchWeather();
fetchSpotlights();