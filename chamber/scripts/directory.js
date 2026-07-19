const targetUri = "data/members.json";
const viewContainer = document.getElementById("directory-container");

function parseTier(level) {
    switch(Number(level)) {
        case 3: return "Gold Partner";
        case 2: return "Silver Partner";
        default: return "Standard Member";
    }
}

// Runtime Fetch Operations
async function processingDirectoryData() {
    try {
        const networkResponse = await fetch(targetUri);
        if (!networkResponse.ok) throw new Error(`HTTP tracking fault status: ${networkResponse.status}`);
        const sourceData = await networkResponse.json();
        populateDirectoryElements(sourceData);
    } catch (faultTrace) {
        console.error("Critical rendering failure:", faultTrace);
        viewContainer.innerHTML = `<p style="grid-column: 1/-1; color: red; text-align: center;">Unable to securely pull data parameters into the DOM runtime grid.</p>`;
    }
}

// Clean Template Literal Injection Mapping
function populateDirectoryElements(collection) {
    viewContainer.innerHTML = "";
    collection.forEach(item => {
        const layoutNode = document.createElement("section");
        layoutNode.className = "member-card";
        layoutNode.innerHTML = `
            <img src="images/${item.image}" alt="Corporate Branding for ${item.name}" loading="lazy" width="180" height="100">
            <h3>${item.name}</h3>
            <p class="meta-address">${item.address}</p>
            <p class="meta-phone">${item.phone}</p>
            <p class="meta-tier"><strong>${parseTier(item.membershipLevel)}</strong></p>
            <p class="meta-url"><a href="${item.website}" target="_blank" rel="noopener">Visit Business Site</a></p>
        `;
        viewContainer.appendChild(layoutNode);
    });
}

// Explicit Layout State Toggles
document.getElementById("grid-btn").addEventListener("click", (event) => {
    viewContainer.className = "grid-view";
    document.getElementById("list-btn").classList.remove("active");
    event.target.classList.add("active");
});

document.getElementById("list-btn").addEventListener("click", (event) => {
    viewContainer.className = "list-view";
    document.getElementById("grid-btn").classList.remove("active");
    event.target.classList.add("active");
});

// Navigation UI Drawer Toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
    document.getElementById("nav-menu").classList.toggle("show");
});

// Automated Footer Metadata Outputs
document.getElementById("currentYear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;

processingDirectoryData();