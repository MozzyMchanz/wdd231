document.addEventListener("DOMContentLoaded", () => {
    const detailsContainer = document.getElementById("submission-details");
    if (!detailsContainer) return;

    const urlParams = new URLSearchParams(window.location.search);

    const fname = urlParams.get("fname") || "N/A";
    const lname = urlParams.get("lname") || "N/A";
    const email = urlParams.get("email") || "N/A";
    const phone = urlParams.get("phone") || "N/A";
    const organization = urlParams.get("organization") || "N/A";
    const timestamp = urlParams.get("timestamp") || "N/A";

    const formattedDate = timestamp !== "N/A" ? new Date(timestamp).toLocaleString() : "N/A";

    detailsContainer.innerHTML = `
        <p><strong>First Name:</strong> ${fname}</p>
        <p><strong>Last Name:</strong> ${lname}</p>
        <p><strong>Email Address:</strong> ${email}</p>
        <p><strong>Mobile Phone:</strong> ${phone}</p>
        <p><strong>Business/Organization Name:</strong> ${organization}</p>
        <p><strong>Application Date/Time:</strong> ${formattedDate}</p>
    `;
});